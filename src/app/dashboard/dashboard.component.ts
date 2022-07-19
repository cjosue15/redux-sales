import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription, switchMap, of } from 'rxjs';

import { SalesService } from '@services/sales.service';

import { AppState } from '../app.reducer';
import { setItems, removeItems } from '../sales/sales.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  constructor(private _store: Store<AppState>, private _salesService: SalesService) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._subscription = this._store
      .select('auth')
      .pipe(
        filter((auth) => !!auth.user),
        switchMap(({ user }) => (user ? this._salesService.getSalesByUser(user) : of([])))
      )
      .subscribe((sales) => {
        this._store.dispatch(setItems({ items: sales }));
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._store.dispatch(removeItems());
  }
}
