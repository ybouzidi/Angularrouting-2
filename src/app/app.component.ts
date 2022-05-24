import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { DummyService } from './services/dummy.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angularrouting';
  userAdded = false;
  userAddedSubscription: Subscription;
  isAuthenticated = false;
  timeout: any;
  constructor(public authService: AuthService, private _userService: UserService, private router: Router, private _dummyService: DummyService) {

  }
  onLogInClick() {
    //this.authService.login();
    this.router.navigate(['/auth']);
  }
  onLogOutClick() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this._dummyService.printLog('Hello from App Component');
    setTimeout(() => {
      this.timeout = this.authService.timeout.subscribe(timeout =>{
        return timeout;
      });
      console.log(this.timeout);

    }, 1000);
    
    this.authService.autoLogin();
    this.authService.userSub.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });
  }
  ngOnDestroy(): void {
    this.userAddedSubscription.unsubscribe();
  }
}
