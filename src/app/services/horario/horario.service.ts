import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class HorarioService{

    header : HttpHeaders;
    constructor(private http: HttpClient){}

    ListarHorario(){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL horario
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.get(`http://localhost:2526/api-proyecto/ListarHorario`,{headers});//Agregamos la URL para lista el horario
    }

    CrearHorario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL horario
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/CrearHorario`,body,{headers});//Agregamos la URL para crear el horario
    }

    ActualizarHorario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL horario
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/ActualizarHorario`,body,{headers});//Agregamos la URL para actualizar el horario
    }

    EliminarHorario(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL horario
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/EliminarHorario?horarioid=${body}`,{headers});//Agregamos la URL para Eliminar el horario
    }


}