import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/service/auth.service';
import { LocalStorageService } from '@shared/services';

// It's a good practice to use an enum for roles to avoid typos
export enum Role {
    SoftwareDeveloper = 'Software Developer',
    Admin = 'Admin',
    Teacher = 'Teacher',
    Student = 'Student',
    PropertyManager = 'Property Manager' // Add any other roles you have here
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private store: LocalStorageService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;

    console.log('Current User from AuthGuard:', currentUser);
    
    // 1. Check if the user is logged in
    if (!currentUser) {
      // If not logged in, redirect to the sign-in page with returnUrl
      this.router.navigate(['/authentication/signin'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const userRole = currentUser.usertype_role;

    // 2. Handle cases where the user role is not defined
    if (!userRole) {
        console.warn('User has no defined role. Logging out.');
        this.authService.logout();
        this.router.navigate(['/authentication/signin']);
        return false;
    }

    // 3. Check for the "super-user" role first
    if (userRole === Role.SoftwareDeveloper) {
      console.log('Software Developer role detected. Granting access.');
      return true; // The Software Developer has access to all routes
    }
    
    // 4. Check if the route has a defined role requirement
    if (route.data['roles']) {
      // Use a Set for efficient lookup of required roles
      const requiredRoles = new Set(route.data['roles'] as string[]);
      
      // Check if the user's role is in the set of required roles
      if (requiredRoles.has(userRole)) {
        console.log(`User role "${userRole}" is authorized for this route.`);
        return true;
      } else {
        // User role is not authorized, redirect to an unauthorized page
        console.warn(`User role "${userRole}" is not authorized for this route.`);
        this.router.navigate(['/authentication/page404']); 
        return false;
      }
    }
    
    // 5. If the route has no role data, allow access for any authenticated user
    console.log('Route has no role data. Granting access to authenticated user.');
    return true;
  }
}