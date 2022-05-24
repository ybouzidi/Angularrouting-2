import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { authResponseData, AuthService } from 'src/app/services/auth.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal/alert-modal.component';
import { PlaceholderDirective } from 'src/app/shared/Placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  closeSub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  constructor(
    private _authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe(); // best practice
    }
  }

  ngOnInit(): void {
  }
  onSwitchModel() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.isLoginMode);
  }

  onCloseClick() {
    this.error = null;
  }

  onFormSubmit(authForm: NgForm, event: Event) {

    if (!authForm.valid || event['submitter'].innerText === 'Switch to Login' || event['submitter'].innerText === 'Switch to SignUP') {
      return;
    }
    this.isLoading = true;
    let authObserv: Observable<authResponseData>;

    if (this.isLoginMode) {
      //login request call
      authObserv = this._authService.login(authForm.value.email, authForm.value.password);
    } else {
      //sign up request
      console.log('sign up request');
      authObserv = this._authService.signUp(authForm.value.email, authForm.value.password);
    }

    authObserv.subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      this.router.navigate(['/']);
    }, errorResp => {
      this.error = errorResp;
      this.showErrorAlert(errorResp);
      this.isLoading = false;
    });
  }

  showErrorAlert(message: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertModalComponent);    
    console.log(this.alertHost);
    //this.alertHost.viewContainerRef.clear();
    const componentRef = this.alertHost.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.error = message;
    this.closeSub = componentRef.instance.onClose_.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    });
  }

}
