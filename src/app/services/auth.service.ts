import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  authState,
} from '@angular/fire/auth';

import { Firestore, collection, addDoc, setDoc, doc } from '@angular/fire/firestore';

import { defer, from, map } from 'rxjs';

import { AuthUser } from '@models/auth.model';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _authFire: Auth, private _firestore: Firestore) {}

  initAuthListener() {
    authState(this._authFire).subscribe((user) => console.log(user?.uid));
  }

  createUser(user: AuthUser) {
    const userCredentiasPromise = createUserWithEmailAndPassword(this._authFire, user.email, user.password).then(
      ({ user: userCredentias }) => {
        debugger;
        const newUser = new User(userCredentias.uid, user.name, user.email);
        console.log(newUser);

        const userRef = collection(this._firestore, 'user');

        return addDoc(userRef, { ...newUser });
      }
    );

    return defer(() => from(userCredentiasPromise));
  }

  logInWithUser(user: Partial<AuthUser>) {
    const { email = '', password = '' } = user;

    return defer(() => from(signInWithEmailAndPassword(this._authFire, email, password)));
  }

  logOut() {
    return defer(() => from(signOut(this._authFire)));
  }

  isAuth() {
    return authState(this._authFire).pipe(map((userCredentials) => !!userCredentials));
  }
}
