import { Component, OnInit, Input } from '@angular/core';
import { OauthLoginService } from '../../services/oauth-login.service';
import { User } from 'src/app/services/data/profile-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() user: User;
  constructor(public oauthService: OauthLoginService) { }

  ngOnInit() {
    console.log(this.user)
  }

}
