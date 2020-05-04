import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../services/alumno/alumno.service';


@Component({
    selector:'app-alumno',
    templateUrl:'./alumno.component.html',
    styleUrls: ['./alumno.component.scss'],
})

export class AlumnoComponent implements OnInit{
    abrirRegistroAlumnos : boolean = false;
    alumno : any;

    constructor(private alumnoService:AlumnoService){

    }

    ngOnInit(){
        
    }

    crearRegistroAlumnos(){
        this.alumno = [];
        this.abrirRegistroAlumnos = true;
    }

    CerrarPopUpRegAlumnos(Click:boolean){
        this.abrirRegistroAlumnos = false;
    }
}