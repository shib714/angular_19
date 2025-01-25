import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  //greaterThanZero(control: AbstractControl): { [key: string]: boolean } | null {
  greaterThanZero(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value > 0) {
      return null;
    }
    return { 'greaterThanZero': true };
  }
}
