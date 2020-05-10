import { Component, OnInit } from '@angular/core';
import { GOOGLE_AUTH_URI, FACEBOOK_AUTH_URI, GITHUB_AUTH_URI } from '../constants';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OauthLoginService } from '../services/oauth-login.service';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { isObject } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string
  invalidLogin: boolean = false;
  loginForm: FormGroup
  rememberMe: boolean = false;
  display = 'none'
  verifyModalData = {}

  constructor(private router:Router, 
              private fb: FormBuilder,
              private oauthService: OauthLoginService,
              private route: ActivatedRoute,
              private toastService: AngularBootstrapToastsService) { }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    if(localStorage.getItem("email") && localStorage.getItem("password")){
      this.loginForm.patchValue({
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      })
    }
    this.setVerifyModalData();
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  fbRedirect() {
    window.location.href = FACEBOOK_AUTH_URI;
  }
  googleRedirect() {
    window.location.href = GOOGLE_AUTH_URI;
  }
  onSubmit() {
    let user = this.loginForm.value;
    this.oauthService.basicJwtAuthLogin(user).subscribe(
      response => {
        this.createToasts("login success", "logged in successfully");
        this.invalidLogin = false;
        this.saveCredentials();
        this.router.navigate(['home'])
      },
      error => {
        this.invalidLogin = true;
        if(isObject(error.error)){
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = error.error;
        }
      }
    )
  }
  createToasts(title, message) {
    this.toastService.changeDefaultTitle(title);
    this.toastService.changeDefaultText(message);
    this.toastService.changeDefaultDuration(5000);
    this.toastService.showSimpleToast({ showProgressLine: true });
  }

  toggleValue(event) {
    if(event.target.checked) {
      this.rememberMe = true;
    }
  }

  saveCredentials() {
    if(this.rememberMe) {
      localStorage.setItem("email", this.loginForm.value.email)
      localStorage.setItem("password", this.loginForm.value.password)
    }
  }
  openVerifyEmailModal() {
    this.setVerifyModalData('Verify email', 'Send link', 'verify');
    this.display = 'block';
  }
  openForgotPassModal() {
    this.setVerifyModalData('Reset Password', 'Send OTP', 'reset');
    this.display = 'block';
  }
  eventDisplay(event) {
    this.display = 'none';
  }
  setVerifyModalData(title:string = '', btn: string = '', type: string = '') {
    this.verifyModalData = {
      title: title,
      btn: btn,
      type: type
    }
  }
}
