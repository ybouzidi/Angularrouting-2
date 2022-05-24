import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isAuthenticated = false;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.userSub.subscribe(user => {
      console.log(user);
      this.isAuthenticated = user ? true : false;
    });
  }
  onLogOut(){
    this._authService.logout();
  }

}
