import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ngrx/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as sales from './sales/sales.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
  // sales: sales.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  // sales: sales.salesReducer,
};
