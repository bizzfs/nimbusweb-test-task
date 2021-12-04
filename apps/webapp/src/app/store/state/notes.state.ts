import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { StoredNote } from '@nimbusweb-test-task/ws-interfaces';

export const sortById = (prev: StoredNote, next: StoredNote) => prev.timestamp - next.timestamp;

export interface NoteState extends StoredNote {
  lowerCasedTitle: string | null;
  formattedText: string | null;
  tags: string[];
}

export const adapter: EntityAdapter<NoteState> = createEntityAdapter<NoteState>({
  selectId: (model) => model.id,
});

export interface State extends EntityState<NoteState> {
  selectedId: string | null;
  initialized: boolean;
  error: Error | null;
}

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  initialized: false,
  error: null,
});
