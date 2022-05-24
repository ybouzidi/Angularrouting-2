import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { AuthGuard } from './services/guards/auth.guard';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { page: 1, search: 'data home' } },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'posts', loadChildren: () => import('./posts/post.module').then(m => m.PostModule) },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'templateform', component: TemplateFormComponent, canActivate: [AuthGuard] },
  { path: 'reactiveform', component: ReactiveFormsComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
