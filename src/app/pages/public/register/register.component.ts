import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrefixI } from 'src/app/shared/interfaces/PrefixI';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PrefijoService } from 'src/app/shared/services/prefijo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/usuario.service';
import { RegistroService } from 'src/app/shared/services/registro.service';
import { UserI } from 'src/app/shared/interfaces/UserI';
import { PhoneValidator } from 'src/app/shared/validators/phone.validator';
import { MailValidator } from 'src/app/shared/validators/mail.validator';
import { TelefonoI } from 'src/app/shared/interfaces/TelefonoI';
import { InvalidValueValidator } from 'src/app/shared/validators/invalid-value.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  usuario: UserI = {
    id_user:-1,
    apellido:'',
    correo:'',
    descripcion:'',
    id_prefijo:null,
    nombre:'',
    telefono:null,
    urlImagen:'',
    contrasena:''
  };
  telefono:TelefonoI = {
    id_prefijo: null,
    telefono: null
  }
  
  telefonoFormGroup: FormGroup = new FormGroup({
    prefijoFormControl :new FormControl(-1, [
      Validators.required,
      InvalidValueValidator.createValidator(-1),
    ]), 
    numeroFormControl :new FormControl(null, [
      Validators.required,
      Validators.maxLength(15),
    ]),
  }, PhoneValidator.createValidator(this.registroService));
  emailFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ], MailValidator.createValidator(this.registroService));

  formGroup: FormGroup = new FormGroup({
    telefonoFormGroup: this.telefonoFormGroup,
    emailFormControl: this.emailFormControl, 
    contrasenaFormControl :new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]), 
    nombreFormControl :new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
    ]), 
    apellidoFormControl :new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
    ]), 
    urlFormControl :new FormControl(null), 
  });

  listaPrefijos: PrefixI[];
  hide = true;

  constructor(
    private router:Router,
    private authService: AuthService,
    private prefijoService: PrefijoService,
    private usuarioService: UserService,
    private registroService: RegistroService,
    private snackbar:MatSnackBar
    ) {
      
     }

  ngOnInit(): void {
    this.setPrefix();
  }

  setPrefix():void{
    this.prefijoService.getAll().subscribe(res => {
      this.listaPrefijos = res;
      //console.log(this.listaPrefijos);
    }, err => {
      console.error(err);
      this.openSnackBar(err);


    });
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this.snackbar.open(message, action, {
      duration: 3000,
    });
  }
  
  doRegister(e) {
    e.preventDefault();
    this.usuario = {
      apellido: this.formGroup.get('apellidoFormControl').value,
      correo:this.formGroup.get('emailFormControl').value,
      id_prefijo:this.formGroup.get('telefonoFormGroup').value,
      nombre:this.formGroup.get('nombreFormControl').value,
      telefono:this.formGroup.get('telefonoFormGroup').value,
      contrasena:this.formGroup.get('contrasenaFormControl').value,
      urlImagen:this.formGroup.get('urlFormControl').value,
      id_user:null,
      descripcion:null
    };

    console.log(this.usuario);
    this.usuarioService.save(this.usuario).subscribe(res => {
      console.log(res);
      this.openSnackBar(res.mesagge);

      this.router.navigate(['login']);
    }, err => {
      console.error(err);
      this.openSnackBar("Error",err);
    });
  }

}
