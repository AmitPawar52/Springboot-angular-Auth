import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OauthLoginService } from '../services/oauth-login.service';
import { isObject } from 'util';
import { NotificationService } from '../services/notification.service';
import { Constants } from '../constants';

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
              private notifyService: NotificationService) { }
  
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

  getLogo() {
    return Constants.LOGO_URL;
  }
  getAddon() {
    return Constants.ADDON_URL;
  }

  onSubmit() {
    let user = this.loginForm.value;
    this.oauthService.basicJwtAuthLogin(user).subscribe(
      response => {
        console.log(response)
        this.notifyService.showToast("logged in successfully!", 'success');
        this.invalidLogin = false;
        this.saveCredentials();
        this.router.navigate(['home'])
      },
      error => {
        this.invalidLogin = true;
        if(error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = "Unknown error occured, try after some time..";
        }
      }
    )
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
