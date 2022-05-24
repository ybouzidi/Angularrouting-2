import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts.component';
import { AuthGuard } from '../services/guards/auth.guard';

const routes = [
  {
    path: '', component: PostsComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [PostsComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class PostModule { }
