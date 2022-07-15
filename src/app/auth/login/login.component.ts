import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription, Observable, map } from 'rxjs';

import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ngrx/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading$: Observable<{ isLoading: boolean }>;
  private _subscription: Subscription;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) {
    this.loginForm = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.isLoading$ = new Observable();
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select('ui');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  async submit(): Promise<void> {
    const { password, email } = this.loginForm.value;

    this._store.dispatch(isLoading());

    this._authService.logInWithUser({ password, email }).subscribe({
      next: () => {
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
