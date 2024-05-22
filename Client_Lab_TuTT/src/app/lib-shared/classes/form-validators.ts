import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

export function minimumAgeAsyncValidator(minAge: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      delay(1000), // Simulate async operation with a delay
      map((birthDate: string) => {
        if (!birthDate) {
          return null; // No value provided
        }
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        console.log("so tuoi da chon",age);
        const monthDifference = today.getMonth() - birthDateObj.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
          age--;
        }

        return age >= minAge ? null : { minimumAge: { requiredAge: minAge, actualAge: age } };
      })
    );
  };
}

export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Return null if control is empty to avoid validation error on untouched fields
    }

    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= minAge ? null : { underage: { value: control.value } };
  };
}