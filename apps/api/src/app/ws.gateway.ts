import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Subject, takeUntil } from 'rxjs';
import { IncomingMessage } from 'http';
import { WebSocket } from 'ws';

import {
  AddFailureEvent,
  AddSuccessEvent,
  createAddFailureEvent,
  createAddSuccessEvent,
  createDeleteFailureEvent,
  createDeleteSuccessEvent,
  createUpdateFailureEvent,
  createUpdateSuccessEvent,
  DeleteFailureEvent,
  DeleteSuccessEvent,
  EventTypes,
  Note,
  UpdateFailureEvent,
  UpdateNotePayload,
  UpdateSuccessEvent,
} from '@nimbusweb-test-task/ws-interfaces';

import { AppService } from './services/app.service';
import { NoteModel } from './models/note.model';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly subscriptionByClient = new Map<WebSocket, { sid: string; cancel: () => void }>();

  constructor(private readonly appService: AppService) {}

  handleConnection(client: WebSocket, incomingMessage: IncomingMessage) {
    const sid = new URLSearchParams(incomingMessage.url?.replace('/?', '')).get('sid');
    if (sid == null) {
      throw new WsException('no sid provided');
    }

    const unsubscribeSubj$ = new Subject<void>();

    this.appService
      .watchNotesBySid(sid)
      .pipe(takeUntil(unsubscribeSubj$))
      .subscribe({
        next: (changes) => client.send(JSON.stringify(changes)),
        error: () => this.subscriptionByClient.delete(client),
      });

    this.subscriptionByClient.set(client, { sid, cancel: () => unsubscribeSubj$.next() });
  }

  handleDisconnect(client: WebSocket) {
    const subscription = this.subscriptionByClient.get(client);
    if (subscription) {
      subscription.cancel();
      this.subscriptionByClient.delete(client);
    }
  }

  @SubscribeMessage(EventTypes.ADD_REQUEST)
  onAddNote(
    @MessageBody() note: Note,
    @ConnectedSocket() client: WebSocket
  ): Promise<AddSuccessEvent | AddFailureEvent> {
    const sid = this.getSid(client);
    return this.appService
      .addNote(NoteModel.fromNote({ ...note, sid }))
      .then((note) => createAddSuccessEvent({ ...note, id: note.id || '', timestamp: note.timestamp || 0 }))
      .catch((err) => createAddFailureEvent(err));
  }

  @SubscribeMessage(EventTypes.UPDATE_REQUEST)
  onUpdateNote(
    @MessageBody() note: UpdateNotePayload,
    @ConnectedSocket() client: WebSocket
  ): Promise<UpdateSuccessEvent | UpdateFailureEvent> {
    const sid = this.getSid(client);
    return this.appService
      .updateNote(NoteModel.fromNote({ ...note, sid }))
      .then((note) => createUpdateSuccessEvent({ ...note, id: note.id || '', timestamp: note.timestamp || 0 }))
      .catch((err) => createUpdateFailureEvent(err));
  }

  @SubscribeMessage(EventTypes.DELETE_REQUEST)
  onDeleteNote(
    @MessageBody() id: string,
    @ConnectedSocket() client: WebSocket
  ): Promise<DeleteSuccessEvent | DeleteFailureEvent> {
    this.getSid(client);
    return this.appService
      .deleteNoteById(id)
      .then(() => createDeleteSuccessEvent(id))
      .catch((err) => createDeleteFailureEvent(err));
  }

  private getSid(client: WebSocket): string {
    const subscription = this.subscriptionByClient.get(client);

    if (subscription == null) {
      throw new WsException('auth failed for the client');
    }

    return subscription.sid;
  }
}
