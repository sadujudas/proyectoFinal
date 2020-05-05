import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { FiltroCarrera } from 'src/app/model/FiltroCarrera';

@Injectable({ providedIn: 'root' })

export class CarreraService{

    header : HttpHeaders;
    constructor(private http: HttpClient){}

    ListarCarreras(filtros:FiltroCarrera){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL Carrera_tec
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.get(`http://localhost:2526/api-proyecto/ListarCarreras?estado=${filtros.estado}`,{headers});//Agregamos la URL para Listar la Carrera_tec
    }

    CrearCarrera(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL Carrera_tec
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/CrearCarrera`,body,{headers});//Agregamos la URL para crear una Carrera_tec
    }

    ActualizarCarrera(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL Carrera_tec
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/ActualizarCarrera`,body,{headers});//Agregamos la URL para actualizar una Carrera_tec
    }

    DeshabilitarCarrera(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL Carrera_tec
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/DeshabilitarCarrera?carreraid=${body}`,{headers});//Agregamos la URL para deshabilitar una Carrera_tec
    }
    HabilitarCarrera(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Agregamos los parametros para la authorizacion para que funcione la URL Carrera_tec
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/HabilitarCarrera?carreraid=${body}`,{headers});//Agregamos la URL para habilitar una Carrera_tec
    }


}