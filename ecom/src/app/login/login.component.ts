import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../../app/services/login.service';
import { LogIn } from '../../app/data-types/login-dataTypes';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth.actions';
import { AuthState } from '../auth/auth.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  public loginForm: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public router: Router,
    private authService: AuthService,
    private store: Store<AuthState>,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email_id: ['', [Validators.required, CustomValidators.email]],
      password: [
        '',
        [Validators.required, CustomValidators.rangeLength([6, 15])],
      ],
    });
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  ngOnInit() {}

  login(data: LogIn) {
    this.loading = true;
    this.loginService
      .login(data)
      .subscribe(
        (response: any) => {
          
          const token = response.data.token;
          if (response.status === 'success') {
            this.showMessage('Login successful', 'Dismiss');

            this.store.dispatch(AuthActions.setToken({ token }));
            this.authService.setLoggedIn(true);
            this.router.navigate(['/dashboard']);
          } else {
            this.showMessage('Please enter proper email or password', 'Dismiss');
          }
        },
        (error) => {
          this.showMessage('Please enter proper email or password', 'Dismiss');
        }
      )
      .add(() => {
        this.loading = false;
      });
  }
}
