// validation.service.ts
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export class ValidationService {
  static dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      return isNaN(Date.parse(value)) ? { 'invalidDate': true } : null;
    };
  }

  static phoneValidator(): ValidatorFn {
    return Validators.pattern(/^\d{10}$/);
  }

  static postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const isValidPostalCode = /^[0-9]{5}$/.test(control.value);
      return isValidPostalCode ? null : { 'invalidPostalCode': true };
    };
  }

  static socialSecurityNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const pattern = /^[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{6}$/;
      const isValidSSN = pattern.test(control.value);
      return isValidSSN ? null : { 'invalidSocialSecurityNumber': true };
    };
  }
}
