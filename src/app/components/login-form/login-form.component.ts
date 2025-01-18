import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import Validation from '../utils/validation';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    JsonPipe
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  myForm!: FormGroup;
  submitted = false;
  fb = inject(FormBuilder);

  //constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm()    
    console.log(this.myForm.controls);
    console.log(this.myForm.controls['fullname'].value);
  }

  createForm() : void {
    this.myForm = this.fb.group(
      {
        fullname: ['', Validators.required],
        //firstName: this.fb.control<string>('', Validators.required),
        username: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    // if (this.myForm.invalid) {
    //   return;
    // } 
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      console.log(JSON.stringify(this.myForm.value, null, 2));
    }
  }
  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }

}
