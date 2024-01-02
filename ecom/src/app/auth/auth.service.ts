import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userRole: string | null = null;

  constructor(private store: Store<AuthState>) {}

  setLoggedIn(value: boolean, role: string | null = null) {
    this.isLoggedInSubject.next(value);
    this.userRole = role;

    this.store.dispatch(AuthActions.setLoggedIn({ isLoggedIn: value }));
    this.store.dispatch(AuthActions.setUserRole({ userRole: role }));
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getRole(): string | null {
    return this.userRole;
  }
}
