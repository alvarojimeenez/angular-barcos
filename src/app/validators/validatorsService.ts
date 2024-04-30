import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

    equalFields (field1: string, field2: string) : ValidatorFn{
    return (formControl: AbstractControl): ValidationErrors | null => {
        const control2 : FormControl = <FormControl>formControl.get(field2);
        const field1Input : string = formControl.get(field1)?.value;
        const field2Input : string = control2?.value;

        if (field1Input !== field2Input) {
        control2.setErrors({ nonEquals: true})
        return { nonEquals: true};
        
        }
        
        if(control2?.errors && control2.hasError('nonEquals')) {
        delete control2.errors['nonEquals'];
        control2.updateValueAndValidity();
        }
        return null
    }
    }

    createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
    }

    dateNotValid(control: AbstractControl): ValidationErrors | null {

        const fieldInput: Date = new Date(control.value)
        const today = new Date();

        if (fieldInput<today) {
            return { fechaMenor: true}
        }else {
            return null;
        }
    }



  constructor() { }
}