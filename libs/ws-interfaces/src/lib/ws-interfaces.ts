export interface Note {
  id: string | null;
  title: string | null;
  text: string | null;
  sid: string | null;
}

export enum ChangeEventTypes {
  ADD = 'Add',
  UPDATE = 'Update',
  DELETE = 'Delete',
}

export interface ChangeAddEvent<T> {
  type: ChangeEventTypes.ADD;
  newValue: T;
}

export interface ChangeUpdateEvent<T> {
  type: ChangeEventTypes.UPDATE;
  oldValue: T;
  newValue: T;
}

export interface ChangeDeleteEvent<T> {
  type: ChangeEventTypes.DELETE;
  oldValue: T;
}

export const createChangeAddEvent = <T>(newValue: T): ChangeAddEvent<T> => ({
  type: ChangeEventTypes.ADD,
  newValue,
});

export const createChangeUpdateEvent = <T>(oldValue: T, newValue: T): ChangeUpdateEvent<T> => ({
  type: ChangeEventTypes.UPDATE,
  oldValue,
  newValue,
});

export const createChangeDeleteEvent = <T>(oldValue: T): ChangeDeleteEvent<T> => ({
  type: ChangeEventTypes.DELETE,
  oldValue,
});

export type ChangeEvents<T> = ChangeAddEvent<T> | ChangeUpdateEvent<T> | ChangeDeleteEvent<T>;
