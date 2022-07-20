import { Component, OnInit } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { AppState } from '../../app.reducer';

import { User } from '@models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  auth$: Observable<User | null>;

  constructor(private _authService: AuthService, private _router: Router, private _store: Store<AppState>) {
    this.auth$ = new Observable();
  }

  ngOnInit(): void {
    this.auth$ = this._store.select('auth').pipe(map((store) => store.user));
  }

  logOut() {
    this._authService.logOut().subscribe({ next: () => this._router.navigateByUrl('/login') });
  }
}
