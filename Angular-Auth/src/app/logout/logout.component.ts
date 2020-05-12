import { Component, OnInit } from '@angular/core';
import { OauthLoginService } from '../services/oauth-login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'logout',
    template: '<h3>log out successful</h3>'
})
export class LogoutComponent implements OnInit {

    constructor(private authService: OauthLoginService, 
                private router: Router,
                private notifyService: NotificationService) {}
    
    ngOnInit() {
        this.authService.removeToken();
        this.notifyService.showToast('logged out successfully', 'info');
        this.router.navigate(['login']);
    }
}