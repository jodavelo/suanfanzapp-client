import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginI } from 'src/app/shared/interfaces/LoginI';
import { PrefixI } from 'src/app/shared/interfaces/PrefixI';
import { UserI } from 'src/app/shared/interfaces/UserI';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PrefijoService } from 'src/app/shared/services/prefijo.service';
import { InvalidValueValidator } from 'src/app/shared/validators/invalid-value.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginMail: boolean = true;

  radioFormControl = new FormControl('mail');
  mailFormControl = new FormControl(null,[
    Validators.email, Validators.required
  ]);

  loginFormGroup: FormGroup = new FormGroup({
    radioFormControl: this.radioFormControl,
    mailFormControl: this.mailFormControl,
    prefijoFormControl: new FormControl(-1,[]),
    numeroFormControl: new FormControl(null,[]),
    contrasenaFormControl: new FormControl(null, [
      Validators.required,
      Validators.maxLength(15),
    ]),
  });

  hide = true;

  listaPrefijos: PrefixI[];

  userLogin: LoginI = {
    correo: '',
    contrasena: '',
    telefono: 0,
    id_prefijo: 0,
  };

  //incomingUser: UserI = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private prefijoService: PrefijoService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getPrefix();
    this.loginFormGroup.get('radioFormControl').valueChanges.subscribe(value => {
      //console.log(value);
      this.isLoginMail = value === 'mail';
      if(this.isLoginMail){
        this.loginFormGroup.get('numeroFormControl').clearValidators();
        this.loginFormGroup.get('prefijoFormControl').clearValidators();
        this.loginFormGroup.get('mailFormControl').setValidators([Validators.email, Validators.required]);
      } else{
        this.loginFormGroup.get('numeroFormControl').setValidators([Validators.required, Validators.maxLength(15)]);
        this.loginFormGroup.get('prefijoFormControl').setValidators([Validators.required, InvalidValueValidator.createValidator(-1)]);
        this.loginFormGroup.get('mailFormControl').clearValidators();
      }

      this.loginFormGroup.get('numeroFormControl').updateValueAndValidity();
      this.loginFormGroup.get('prefijoFormControl').updateValueAndValidity();
      this.loginFormGroup.get('mailFormControl').updateValueAndValidity();
    });
  }

  getPrefix() {
    this.prefijoService.getAll().subscribe(res => {
      this.listaPrefijos = res;
      //console.log(this.listaPrefijos);
    }, err => {
      console.log(err);
    });
  }

  getErrorMessage() {
    if (this.mailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.mailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  doLogin() {
    console.log(this.loginFormGroup.value);

    this.userLogin = {
      correo: this.loginFormGroup.get('mailFormControl').value,
      contrasena: this.loginFormGroup.get('contrasenaFormControl').value,
      telefono: this.loginFormGroup.get('numeroFormControl').value,
      id_prefijo: this.loginFormGroup.get('prefijoFormControl').value
    };

    if (this.radioFormControl.value === 'mail') {
      this.authService.loginMail(this.userLogin).subscribe(res => {
        console.log(res);
        this.openSnackBar(res.message);
        if(res.user != null){
          window.localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['']);
        }
      }, err => {
        console.log(err);
        this.openSnackBar(err);
      });
      console.log(this.userLogin);
    } else {
      this.authService.loginPhone(this.userLogin).subscribe(res => {
        console.log(res);
        this.openSnackBar(res.message);
        if(res.user != null){
          window.localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['']);
        }
      }, err => {
        console.log(err);
        this.openSnackBar(err);
      });
      console.log(this.userLogin);
    }
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  setLoginMail(evt: any) {
    console.log(evt.toElement);
    this.isLoginMail = evt.toElement.id === 'mail';
  }
}