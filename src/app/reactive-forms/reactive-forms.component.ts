import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  restrictedNames = ['Leela', 'azerty', 'qsdfgh'];
  isSubmitted = false;
  constructor() { }

  get hobbyControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.isRestrictedNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.isRestrictedEmails.bind(this))
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signUpForm.statusChanges.subscribe(value =>{
      console.log(value);
    });
    this.signUpForm.patchValue({
      userData:{
        username : 'test',
        email : 'test@test.com'
      },
      gender:'male',
      
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.signUpForm);
    if (!!this.signUpForm.get('userData.username').errors) {
      console.log(this.signUpForm.get('userData.username').errors['required']);
    }
    if (!!this.signUpForm.get('userData.email').errors) {
      console.log(this.signUpForm.get('userData.email').errors['required']);
    }

  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }
  isRestrictedNames(control: FormControl): { [s: string]: boolean } {
    if (this.restrictedNames.includes(control.value)) {
      return { nameIsRestricted: true };
    }
    return null;
  }
  isRestrictedEmails(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test') {
          resolve({ emailIsRestricted: true });
          console.log('email is restricted !');
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }
}
