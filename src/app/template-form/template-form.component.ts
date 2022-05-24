import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit, OnChanges {
  @ViewChild('f') signUpForm: NgForm;
  gender = 'male';
  about = '';
  submitted = false;
  user = {
    username: '',
    email: '',
    gender: '',
    about: '',
  }
  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.submitted = true;
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.gender = this.signUpForm.value.gender;
    this.user.about = this.signUpForm.value.about;
    //this.signUpForm.reset();
  }

  checkData() {
    //console.log(this.signUpForm);
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.signUpForm.value);
    //this.checkData();
  }

  fillValues() {
    this.signUpForm.form.patchValue({
      //about: 'je suis yakoub',
      gender: 'male',
      userData: {
        username: 'test',
        email: 'test@test.com'
      }
    })
  }
}
