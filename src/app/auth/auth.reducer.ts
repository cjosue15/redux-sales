import { Action, createReducer, on } from '@ngrx/store';

import { User } from '@models/user.model';

import { setUser, removeUser } from './auth.actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const _authReducer = createReducer<State, Action>(
  initialState,
  on(setUser, (state: State, { user }) => _setUser(state, user)),
  on(removeUser, (state: State) => ({ ...state, user: null }))
);

const _setUser = (state: State, user: User): State => ({ ...state, user: { ...user } });

export const authReducer = (state: State | undefined, action: Action) => {
  return _authReducer(state, action);
};
