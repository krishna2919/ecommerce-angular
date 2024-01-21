import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { BaseInputComponent } from './base/base-input/base-input.component';
import { BaseButtonComponent } from './base/base-button/base-button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BaseSearchComponent } from './base/base-search/base-search.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { authReducer } from './auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BaseTableComponent } from './base/base-table/base-table.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CategoryComponent } from './category/category.component';
import { BaseCardComponent } from './base/base-card/base-card.component';
import { MatTableModule } from '@angular/material/table';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LoginComponent, BaseInputComponent, BaseButtonComponent, DashboardComponent, HeaderComponent, BaseSearchComponent, SidebarComponent, BaseTableComponent, FooterComponent, LayoutComponent, BaseCardComponent,CategoryComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    NgxUiLoaderModule,
    StoreModule.forRoot({ auth: authReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
