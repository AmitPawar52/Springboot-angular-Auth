import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OauthLoginService } from 'src/app/services/oauth-login.service';
import { CustomValidationService } from '../../services/validation/custom-validation.service';

@Component({
  selector: 'app-verify-link-modal',
  templateUrl: './verify-link-modal.component.html',
  styleUrls: ['./verify-link-modal.component.css']
})
export class VerifyLinkModalComponent implements OnInit {

  @Input() display;
  @Input() modalData;
  @Output() eventDisplay = new EventEmitter();
  displayForm: boolean = false;
  successMsg: string;
  errorMsg: string;
  userEmail: string;
  isLoading: boolean = false;
  isOtpVerified: boolean = false;

  verifyEmailForm: FormGroup;
  otpForm: FormGroup;
  resetPasswordForm: FormGroup;

  constructor(private router: Router, 
              private fb: FormBuilder,
              private authService: OauthLoginService,
              private customValidator: CustomValidationService) { }

  ngOnInit() {
    this.verifyEmailForm = this.fb.group({
      email : ['', [Validators.email, Validators.required]]
    })
    this.otpForm = this.fb.group({
      otpNo : ['', [Validators.required, CustomValidationService.checkLimit(100000, 999999)]]
    })
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, this.customValidator.patternValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.customValidator.MatchPassword("password", "confirmPassword") })
  }

  get verifyEmailFormControl() {
    return this.verifyEmailForm.controls;
  }

  get otpFormControl() {
    return this.otpForm.controls;
  }

  get resetPasswordFormControl() {
    return this.resetPasswordForm.controls;
  }

  closeModal() {
    this.clearValues();
    this.clearFormValues();
    this.displayForm = false;
    this.eventDisplay.emit(this.display)
  }

  onSubmit() {
    this.clearValues();
    if(this.modalData.type === 'verify') {
      this.setPreRequestValues();
      this.authService.getVerificationLink(this.verifyEmailForm.value).subscribe(
        response => {
          this.handleResponse(response);
          this.modalData.btn = 'Resend link'
        },
        error => {
          this.modalData.btn = 'Send link'
          this.handleError(error);
        }
      )
    } else if(this.modalData.type === 'reset') {
      this.setPreRequestValues();
      this.authService.getOtp(this.verifyEmailForm.value).subscribe(
        response => {
          this.handleResponse(response);
          this.displayForm = true;
          this.modalData.btn = 'Resend OTP'
          this.userEmail = this.verifyEmailForm.value.email
        },
        error => {
          this.modalData.btn = 'Send OTP'
          this.handleError(error);
        }
      )
    }
  }
  onOTPSubmit() {
    let body = {
      email: this.userEmail,
      otpNo: this.otpForm.value.otpNo
    }
    this.setPreRequestValues();
    this.authService.submitOtp(body).subscribe(
      response => {
        this.handleResponse(response);
        this.isOtpVerified = true;
      },
      error => {
        this.handleError(error);
      }
    )
  }

  resetPassword() {
    let body = {
      email: this.userEmail,
      password: this.resetPasswordForm.value.password
    }
    this.setPreRequestValues();
    this.authService.resetPassword(body).subscribe(
      response => {
        this.handleResponse(response);
      },
      error => {
        this.handleError(error);
      }
    )
  }

  clearValues() {
    this.successMsg = null;
    this.errorMsg = null;
  }
  
  clearFormValues() {
    this.verifyEmailForm.reset();
    this.otpForm.reset();
  }

  handleResponse(response) {
    this.successMsg = response.message
    this.isLoading = false;
  }

  handleError(error) {
    console.log(error)
    this.isLoading = false;
    if(error.error.message)
      this.errorMsg = error.error.message;
    else
      this.errorMsg = 'unknown error. Try after some time'
  }

  setPreRequestValues() {
    this.clearValues();
    this.isLoading = true;
    this.modalData.btn = 'Loading..'
  }
}
