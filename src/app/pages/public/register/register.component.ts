import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrefixI } from 'src/app/shared/interfaces/PrefixI';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PrefijoService } from 'src/app/shared/services/prefijo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/usuario.service';
import { RegistroService } from 'src/app/shared/services/registro.service';
import { UserI } from 'src/app/shared/interfaces/UserI';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  usuario: UserI = {
    apellido:'',
    correo:'',
    descripcion:'',
    idPrefijo:null,
    nombre:'',
    telefono:null,
    urlImagen:'',
    contrasena:''
  };
  listaPrefijos: PrefixI[];
  hide = true;
  formGroup: FormGroup = new FormGroup({
    emailFormControl :new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });


  constructor(
    private router:Router,
    private authService: AuthService,
    private prefijoService: PrefijoService,
    private usuarioService: UserService,
    private registroService: RegistroService,
    ) {
      
     }

  ngOnInit(): void {
    this.getPrefix();
  }

  getPrefix(){
    this.prefijoService.getAll().subscribe(res => {
      this.listaPrefijos = res;
      console.log(this.listaPrefijos);
    }, err => {
      console.log(err);
    });
  }

  async doRegister(e) {
    e.preventDefault();

    if(this.usuario.correo.trim().length == 0){
      return;
    }
    if(this.usuario.contrasena.trim().length == 0){
      return;
    }
    if(this.usuario.telefono == null || this.usuario.telefono < 0){
      return;
    }
    if(this.usuario.idPrefijo == null || this.usuario.idPrefijo < 0){
      return;
    }
    if(this.usuario.nombre.trim().length == 0){
      return;
    }
    if(this.usuario.apellido.trim().length == 0){
      return;
    }
    if(this.usuario.urlImagen.trim().length == 0){
      return;
    }  

    const existingMail = await this.registroService.verifyMail(this.usuario).toPromise();
    if(existingMail == true){
      console.log('Mail existe');
      return;
    }
    const existingPhone = await this.registroService.verifyPhone(this.usuario).toPromise();
    console.log('existingmail: '+JSON.stringify(existingMail));
    console.log('existingphone: '+JSON.stringify(existingPhone));
    if(existingPhone == true){
      console.log('Telefono existe');
      return;
    }

    console.log(this.usuario);
    this.usuarioService.save(this.usuario).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });

    //this.authService.login(usuario);

    this.router.navigate(['login']);
  }

}
