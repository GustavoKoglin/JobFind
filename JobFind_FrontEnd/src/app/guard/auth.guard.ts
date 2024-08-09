import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getLoginType().pipe(
      switchMap(userType => {
        if (this.authService.isAuthenticated()) {
          return of(true);
        } else {
          console.log('User is not authenticated, redirecting...');
          this.router.navigate([`/auth/${userType}/login`]);
          return of(false);
        }
      }),
      catchError(() => {
        // Handle errors, e.g., redirect to a default page
        console.log('Error occurred while checking authentication');
        this.router.navigate(['#']); // Redirect to a default route or error page
        return of(false);
      })
    );
  }
}
