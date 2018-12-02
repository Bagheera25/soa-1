import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.canActivateChild();
  }

  canActivateChild(): Observable<boolean> | boolean {
    if (!this.authenticationService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/search']);
    return false;
  }
}
