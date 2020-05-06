import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { FiltroUsuario } from 'src/app/model/filtroUsuario';

@Injectable({ providedIn: 'root' })

export class LoginService{

    header : HttpHeaders;
    constructor(private http: HttpClient){}

    ListarUsuarios(filtros:FiltroUsuario){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.get(`http://localhost:2526/api-proyecto/ListarUsuarios1?usuarioNombre=${filtros.nombre}`,{headers});//Agregamos la URL para listar los usuarios por nombre
    }

    CrearUsuarios(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/CrearUsuarios1`,body,{headers});//Agregamos la URL para crear los usuarios 
    }

    loginUsuario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/loginUsuario1`,body,{headers});//Agregamos la URL para mostrar la pagina de logeo
    }

    CambiarContrasena(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/CambiarContrasena1`,body,{headers});//Agregamos la URL para solo para cambiar la contraseña
    }

    EliminarUsuario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/EliminarUsuario?usuarioId=${body}`,{headers});//Agregamos la URL para solo para eliminar la contraseña
    }

    ActualizarUsuario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/ActualizarUsuario1`,body,{headers});//Agregamos la URL para solo para cambiar el usuario excepto su contraseña
    }
}