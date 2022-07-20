import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';

import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanActivate');
    return this._authService.isAuth().pipe(
      tap((state) => {
        if (!state) this._router.navigate(['/login']);
      }),
      take(1)
    );
  }

  canLoad(): Observable<boolean> {
    console.log('canLoad');

    return this._authService.isAuth().pipe(
      tap((state) => {
        console.log(state);
        if (!state) this._router.navigate(['/login']);
      }),
      take(1)
    );
  }
}
