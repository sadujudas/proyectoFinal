import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { FiltroAsistencia } from 'src/app/model/FiltroAsistencia';

@Injectable({ providedIn: 'root' })

export class AsistenciaService{

    header : HttpHeaders;
    constructor(private http: HttpClient){}


    ListarAsistencia(filtros:FiltroAsistencia){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.get(`http://localhost:2526/api-proyecto/ListarAsistencia?alumnoid=${filtros.IdAlum}&carreraid=${filtros.IdCarre}&FechaIni=${filtros.FechaIni}&FechaFin=${filtros.FechaFin}&condicion=${filtros.Condicion}&horarioid=${filtros.IdHora}`,{headers});//Agregamos la URL para listar la asistencia mediante filtros
    }

    RegistrarAsistencia(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/RegistrarAsistencia`,body,{headers});//Agregamos la URL para crear la asistencia
    }

    EditarAsistencia(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');//Poner los parametros para permitir el ingreso de la URL
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/EditarAsistencia`,body,{headers});//Agregamos la URL para editar la asistencia
    }


}