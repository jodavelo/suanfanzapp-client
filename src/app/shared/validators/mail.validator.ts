import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { RegistroService } from '../services/registro.service';

export class MailValidator {
  static createValidator(registroService: RegistroService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      //console.log(control.value);
      const res = registroService.verifyMail(control.value).pipe(
        map((result: boolean) => result===false ? null : {invalidAsync: true})
      );
      //console.log(res);
      return res;
    };
  }
}
