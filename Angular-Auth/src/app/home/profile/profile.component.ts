import { Component, OnInit } from '@angular/core';
import { ProfileDataService, User } from '../../services/data/profile-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo: User

  constructor(private profileService: ProfileDataService) { }

  ngOnInit() {
    this.profileService.getUserInfo().subscribe(
      response => {
        this.userInfo = response
        console.log(response)
      },
      error => {
        console.log(error);
      }
    )
  }

}
