import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LogIn } from '../data-types/login-dataTypes';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl =
    'https://e-commerce-pharmacy-74f9.onrender.com/api/user/login';
  isLoggedIn: any;

  constructor(private http: HttpClient) {}

  login(data: LogIn): Observable<any> {
    const result = {
      ...data,
      role: 'Admin',
    };
    return this.http
      .post(this.apiUrl, result)

      .pipe(
        map((res: any) => {
          if (res.data && res.data.token) {
            const decodedToken: any = jwtDecode(res.data.token);
            localStorage.setItem('role', decodedToken.role);
            let user = {
              ...data,
              token: res.data.token,
              id: res.data.id,
              role: decodedToken.role,
            };
            this.isLoggedIn.next(true);
            localStorage.setItem('isLoggedIn', 'true');
          }
          return res;
        })
      );
  }
}
