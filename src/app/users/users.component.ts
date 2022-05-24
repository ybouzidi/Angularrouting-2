import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DummyService } from '../services/dummy.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersData = ['test1', 'test2', 'test3'];
  constructor(private router:Router, private _userService:UserService, private _dummyService:DummyService) { }

  ngOnInit(): void {
    this._dummyService.printLog('Hello from Users Component');
  }

  onCategoriesClick(){
    //this.router.navigateByUrl('/categories');
    this.router.navigate(['/categories']);
  }
  onUserAddedClick(){
    this._userService.addUser();
  }
}
