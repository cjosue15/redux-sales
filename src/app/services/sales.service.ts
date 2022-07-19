import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  DocumentReference,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

import { Sales } from '@models/sales.model';
import { User } from '@models/user.model';

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

  getSalesByUser(user: User): Observable<Sales[]> {
    return collectionData(collection(this._firestore, 'users', user.uid, 'sales'), { idField: 'id' }).pipe(
      map((salesFromFirebase) =>
        salesFromFirebase.map((sale) => new Sales(sale['description'], sale['amount'], sale['type'], sale['id']))
      )
    );
  }

  deleteSale(id: string | null) {
    const user = this._auth.user;

    return user
      ? deleteDoc(doc(this._firestore, `users/${user?.uid}/sales/${id}`))
      : new Promise((resolve, _) => resolve(null));
  }

  private _getCollectionReference(url: string) {
    return collection(this._firestore, url);
  }
}
