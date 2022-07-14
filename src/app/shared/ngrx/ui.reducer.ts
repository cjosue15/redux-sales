import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
};

export const _uiReducer = createReducer<State, Action>(
  initialState,
  on(isLoading, (state: State) => _isLoading(state)),
  on(stopLoading, (state) => _stopLoading(state))
);

const _isLoading = (state: State): State => ({ ...state, isLoading: true });
const _stopLoading = (state: State): State => ({ ...state, isLoading: false });

export const uiReducer = (state: State | undefined, action: Action) => {
  return _uiReducer(state, action);
};
