import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/* interface User{
  id:string,
  name:string,
} */
@Injectable({
  providedIn: 'root'
})
export class UserService {  
  userAddedEvent = new Subject<boolean>();
  //addUserEvent = new EventEmitter<User>();
  constructor() { }
  getUser(id: string) {
    if (id === '1') {
      return {
        id: '1',
        name: 'test',
        status: 'inactive',
      }
    } else {
      return {
        id: '2',
        name: 'testttt',
        status: 'active',
      }
    }
  }

  addUser() {
    this.userAddedEvent.next(true);
    //this.addUserEvent.emit({id:'4',name:'Adel'})
  }

}
