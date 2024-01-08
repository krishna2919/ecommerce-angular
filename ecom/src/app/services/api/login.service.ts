import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { LogIn } from '../../data-types/login-dataTypes';
import * as AuthActions from '../../auth/auth.actions';
import { AuthState } from '../../auth/auth.reducer';
import { AuthService } from '../../auth/auth.service';
import { API_BASE_URL } from './apiUrl';
import { login } from './apiRoutes';
import { role } from 'src/app/enums/enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private store: Store<AuthState>,
    private authService: AuthService
  ) {}

  login(data: LogIn): Observable<any> {
    const result = {
      ...data,
      role: role.ADMIN,
    };

    return this.http.post(`${API_BASE_URL}${login}`, result).pipe(
      map((res: any) => {
        if (res.data && res.data.token) {
          const token = res.data.token;
          this.store.dispatch(AuthActions.setToken({ token }));
          this.authService.setLoggedIn(true);
        }
        return res;
      })
    );
  }
}