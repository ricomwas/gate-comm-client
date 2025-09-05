import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL } from '../../url-config';
import { CustomJwtPayload } from '@core/models/custom-jwt';
import { User } from '@core/models/interface';
import { LocalStorageService } from '@shared/services';
import { TokenService } from './token.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ACCESS__TOKEN = 'access_token';
  REFRESH__TOKEN = 'refresh_token';

  private currentUserSubject: BehaviorSubject<any | null> ;
  private currentUser$: Observable<any | null>;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {
    // You should get the user from the decoded token, not from 'curr_user'
    const token = localStorage.getItem(this.ACCESS__TOKEN);
    let user = null;
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        // Correctly reconstruct the user object from the decoded token
        user = {
          curr_user: decodedToken.curr_user,
          username: decodedToken.username,
          usertype_id: decodedToken.usertype_id,
          usertype_role: decodedToken.usertype_role,
          comm_id: decodedToken.comm_id
        };
      } catch (e) {
        // Token is invalid, so clear it
        localStorage.clear();
      }
    }
    
    this.currentUserSubject = new BehaviorSubject<any | null>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  change() {
    return this.currentUser$;
  }

  // Decode the token and store user data
  private decodeAndStoreUserData(token: string) {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    console.log('DECODED TOKEN', decodedToken);

    console.log('DECODED TOKEN usertype_role:', decodedToken.usertype_role);
    
    // Create a simple user object from the decoded token
    const userObject = {
      curr_user: decodedToken.curr_user,
      username: decodedToken.username,
      usertype_id: decodedToken.usertype_id,
      usertype_role: decodedToken.usertype_role,
      comm_id: decodedToken.comm_id,
    };
    
    // Store a single user object stringified in local storage
    localStorage.setItem('curr_user', JSON.stringify(userObject));
    
    // Set the current user value to the BehaviorSubject
    this.currentUserSubject.next(userObject);
  }
  
  signinUser(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${URL}/signin`, { email, password }).pipe(
      map((response) => {
        if (response && response.access_token) {
          localStorage.setItem(this.ACCESS__TOKEN, response.access_token);
          localStorage.setItem(this.REFRESH__TOKEN, response.refresh_token);
          this.decodeAndStoreUserData(response.access_token);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login error', error);
        throw error;
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.ACCESS__TOKEN);
  }

  /* logout(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getRefreshToken()}`,
    });

    return this.http.post<any>(
      `${URL}/logout`,
      { refresh_token: this.getRefreshToken() },
      { headers: headers }
    ).pipe(
      tap(() => this.doLogoutUser()),
      map(() => true),
      catchError((error) => {
        console.error('Logout error', error);
        throw error;
      })
    );
  } */
  
  logout(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // **CRITICAL FIX: Use the ACCESS__TOKEN here**
      Authorization: `Bearer ${this.getAccessToken()}`,
    });

    return this.http.post<any>(
      `${URL}/logout`,
      {},
      { headers: headers }
    ).pipe(
      tap(() => this.doLogoutUser()),
      map(() => true),
      catchError((error) => {
        console.error('Logout error', error);
        throw error;
      })
    );
  }

  refreshToken(): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getRefreshToken()}`,
    });

    return this.http.post<any>(
      `${URL}/refresh`,
      { refresh_token: this.getRefreshToken() },
      { headers: headers }
    ).pipe(
      tap((response) => {
        this.storeJwtToken(response.access_token);
      }),
      catchError((error) => {
        console.error('Token refresh error', error);
        throw error;
      })
    );
  }

  private storeJwtToken(access_token: string): void {
    localStorage.setItem(this.ACCESS__TOKEN, access_token);
  }

  private getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS__TOKEN);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH__TOKEN);
  }

  private doLogoutUser(): void {
    localStorage.removeItem(this.ACCESS__TOKEN);
    localStorage.removeItem(this.REFRESH__TOKEN);
    localStorage.removeItem('curr_user');
    this.currentUserSubject.next(null); 
  }

  // Get current user value
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
}