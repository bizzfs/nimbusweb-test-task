import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Subscription } from 'rxjs';
import { IncomingMessage } from 'http';
import { WebSocket } from 'ws';

import { AppService } from './services/app.service';
import { Note } from '@nimbusweb-test-task/ws-interfaces';
import { NoteModel } from './models/note.model';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly subscriptionByClient = new Map<WebSocket, { sid: string; subscription: Subscription }>();

  constructor(private readonly appService: AppService) {}

  handleConnection(client: WebSocket, incomingMessage: IncomingMessage) {
    const sid = new URLSearchParams(incomingMessage.url?.replace('/?', '')).get('sid');
    if (sid == null) {
      throw new WsException('no sid provided');
    }

    const subscription = this.appService.watchNotesBySid(sid).subscribe({
      next: (changes) => client.send(JSON.stringify(changes)),
      error: () => this.subscriptionByClient.delete(client),
    });

    this.subscriptionByClient.set(client, { sid, subscription });
  }

  handleDisconnect(client: WebSocket) {
    const subscription = this.subscriptionByClient.get(client);
    if (subscription) {
      subscription.subscription.unsubscribe();
      this.subscriptionByClient.delete(client);
    }
  }

  @SubscribeMessage('addNote')
  async onAddNote(@MessageBody() note: Note, @ConnectedSocket() client: WebSocket): Promise<void> {
    const sid = this.getSid(client);
    await this.appService.addNote(NoteModel.fromNote({ ...note, sid }));
  }

  @SubscribeMessage('updateNote')
  async onUpdateNote(@MessageBody() note: Note, @ConnectedSocket() client: WebSocket): Promise<void> {
    const sid = this.getSid(client);
    await this.appService.updateNote(NoteModel.fromNote({ ...note, sid }));
  }

  @SubscribeMessage('deleteNote')
  async onEvent(@MessageBody() note: Note, @ConnectedSocket() client: WebSocket): Promise<void> {
    this.getSid(client);
    await this.appService.addNote(NoteModel.fromNote(note)).then(() => true);
  }

  private getSid(client: WebSocket): string {
    const subscription = this.subscriptionByClient.get(client);

    if (subscription == null) {
      throw new WsException('auth failed for the client');
    }

    return subscription.sid;
  }
}