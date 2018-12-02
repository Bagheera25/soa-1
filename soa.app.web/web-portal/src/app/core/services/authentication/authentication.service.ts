import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LocalStorageService } from 'ngx-store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  AUTH_KEY = 'token';

  constructor(
    private http: HttpClient,
    private localStorageSvc: LocalStorageService
  ) { }

  login(username: string, password: string) {
    return this.http.post(`${environment.authUrl}/api/auth/login`, {
      email: username,
      password: password
    }).pipe(tap((data) => {
      this.localStorageSvc.set(this.AUTH_KEY, data);
    }));
  }

  register(name, username, password) {
    return this.http.post(`${environment.authUrl}/api/auth/register`, {
      name: name,
      email: username,
      password: password
    });
  }

  logout() {
    this.localStorageSvc.clear();
  }

  isAuthenticated() {
    return this.getLoginToken() !== null;
  }

  getLoginToken() {
    return this.localStorageSvc.get(this.AUTH_KEY);
  }
}
