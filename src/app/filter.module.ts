import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FilterPipesComponent } from "./filter-pipes/filter-pipes.component";
import { AuthGuard } from "./services/guards/auth.guard";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
        FilterPipesComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'filterpipes', component: FilterPipesComponent, canActivate: [AuthGuard] }
        ])
    ]
})
export class FilterModule {

}