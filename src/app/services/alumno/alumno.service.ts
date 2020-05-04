import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

import { FiltroAlumno } from 'src/app/model/FiltroAlumno';

@Injectable({ providedIn: 'root' })

export class AlumnoService{

    header : HttpHeaders;
    constructor(private http: HttpClient){}


    ListarAlumnos(filtros:FiltroAlumno){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.get(`http://localhost:2526/api-proyecto/ListarAlumnos?Nom_Alumno=${filtros.nombre}&Ape_alumno=${filtros.apellido}&Dni=${filtros.dni}&Edad=${filtros.edad}&codigo=${filtros.codigo}`,{headers});
    }

    AgregarAlumno(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/AgregarAlumno`,body,{headers});
    }

    EditarAlumno(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/EditarAlumno`,body,{headers});
    }

    EliminarAlumno(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/EliminarAlumno?Alumnoid=${body}`,{headers});
    }

}