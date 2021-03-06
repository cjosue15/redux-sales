import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  authState,
} from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';

import { defer, from, map, switchMap, Observable, of, tap } from 'rxjs';

import { AuthUser } from '@models/auth.model';
import { User } from '@models/user.model';

import { setUser, removeUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User | null;

  public get user(): User | null {
    return this._user ? { ...this._user } : null;
  }

  constructor(private _authFire: Auth, private _firestore: Firestore, private _store: Store) {
    this._user = null;
  }

  initAuthListener() {
    authState(this._authFire)
      .pipe(
        switchMap((userFirestore) => {
          return userFirestore ? docData(doc(this._firestore, 'users', userFirestore?.uid)) : of(null);
        })
      )
      .subscribe((user) => {
        this._user = user ? User.fromFirebase(user['uid'], user['name'], user['email']) : null;

        if (user) this._store.dispatch(setUser({ user: User.fromFirebase(user['uid'], user['name'], user['email']) }));
      });
  }

  createUser(user: AuthUser) {
    const userCredentiasPromise = createUserWithEmailAndPassword(this._authFire, user.email, user.password).then(
      ({ user: userCredentias }) => {
        const newUser = new User(userCredentias.uid, user.name, user.email);

        return setDoc(doc(this._firestore, 'users', userCredentias.uid), { ...newUser });
      }
    );

    return defer(() => from(userCredentiasPromise));
  }

  logInWithUser(user: Partial<AuthUser>) {
    const { email = '', password = '' } = user;

    return defer(() => from(signInWithEmailAndPassword(this._authFire, email, password)));
  }

  logOut() {
    return defer(() => from(signOut(this._authFire))).pipe(
      tap(() => {
        this._store.dispatch(removeUser());
        this._user = null;
      })
    );
  }

  isAuth() {
    return authState(this._authFire).pipe(map((userCredentials) => !!userCredentials));
  }
}
