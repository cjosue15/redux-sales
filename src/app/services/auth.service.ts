import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  authState,
} from '@angular/fire/auth';

import { defer, from } from 'rxjs';

import { AuthUser } from '@models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _authFire: Auth) {}

  initAuthListener() {
    authState(this._authFire).subscribe((user) => console.log(user?.uid));
  }

  createUser(user: AuthUser) {
    return defer(() => from(createUserWithEmailAndPassword(this._authFire, user.email, user.password)));
  }

  logInWithUser(user: Partial<AuthUser>) {
    const { email = '', password = '' } = user;

    return defer(() => from(signInWithEmailAndPassword(this._authFire, email, password)));
  }

  logOut() {
    return defer(() => from(signOut(this._authFire)));
  }
}
