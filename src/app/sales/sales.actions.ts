import { createAction, props } from '@ngrx/store';

import { Sales } from '@models/sales.model';

export const setItems = createAction('[Sales Component] Set Items', props<{ items: Sales[] }>());

export const removeItems = createAction('[Sales Component] Remove Items');
