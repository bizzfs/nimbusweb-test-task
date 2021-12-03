export interface Note {
  title: string | null;
  text: string | null;
}

export interface StoredNote extends Note {
  id: string;
  timestamp: number;
}

export enum EventTypes {
  ADD_REQUEST = 'addRequest', // Used to dispatch 'add' event to service
  UPDATE_REQUEST = 'updateRequest', // Used to dispatch 'update' event to service
  DELETE_REQUEST = 'deleteRequest', // Used to dispatch 'delete' event to service
  ADD_CHANGE = 'addChange', // Used to receive 'add' collection change event from service
  UPDATE_CHANGE = 'updateChange', // Used to receive 'update' collection change event from service
  DELETE_CHANGE = 'deleteChange', // Used to receive 'delete' collection change event from service
}

export interface AddRequestEvent {
  event: EventTypes.ADD_REQUEST;
  data: Note;
}

export interface UpdateRequestEvent {
  event: EventTypes.UPDATE_REQUEST;
  data: Note;
}

export interface DeleteRequestEvent {
  event: EventTypes.DELETE_REQUEST;
  data: { id: string };
}

export interface AddChangeEvent {
  event: EventTypes.ADD_CHANGE;
  data: { newValue: StoredNote };
}

export interface UpdateChangeEvent {
  event: EventTypes.UPDATE_CHANGE;
  data: { oldValue: StoredNote; newValue: StoredNote };
}

export interface DeleteChangeEvent {
  event: EventTypes.DELETE_CHANGE;
  data: { oldValue: StoredNote };
}

export const createAddRequestEvent = (note: Note): AddRequestEvent => ({
  event: EventTypes.ADD_REQUEST,
  data: note,
});

export const createUpdateRequestEvent = (note: Note): UpdateRequestEvent => ({
  event: EventTypes.UPDATE_REQUEST,
  data: note,
});

export const createDeleteRequestEvent = (id: string): DeleteRequestEvent => ({
  event: EventTypes.DELETE_REQUEST,
  data: { id },
});

export const createAddChangeEvent = (newValue: StoredNote): AddChangeEvent => ({
  event: EventTypes.ADD_CHANGE,
  data: { newValue },
});

export const createUpdateChangeEvent = (oldValue: StoredNote, newValue: StoredNote): UpdateChangeEvent => ({
  event: EventTypes.UPDATE_CHANGE,
  data: { oldValue, newValue },
});

export const createDeleteChangeEvent = (oldValue: StoredNote): DeleteChangeEvent => ({
  event: EventTypes.DELETE_CHANGE,
  data: { oldValue },
});

export type RequestEvents = AddRequestEvent | UpdateRequestEvent | DeleteRequestEvent;
export type ChangeEvents = AddChangeEvent | UpdateChangeEvent | DeleteChangeEvent;
export type Events = RequestEvents | ChangeEvents;
