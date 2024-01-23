import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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

  private getRequestHeaders(): Observable<HttpHeaders> {
    return this.store.pipe(
      select(selectAuthToken),
      take(1),
      switchMap((token) => {
        const reqHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        });
        return of(reqHeaders);
      })
    );
  }

  private makeAuthorizedRequest(url: string): Observable<any> {
    return this.getRequestHeaders().pipe(
      switchMap((headers) => {
        return this.http.get(url, { headers });
      })
    );
  }

  Count(): Observable<any> {
    const apiUrl = baseUrl.API_BASE_URL + Url.countOfData;
    return this.makeAuthorizedRequest(apiUrl);
  }

  listOfOrder(): Observable<any> {
    const apiUrl = baseUrl.API_BASE_URL + Url.listOfOrder;
    return this.makeAuthorizedRequest(apiUrl);
  }

  recentlyRegistration(): Observable<any> {
    const apiUrl = baseUrl.API_BASE_URL + Url.recentlyRegisterCustomer;
    return this.makeAuthorizedRequest(apiUrl);
  }

  graphOfCustomer(): Observable<any> {
    const apiUrl = baseUrl.API_BASE_URL + Url.graphOfCustomers;
    return this.makeAuthorizedRequest(apiUrl);
  }
}
