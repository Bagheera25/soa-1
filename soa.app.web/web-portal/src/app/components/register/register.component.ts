import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidationPatterns } from './../../core/constants/form-validators.constant';
import { Validators } from '@angular/forms';
import { AuthenticationService } from './../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

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
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern(FormValidationPatterns.EmailValidationPattern)]],
      password: ['', [Validators.required]]
    });
  }

  get form() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.form.name.value, this.form.username.value, this.form.password.value)
      .subscribe((data) => {
        this.loading = false;
        this.router.navigate(['/login']);
        this.notifier.notify('success', 'Register was successfully. You can now login!');
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        console.log(err);
        this.notifier.notify('error', 'There was an error. Please contact support');
      });
  }

}
