import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.loginForm = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  async submit(): Promise<void> {
    const { password, email } = this.loginForm.value;

    Swal.fire({
      title: 'Wait please',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this._authService.logInWithUser({ password, email }).subscribe({
      next: () => {
        Swal.close();
        this._router.navigateByUrl('/');
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      },
    });
  }
}
