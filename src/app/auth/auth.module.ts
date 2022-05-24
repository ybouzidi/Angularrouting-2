import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal/alert-modal.component';
import { PlaceholderDirective } from '../shared/Placeholder.directive';


const routes_ = [{ path: 'auth', component: AuthComponent }];

@NgModule({
  declarations: [
    AuthComponent,
    LoadingSpinnerComponent,
    AlertModalComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes_),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports:[
    PlaceholderDirective,
    AuthComponent,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    AlertModalComponent,
    
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
