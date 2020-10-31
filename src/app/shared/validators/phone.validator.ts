import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { TelefonoI } from '../interfaces/TelefonoI';
import { RegistroService } from '../services/registro.service';

export class PhoneValidator {
  static createValidator(registroService: RegistroService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      let telefono: TelefonoI = {
        id_prefijo: control.value.prefijoFormControl,
        telefono: control.value.numeroFormControl
      }
      const res =  registroService.verifyPhone(telefono).pipe(
        map((result: boolean) => result===false ? null : {invalidAsync: true})
      );
      //console.log(res);
      return res;
    };
  }
}
