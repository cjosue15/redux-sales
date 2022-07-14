import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ngrx/ui.reducer';

export interface AppState {
  ui: ui.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
};
