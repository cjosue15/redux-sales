import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, DocumentReference } from '@angular/fire/firestore';

import { Sales } from '@models/sales.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private _firestore: Firestore, private _auth: AuthService) {}

  createSale(sale: Sales): Promise<DocumentReference | null> {
    const user = this._auth.user;

    return user
      ? addDoc(collection(this._firestore, 'users', user?.uid, 'sales'), { ...sale })
      : new Promise((resolve, _) => resolve(null));
  }
}
