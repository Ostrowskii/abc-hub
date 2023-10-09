import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'variables';
import Login from '../_interfaces/login.interface';
import Register, { RegisterResponse } from '../_interfaces/register.interface';
import { Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rota = '/auth';
  constructor(private http: HttpClient, private router: Router) {}

  login(data: Login) {
    return this.http.post(API_URL + this.rota + '/local', data).pipe(
      tap((data: any) => {
        console.log('tap', data);
        localStorage.setItem('token_jwt', data.jwt);
      })
    ) as Observable<RegisterResponse>;
  }

  loginWithGoogle(access_token: string) {
    return this.http.get(
      `${API_URL + this.rota}/google/callback?access_token=${access_token}`
    ) as Observable<RegisterResponse>;
  }

  register(data: Register) {
    return this.http.post(API_URL + this.rota + '/local/register', data).pipe(
      tap((data: any) => {
        localStorage.setItem('token_jwt', data.jwt);
      })
    ) as Observable<RegisterResponse>;
  }

  getUserInfo() {
    const userDataMemory = window.localStorage.getItem('userData');
    if (userDataMemory) return of(JSON.parse(userDataMemory));
    return this.http.get(API_URL + '/users/me').pipe(
      tap((data: any) => {
        localStorage.setItem('userData', JSON.stringify(data));
      })
    );
  }

  isConnected() {
    return !!localStorage.getItem('token_jwt');
  }

  logout() {
    localStorage.removeItem('token_jwt');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
