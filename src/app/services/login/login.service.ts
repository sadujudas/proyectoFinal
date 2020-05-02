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
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.get(`http://localhost:2526/api-proyecto/ListarUsuarios1?usuarioNombre=${filtros.usuario}`,{headers});
    }

    CrearUsuarios(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/CrearUsuarios1`,body,{headers});
    }

    loginUsuario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/loginUsuario1`,body,{headers});
    }

    CambiarContrasena(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/CambiarContrasena1`,body,{headers});
    }

    EliminarUsuario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/EliminarUsuario`,body,{headers});
    }

    ActualizarUsuario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/ActualizarUsuario1`,body,{headers});
    }
}