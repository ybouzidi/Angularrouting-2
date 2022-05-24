import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditUserComponent } from "../edit-user/edit-user.component";
import { AuthGuard } from "../services/guards/auth.guard";
import { DeactivateGaurdService } from "../services/guards/deactivate-gaurd.service";
import { UserResolveService } from "../services/resolvers/user-resolve.service";
import { UserComponent } from "./user.component";
import { UsersComponent } from "../users/users.component";

const userRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: ':id/:name',
                component: UserComponent
            },
            {
                path: ':id/:name/edit',
                component: EditUserComponent,
                canDeactivate: [DeactivateGaurdService],
                resolve: {
                    user: UserResolveService
                }
            },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}