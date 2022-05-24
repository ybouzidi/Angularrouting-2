import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

interface User {
  id: string,
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<User> {

  //user:User=null;
  constructor(private _userService: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    let id= route.params['id'];
    return this._userService.getUser(id);
  }

}
