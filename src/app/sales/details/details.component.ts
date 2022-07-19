import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { Sales } from '@models/sales.model';
import { SalesService } from '@services/sales.service';

import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [],
})
export class DetailsComponent implements OnInit {
  sales$: Observable<Sales[]>;

  constructor(private _store: Store<AppState>, private _salesService: SalesService) {
    this.sales$ = new Observable();
  }

  ngOnInit(): void {
    this.sales$ = this._store.select('sales').pipe(map(({ items }) => items));
  }

  async delete(id: string | null): Promise<void> {
    try {
      const result = await this._salesService.deleteSale(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
