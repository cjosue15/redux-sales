import { Component } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  logOut() {
    this._authService.logOut().subscribe({ next: () => this._router.navigateByUrl('/login') });
  }
}
