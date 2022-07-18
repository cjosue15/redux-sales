import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Sales } from '@models/sales.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';

import { SalesService } from '@services/sales.service';
import { UiStore } from '@models/store.model';

import { isLoading, stopLoading } from '../shared/ngrx/ui.actions';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styles: [],
})
export class SalesComponent implements OnInit {
  salesForm: FormGroup;
  type: string;
  isLoading$: Observable<UiStore>;
  constructor(private _fb: FormBuilder, private _salesService: SalesService, private _store: Store<AppState>) {
    this.salesForm = this._fb.group({
      description: new FormControl(null, Validators.required),
      ammount: new FormControl(null, Validators.required),
    });
    this.type = 'input';
    this.isLoading$ = new Observable();
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select('ui');
  }

  async submit() {
    try {
      this._store.dispatch(isLoading());
      const sale = new Sales(this.salesForm.value.description, this.salesForm.value.ammount, this.type);
      await this._salesService.createSale(sale);
      Swal.fire(`Success!`, `Sale ${this.salesForm.value.description} created!`, 'success');

      this.salesForm.reset();
    } catch (error: any) {
      Swal.fire(`Ops!`, error.message, 'error');
    } finally {
      this._store.dispatch(stopLoading());
    }
  }
}
