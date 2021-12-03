import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { StoredNote } from '@nimbusweb-test-task/ws-interfaces';

export const sortById = (prev: StoredNote, next: StoredNote) => prev.id.localeCompare(next.id);

export const adapter: EntityAdapter<StoredNote> = createEntityAdapter<StoredNote>({
  selectId: (model) => model.id,
  sortComparer: sortById,
});

export interface State extends EntityState<StoredNote> {
  initialized: boolean;
  error: Error | null;
}

export const initialState: State = adapter.getInitialState({
  initialized: false,
  error: null,
});
