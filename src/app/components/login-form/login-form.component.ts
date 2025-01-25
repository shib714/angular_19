import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    JsonPipe,
    JumbotronComponent,

  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  myForm!: FormGroup;
  // submitted = false;
  fb = inject(FormBuilder);

  
  //constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();

    this.myForm.get('username')?.valueChanges.subscribe(x => {
      this.validateUsernameControl(this.myForm.get('username') as FormControl);
    })
    console.log(this.myForm.controls['username'].value);

    this.myForm.get('email')?.valueChanges.subscribe(x => {
      this.validateEmailControl(this.myForm.get('email') as FormControl);
    })
    console.log(this.myForm.controls['email'].value);

    this.myForm.get('password')?.valueChanges.subscribe(x => {
      this.validatePasswordControl(this.myForm.get('password') as FormControl);
    })
    console.log(this.myForm.controls['password'].value);
    console.log(this.myForm.controls);
    
  }

  createForm(): void {
    this.myForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), customPasswordValidator]],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      console.log(JSON.stringify(this.myForm.value, null, 2));
    }
  }
  onReset(): void {
    this.myForm.reset();
  }

  //username validation
  public userNameErrorMessage!: string;

  private validateUsernameControl(usernameControl: FormControl): void {
    this.userNameErrorMessage = '';
    if (usernameControl.errors) {

      if ((usernameControl.touched || usernameControl.dirty) || usernameControl.errors?.['required']) {
        this.userNameErrorMessage = 'This is a required field';

      }
      if (usernameControl.errors?.['minlength']) {
        this.userNameErrorMessage = 'Minimum length is ' + usernameControl.errors?.['minlength']?.requiredLength;
      }
    }
  }
  //email validation
  public emailErrorMessage!: string;
  private validateEmailControl(emailControl: FormControl): void {
    this.emailErrorMessage = '';
    if (emailControl.errors) {
      if ((emailControl.touched || emailControl.dirty) || emailControl.errors?.['required']) {
        this.emailErrorMessage = 'This is a required field';
      }
      if (emailControl.errors?.['email']) {
        this.emailErrorMessage = 'Please enter a valid email address.';
      }
    }
  }
  //password validation
  public passwordErrorMessage!: string;
  private validatePasswordControl(passwordControl: FormControl): void {
    this.passwordErrorMessage = '';
    if (passwordControl.errors && (passwordControl.touched || passwordControl.dirty)) {
      if ( passwordControl.errors?.['required']) {
        this.passwordErrorMessage = 'This is a required field';
      }
      if (passwordControl.errors?.['minlength']) {
        this.passwordErrorMessage = 'Minimum length is ' + passwordControl.errors?.['minlength']?.requiredLength;
      }
      if (passwordControl.errors?.['invalidPassword']) {
        this.passwordErrorMessage = 'Please enter a valid password.';
      }
    }
  }


}
function customPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const valid = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(control.value);
  return valid ? null : { 'invalidPassword': true };
}