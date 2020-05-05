import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia/asistencia.service';



@Component({
    selector:'app-asistencia',
    templateUrl:'./asistencia.component.html',
    styleUrls: ['./asistencia.component.scss'],
})

export class AsistenciaComponent implements OnInit{
    abrirRegistroAsistencias : boolean = false;
    asistencia : any;

    constructor(private asistenciaService:AsistenciaService){

    }

    ngOnInit(){
        
    }

    crearRegistroAsistencias(){
        this.asistencia = [];
        this.abrirRegistroAsistencias = true;
    }

    CerrarPopUpRegAsistencias(Click:boolean){
        this.abrirRegistroAsistencias = false;
    }
}