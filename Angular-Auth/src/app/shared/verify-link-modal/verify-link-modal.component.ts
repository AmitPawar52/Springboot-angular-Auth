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

  verifyEmailForm: FormGroup;
  otpForm: FormGroup

  constructor(private router: Router, 
              private fb: FormBuilder,
              private authService: OauthLoginService) { }

  ngOnInit() {
    this.verifyEmailForm = this.fb.group({
      email : ['', [Validators.email, Validators.required]]
    })
    this.otpForm = this.fb.group({
      otpNo : ['', [Validators.required, CustomValidationService.checkLimit(100000, 999999)]]
    })
  }

  get verifyEmailFormControl() {
    return this.verifyEmailForm.controls;
  }

  get otpFormControl() {
    return this.otpForm.controls;
  }

  closeModal() {
    this.clearValues();
    this.clearFormValues();
    this.eventDisplay.emit(this.display)
  }

  onSubmit() {
    this.clearValues();
    if(this.modalData.type === 'verify'){
      this.authService.getVerificationLink(this.verifyEmailForm.value).subscribe(
        response => {
          this.successMsg = response.message
        },
        error => {
          if(error.error.message)
            this.errorMsg = error.error.message;
          else
            this.errorMsg = 'unknown error. Try after some time'
        }
      )
    } else if(this.modalData.type === 'reset'){
      this.authService.getOtp(this.verifyEmailForm.value).subscribe(
        response => {
          this.successMsg = response.message;
          this.displayForm = true;
          this.modalData.btn = 'Resend OTP'
        },
        error => {
          console.log(error)
        }
      )
    }
  }
  onOTPSubmit() {
    
  }
  clearValues() {
    this.successMsg = null;
    this.errorMsg = null;
  }
  clearFormValues() {
    this.verifyEmailForm.reset();
    this.otpForm.reset();
  }

}
