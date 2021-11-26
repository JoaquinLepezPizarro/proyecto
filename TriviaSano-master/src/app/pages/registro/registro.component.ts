import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../usuarios.service'


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  show:number=1;
  
  constructor(private ServicioUsuario:UsuariosService) { }

  ngOnInit(): void {
    //EL .subscribe ES PARA MIRAR LO QUE SE ESTA CAMBIANDO, EN ESTE CASO "datos" SERÁ LA VARIABLE QUE SEA OBSERVADOR
    this.ServicioUsuario.ConsultarUsuarios().subscribe(datos=>{
      console.log(datos);
    })
  }

  
  showModal(){
    
  }
}
