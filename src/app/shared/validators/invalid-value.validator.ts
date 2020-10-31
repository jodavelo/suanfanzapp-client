import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { RegistroService } from '../services/registro.service';

export class InvalidValueValidator {
  static createValidator(invalidOption: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        console.log(typeof(control.value));
        const forbidden = invalidOption === control.value;
        return forbidden ? {forbiddenName: {value: control.value}} : null;
      };
  }
}
