import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DeactivateGaurdService, IDeactivateGuard } from '../services/guards/deactivate-gaurd.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, IDeactivateGuard {
  changed: boolean = false;
  user: { id: string, name: string, status: string }
  editUserDetails: { id: string, name: string, status:string }
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('/****** EditUserComponent ******/');
    this.route.data.subscribe((data) =>{
      console.log(data);
      //console.log(data['user']['id'])
      //console.log(data['user']['name'])
    })
    console.log('/****** EditUserComponent ******/');
    this.route.data.subscribe((data: Params) => {
      this.user = {
        id: data['user']['id'],
        name: data['user']['name'],
        status:'active'
      };
      //console.log(this.editUserDetails);
      this.editUserDetails = { ...this.user };
    })
  }
  canExit() {
    //console.log();
    if (this.user.name != this.editUserDetails.name && this.user.id ===this.editUserDetails.id) {
      if (confirm('All changes will be lost if you move ton anthor page !')) {
        return true;
      }
    }
    else{
      return true;
    }
    return false;
  }

}
