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
export class CategoryService {
  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  private getRequestHeaders(): Observable<HttpHeaders> {
    return this.store.pipe(
      select(selectAuthToken),
      take(1),
      switchMap((token) => {
        console.log(token);

        const reqHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        });
        return of(reqHeaders);
      })
    );
  }

  getCategories(): Observable<any> {
    return this.getRequestHeaders().pipe(
      switchMap((headers) => {
        const url = baseUrl.API_BASE_URL + Url.listOfCategory;
        return this.http.post(url, { model: 'Category' }, { headers });
      })
    );
  }
}
