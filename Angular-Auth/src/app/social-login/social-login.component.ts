import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getLoginPage(provider: string): string {
    switch (provider) {
      case 'facebook': return Constants.FACEBOOK_AUTH_URI;
      case 'google': return Constants.GOOGLE_AUTH_URI;
      case 'github': return Constants.GITHUB_AUTH_URI;
      case 'linkedin': return Constants.GITHUB_AUTH_URI;
      case 'twitter': return Constants.GITHUB_AUTH_URI;
    }
  }

}
