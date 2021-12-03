export interface State {
  sid: string | null;
  isLoading: boolean;
  initialized: boolean;
  error: Error | null;
}

export const initialState: State = {
  sid: null,
  isLoading: false,
  initialized: false,
  error: null,
};
