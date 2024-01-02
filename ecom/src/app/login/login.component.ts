import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../../app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LogIn } from '../../app/data-types/login-dataTypes';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth.actions';
import { AuthState } from '../auth/auth.reducer';

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
    private toastr: ToastrService,
    private authService: AuthService,
    private store: Store<AuthState>
  ) {
    this.loginForm = this.fb.group({
      email_id: ['', [Validators.required, CustomValidators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
    });
  }

  ngOnInit() {}

  login(data: LogIn) {
    this.loading = true;

    this.loginService.login(data).subscribe(
      (response) => {
        const token = response.data;

        if (response.status === 'success') {
          this.toastr.success(response.message, 'Success', { closeButton: true, timeOut: 3000 });

          this.store.dispatch(AuthActions.setToken({ token }));
          this.authService.setLoggedIn(true);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.warning(response.message, 'Warning');
        }
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    ).add(() => {
      this.loading = false;
    });
  }
}
