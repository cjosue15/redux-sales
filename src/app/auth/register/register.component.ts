import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.form = this._fb.group({
      user: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submit(): void {
    Swal.fire({
      title: 'Wait please',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (this.form.valid) {
      const { user, email, password } = this.form.value;
      this._authService.createUser({ name: user, email, password }).subscribe({
        next: (user) => {
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
}
