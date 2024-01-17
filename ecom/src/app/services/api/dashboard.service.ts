import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthState } from '../../auth/auth.reducer';
import { selectAuthToken } from '../../auth/auth.selector';
import { baseUrl } from './apiUrl';
import { Url } from './apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  Count(): Observable<any> {
    return this.store.pipe(
      select(selectAuthToken),
      take(1),
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        });

        return this.http.get(baseUrl.API_BASE_URL + Url.countOfData, {
          headers: reqHeader,
        });
      })
    );
  }

  listOfOrder(): Observable<any> {
    return this.store.pipe(
      select(selectAuthToken),
      take(1),
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        });

        return this.http.get(baseUrl.API_BASE_URL + Url.listOfOrder, {
          headers: reqHeader,
        });
      })
    );
  }

  recentlyRegistration(): Observable<any> {
    return this.store.pipe(
      select(selectAuthToken),
      take(1),
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        });

        return this.http.get(
          baseUrl.API_BASE_URL + Url.recentlyRegisterCustomer,
          { headers: reqHeader }
        );
      })
    );
  }

  graphOfCustomer(): Observable<any> {
    return this.store.pipe(
      select(selectAuthToken),
      take(1),
      switchMap((token) => {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        });

        return this.http.get(baseUrl.API_BASE_URL + Url.graphOfCustomers, {
          headers: reqHeader,
        });
      })
    );
  }
}
