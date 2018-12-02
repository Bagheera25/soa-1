import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with token if available
        const token = this.authenticationService.getLoginToken();
        if (token !== null) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': `${token.access_token}`
                }
            });
        }

        return next.handle(request)
            // add error handling
            .pipe(
            catchError(
                (error: any, caught: Observable<HttpEvent<any>>) => {
                    if (error.status === 401) {
                        this.handleAuthError();
                        return of(error);
                    }
                    throw error;
                }
            ) as any,
        );
    }

    private handleAuthError() {
        // clear stored credentials; they're invalid
        this.authenticationService.logout();
        // // navigate back to the login page
        this.router.navigate(['/auth/login']);
    }

}
