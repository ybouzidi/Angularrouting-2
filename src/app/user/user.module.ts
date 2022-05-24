import { NgModule } from "@angular/core";
import { EditUserComponent } from "../edit-user/edit-user.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UsersComponent } from "../users/users.component";
import { SharedModule } from "../shared/shared.module";
import { DummyService } from "../services/dummy.service";

@NgModule({
    declarations: [
        UserComponent,
        EditUserComponent,
        UsersComponent
    ],
    imports: [
        //BrowserModule, à utiliser une seule fois dans l'application et à la place on utilise : CommonModule ==> ngFor, ngIf, ngSwitch...
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule {

}