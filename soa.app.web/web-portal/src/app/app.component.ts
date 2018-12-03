import { Router } from '@angular/router';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-portal';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {

  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
