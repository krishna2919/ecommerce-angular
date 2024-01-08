import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { LoginService } from '../services/api/login.service';
import { LogIn } from '../../app/data-types/login-dataTypes';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth.actions';
import { AuthState } from '../auth/auth.reducer';
import { status } from '../enums/enum';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  public loginForm: FormGroup;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public router: Router,
    private authService: AuthService,
    private store: Store<AuthState>,
    private toasterService: ToasterService
  ) {
    this.emailControl = new FormControl('', [
      Validators.required,
      CustomValidators.email,
    ]);
    this.passwordControl = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);

    this.loginForm = this.fb.group({
      email_id: this.emailControl,
      password: this.passwordControl,
    });
  }

  showMessage(message: string, action: string) {
    this.toasterService.showMessage(message, action);
  }

  ngOnInit() {}

  login(data: LogIn) {
    this.loading = true;
    this.loginService
      .login(data)
      .subscribe(
        (response: any) => {
          const token = response.data.token;
          if (response.status === status.SUCCESS) {
            this.showMessage(response.message, 'Dismiss');

            this.store.dispatch(AuthActions.setToken({ token }));
            this.authService.setLoggedIn(true);
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          const errorMessage = error?.error?.message;
          this.showMessage(errorMessage, 'Dismiss');
        }
      )
      .add(() => {
        this.loading = false;
      });
  }
}
