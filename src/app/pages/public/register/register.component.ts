import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
