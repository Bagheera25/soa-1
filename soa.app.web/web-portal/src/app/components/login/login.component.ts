import { HttpErrorResponse } from '@angular/common/http';
import { FormValidationPatterns } from './../../core/constants/form-validators.constant';
import { AuthenticationService } from './../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  submitted = false;

  loading = false;

  errorMessages = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(FormValidationPatterns.EmailValidationPattern)]],
      password: ['', [Validators.required]]
    });
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.form.username.value, this.form.password.value)
      .subscribe((data) => {
        this.loading = false;
        this.notifier.notify('success', 'Logged in successfully');
        this.router.navigate(['/search']);
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.status === 401) {
          this.notifier.notify('error', 'Username or password is invalid');
        } else {
          this.notifier.notify('error', 'There was an error. Please contact support');
        }
        console.log(err);
      });
  }
}
