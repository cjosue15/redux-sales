import { Action, createReducer, on } from '@ngrx/store';
import { setItems, removeItems } from './sales.actions';

import { Sales } from '@models/sales.model';

import { AppState } from '../app.reducer';

export interface State {
  items: Sales[];
}

export interface AppStateWithSales extends AppState {
  sales: State;
}

export const initialState: State = {
  items: [],
};

export const _salesReducer = createReducer<State, Action>(
  initialState,
  on(setItems, (state: State, { items }) => _setItems(state, items)),
  on(removeItems, (state) => _removeItems(state))
);

const _setItems = (state: State, newItems: Sales[]): State => ({ ...state, items: [...newItems] });

const _removeItems = (state: State): State => ({ ...state, items: [] });

export const salesReducer = (state: State | undefined, action: Action) => {
  return _salesReducer(state, action);
};
