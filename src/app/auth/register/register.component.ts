import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';

import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ngrx/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<{ isLoading: boolean }>;
  private _subscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) {
    this.isLoading$ = new Observable();
    this._subscription = new Subscription();
    this.form = this._fb.group({
      user: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select('ui');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  submit(): void {
    if (this.form.valid) {
      const { user, email, password } = this.form.value;

      this._store.dispatch(isLoading());

      this._authService.createUser({ name: user, email, password }).subscribe({
        next: (user) => {
          this._store.dispatch(stopLoading());

          this._router.navigateByUrl('/');
        },
        error: (error) => {
          this._store.dispatch(stopLoading());

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        },
      });
    }
  }
}
