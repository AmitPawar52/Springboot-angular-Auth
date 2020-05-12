import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OauthLoginService } from '../services/oauth-login.service';
import { CustomValidationService } from '../services/validation/custom-validation.service';
import { Constants } from '../constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  display = 'none';
  modalObject = {};
  errorMessage: string;
  signupForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private oauthService: OauthLoginService,
    private customValidator: CustomValidationService) {
  }

  ngOnInit() {
    //sign up form builder
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]]
      }, {
        validator: this.customValidator.MatchPassword("password", "confirmPassword")
      }
    );
    this.modalObject = {
      title: "",
      body: ""
    }
  }

  get signupFormControl() {
    return this.signupForm.controls;
  }

  getLogo() {
    return Constants.LOGO_URL;
  }

  getAddon() {
    return Constants.ADDON_URL;
  }

  onSubmit() {
    let user = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }
    this.oauthService.userSignup(user).subscribe(
      response => {
        this.errorMessage = null;
        this.showModal();
        console.log(response)
      },
      error => {
        this.signupForm.reset();
        if(error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = "Unknown error occured, try after some time..";
        }
      }
    )
  }

  displayChange(value) {
    this.display = 'none'
  }

  showModal() {
    this.display = 'block';
    this.modalObject = {
      title: "SignUp Successful",
      body: `Thanks for signing in!. 
            Account verification link is sent on your mail id 
            ${this.signupForm.value.email}. 
            Click on link to activate your account.`
    }
  }
  // createToasts(title, message) {
  //   this.toastService.changeDefaultTitle(title);
  //   this.toastService.changeDefaultText(message);
  //   this.toastService.changeDefaultDuration(5000);
  //   this.toastService.showSimpleToast({ showProgressLine: true });
  // }
}
