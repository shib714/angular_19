import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import{MatNativeDateModule} from '@angular/material/core';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';


@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
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
  public fullNameErrorMessage!: string  ;

  //constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm() ;

    this.myForm.get('fullname')?.valueChanges.subscribe(x => {
      this.validateFullnameControl(this.myForm.get('fullname') as FormControl);
    })  
    console.log(this.myForm.controls);
    console.log(this.myForm.controls['fullname'].value);
  }

  createForm() : void {
    this.myForm = this.fb.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value );
      console.log(JSON.stringify(this.myForm.value, null, 2));
    }
  }
  onReset(): void {
    this.myForm.reset();
  }

  //validation
  private validateFullnameControl(fullnameControl: FormControl): void {
    this.fullNameErrorMessage = '';
    if (fullnameControl.errors) {

    if ((fullnameControl.touched || fullnameControl.dirty) || fullnameControl.errors?.['required']) {
      this.fullNameErrorMessage = 'This is a required field';
      
    } 
    if (fullnameControl.errors?.['minlength']) {
          this.fullNameErrorMessage = 'Minimum length is ' + fullnameControl.errors?.['minlength']?.requiredLength;
    }
  }
}
    
    
 
}
