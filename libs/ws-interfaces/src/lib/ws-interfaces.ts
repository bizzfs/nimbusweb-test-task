export interface Note {
  title: string | null;
  text: string | null;
}

export interface UpdateNotePayload extends Note {
  id: string;
}

export interface StoredNote extends Note {
  id: string;
  timestamp: number;
}

export enum EventTypes {
  ADD_REQUEST = 'addRequest', // Used to dispatch 'add' event to service
  ADD_SUCCESS = 'addSuccess',
  ADD_FAILURE = 'addFailure',
  UPDATE_REQUEST = 'updateRequest', // Used to dispatch 'update' event to service
  UPDATE_SUCCESS = 'updateSuccess',
  UPDATE_FAILURE = 'updateFailure',
  DELETE_REQUEST = 'deleteRequest', // Used to dispatch 'delete' event to service
  DELETE_SUCCESS = 'deleteSuccess',
  DELETE_FAILURE = 'deleteFailure',
  ADD_CHANGE = 'addChange', // Used to receive 'add' collection change event from service
  UPDATE_CHANGE = 'updateChange', // Used to receive 'update' collection change event from service
  DELETE_CHANGE = 'deleteChange', // Used to receive 'delete' collection change event from service
}

export interface AddRequestEvent {
  event: EventTypes.ADD_REQUEST;
  data: Note;
}

export interface AddSuccessEvent {
  event: EventTypes.ADD_SUCCESS;
  data: StoredNote;
}

export interface AddFailureEvent {
  event: EventTypes.ADD_FAILURE;
  data: { msg: string };
}

export interface UpdateRequestEvent {
  event: EventTypes.UPDATE_REQUEST;
  data: UpdateNotePayload;
}

export interface UpdateSuccessEvent {
  event: EventTypes.UPDATE_SUCCESS;
  data: StoredNote;
}

export interface UpdateFailureEvent {
  event: EventTypes.UPDATE_FAILURE;
  data: { msg: string };
}

export interface DeleteRequestEvent {
  event: EventTypes.DELETE_REQUEST;
  data: string;
}

export interface DeleteSuccessEvent {
  event: EventTypes.DELETE_SUCCESS;
  data: string;
}

export interface DeleteFailureEvent {
  event: EventTypes.DELETE_FAILURE;
  data: { msg: string };
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

export const createAddSuccessEvent = (note: StoredNote): AddSuccessEvent => ({
  event: EventTypes.ADD_SUCCESS,
  data: note,
});

export const createAddFailureEvent = (err: Error): AddFailureEvent => ({
  event: EventTypes.ADD_FAILURE,
  data: { msg: err.message },
});

export const createUpdateRequestEvent = (note: UpdateNotePayload): UpdateRequestEvent => ({
  event: EventTypes.UPDATE_REQUEST,
  data: note,
});

export const createUpdateSuccessEvent = (note: StoredNote): UpdateSuccessEvent => ({
  event: EventTypes.UPDATE_SUCCESS,
  data: note,
});

export const createUpdateFailureEvent = (err: Error): UpdateFailureEvent => ({
  event: EventTypes.UPDATE_FAILURE,
  data: { msg: err.message },
});

export const createDeleteRequestEvent = (id: string): DeleteRequestEvent => ({
  event: EventTypes.DELETE_REQUEST,
  data: id,
});

export const createDeleteSuccessEvent = (id: string): DeleteSuccessEvent => ({
  event: EventTypes.DELETE_SUCCESS,
  data: id,
});

export const createDeleteFailureEvent = (err: Error): DeleteFailureEvent => ({
  event: EventTypes.DELETE_FAILURE,
  data: { msg: err.message },
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

export type RequestEvents =
  | AddRequestEvent
  | AddSuccessEvent
  | AddFailureEvent
  | UpdateRequestEvent
  | UpdateSuccessEvent
  | UpdateFailureEvent
  | DeleteRequestEvent
  | DeleteSuccessEvent
  | DeleteFailureEvent;
export type ChangeEvents = AddChangeEvent | UpdateChangeEvent | DeleteChangeEvent;
export type Events = RequestEvents | ChangeEvents;
