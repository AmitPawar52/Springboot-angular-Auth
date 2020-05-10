import { Component, OnInit } from '@angular/core';
import { OauthLoginService } from '../services/oauth-login.service';
import { Router } from '@angular/router';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';

@Component({
    selector: 'logout',
    template: '<h3>log out successful</h3>'
})
export class LogoutComponent implements OnInit {

    constructor(private authService: OauthLoginService, 
                private router: Router,
                private toastService: AngularBootstrapToastsService) {}
    
    ngOnInit() {
        this.authService.removeToken();
        this.createToasts("Logout Success", "You are logged out successfully!");
        this.router.navigate(['login']);
    }

    createToasts(title, message) {
        this.toastService.changeDefaultTitle(title);
        this.toastService.changeDefaultText(message);
        this.toastService.changeDefaultDuration(5000);
        this.toastService.showSimpleToast({ showProgressLine: true });
    }
}