import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { HttpClientModule } from "@angular/common/http";
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './posts/post.module';
import { FilterModule } from './filter.module';
import { CoreModule } from './core.module';
import { DummyService } from './services/dummy.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    PageNotFoundComponent,
    TemplateFormComponent,
    ReactiveFormsComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    //UserModule, Lazy Loading ==> voir app routing module
    //PostModule, Lazy Loading ==> voir app routing module
    AuthModule,
    FilterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
