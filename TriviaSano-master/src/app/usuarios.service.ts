import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private servicio:HttpClient) { }

  //METODO PARA ACCEDER A LA BASE DE DATOS, SOLO TABLA "usuarios"
  ConsultarUsuarios():Observable<any> {
    return this.servicio.get(environment.servidor + "/Usuarios");
  }
}
