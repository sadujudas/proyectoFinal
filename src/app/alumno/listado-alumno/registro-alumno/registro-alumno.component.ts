import { Component, OnInit, Output,Input ,EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { startWith, map } from 'rxjs/operators';
import { Route,Router,ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { DatePipe, PercentPipe } from "@angular/common";
import { DateAdapter} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MessagesTitles, MessagesGeneral, MessagesStatus,MessagesDates } from '../../../model/messages';

import {HttpErrorResponse } from '@angular/common/http';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';


@Component({
    selector: 'app-registro-alumno',
    templateUrl: './registro-alumno.component.html',
    styleUrls: ['./registro-alumno.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesStatus,MessagesDates,
      DatePipe,
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        
      },
  
      
    ]
})

export class RegistroAlumnoComponent implements OnInit{
    loading :boolean = false;
    save : boolean = false;
    flagCreateUpdate :boolean = false;
    titulo:string = "Crear nuevo alumno";
    subtitulo: string = "";
    @Input() alumno : any;
    @Output() cerrarRegistroAlumnos: EventEmitter<boolean> = new EventEmitter();

    formularioCrearAlumno : FormGroup;
    dataSource :any;

    constructor(private routerActive:ActivatedRoute,private router:Router,private AlumnoService:AlumnoService,private msgStatus:MessagesStatus,private msgTitulos : MessagesTitles){

        this.formularioCrearAlumno = new FormGroup({
            "Alumnoid": new FormControl(''),
            "Nom_alumno": new FormControl(''),
            "Ape_alumno": new FormControl(''),
            "Dni": new FormControl(''),
            "Edad": new FormControl(''),
        })
    }

    ngOnInit(){

        if(this.alumno){
            this.editarAlumno(this.alumno)
          }else{
            
          }
    }

    CerrarPopUp(){
        this.cerrarRegistroAlumnos.emit();
    }

    editarAlumno(element){
        this.flagCreateUpdate = true;
        this.titulo = "Editar Alumno";
        this.subtitulo =  "Nro "+element.Alumnoid;
        this.formularioCrearAlumno.controls['Alumnoid'].setValue(element.Alumnoid);
        this.formularioCrearAlumno.controls['Nom_alumno'].setValue(element.Nom_alumno);
        this.formularioCrearAlumno.controls['Ape_alumno'].setValue(element.Ape_alumno);
        this.formularioCrearAlumno.controls['Dni'].setValue(element.Dni);
        this.formularioCrearAlumno.controls['Edad'].setValue(element.Edad);
       
    }

    crearAlumno(){
        console.log("GRABAR",this.formularioCrearAlumno.getRawValue());
        //console.log("GRABAR",this.usuario.usuarioId);
        
        
    
        this.loading = true;
    
        if(this.flagCreateUpdate){
          this.AlumnoService.EditarAlumno(this.formularioCrearAlumno.getRawValue()).subscribe(
            res => {
              this.loading = false;
              this.save = true;
            },(err: HttpErrorResponse)=> {
              this.loading = false;
              if (err.error instanceof ErrorEvent) {
                this.msgStatus.getMessage(err.status);
              } else {
                  this.msgStatus.getMessage(err.status);            
              }
              Swal.fire({
                title: this.msgTitulos.Error,
                text: "Alumno no actualizado. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )
        } else {
          this.AlumnoService.AgregarAlumno(this.formularioCrearAlumno.getRawValue()).subscribe(
            res => {
              this.loading = false;
              this.save = true;
            },(err: HttpErrorResponse)=> {
              this.loading = false;
              if (err.error instanceof ErrorEvent) {
                this.msgStatus.getMessage(err.status);
              } else {
                  this.msgStatus.getMessage(err.status);            
              }
              Swal.fire({
                title: this.msgTitulos.Error,
                text: "Alumno no creado. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )  
        }
    }


}