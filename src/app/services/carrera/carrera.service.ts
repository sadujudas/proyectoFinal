import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class CarreraService{

    header : HttpHeaders;
    constructor(private http: HttpClient){}

    ListarCarreras(){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.get(`http://localhost:2526/api-proyecto/ListarCarreras`,{headers});
    }

    CrearCarrera(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.post(`http://localhost:2526/api-proyecto/CrearCarrera`,body,{headers});
    }

    ActualizarCarrera(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/ActualizarCarrera`,body,{headers});
    }

    DeshabilitarCarrera(body:any){
        let headers :  HttpHeaders = new HttpHeaders();
        headers =  headers.append('Content-Type', 'application/json');
        headers =  headers.append('Authorization', 'srvSeguridad');
        return this.http.put(`http://localhost:2526/api-proyecto/DeshabilitarCarrera?carreraid=${body}`,{headers});
    }

}