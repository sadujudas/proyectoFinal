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
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { FiltroAlumno } from 'src/app/model/FiltroAlumno';
import { CarreraService } from 'src/app/services/carrera/carrera.service';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { FiltroCarrera } from 'src/app/model/FiltroCarrera';


@Component({
    selector: 'app-registro-asistencia',
    templateUrl: './registro-asistencia.component.html',
    styleUrls: ['./registro-asistencia.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesStatus,MessagesDates,
      DatePipe,
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        
      },
  
      
    ]
})

export class RegistroAsistenciaComponent implements OnInit{
    DTOFiltroAlumno : FiltroAlumno = new FiltroAlumno();
    DTOFiltroCarrera: FiltroCarrera = new FiltroCarrera();
    loading :boolean = false;
    save : boolean = false;
    flagCreateUpdate :boolean = false;
    titulo:string = "Registrar asistencia";
    subtitulo: string = "";
   
    arrayAlumnos : any;
   

    arrayCarreras : any;
   

    arrayHorarios : any;
  
  
    @Input() asistencia : any;
    @Output() cerrarRegistroAsistencias: EventEmitter<boolean> = new EventEmitter();

    formularioCrearAsistencia : FormGroup;
    dataSource :any;

    constructor(private routerActive:ActivatedRoute,
        private router:Router,
        private AsistenciaService:AsistenciaService,
        private msgStatus:MessagesStatus,
        private msgTitulos : MessagesTitles,
        private CarreraService:CarreraService,
        private HorarioService:HorarioService,
        private AlumnoService:AlumnoService,
        ){

        this.formularioCrearAsistencia = new FormGroup({
            "asistenciaid": new FormControl(''),
            "alumnoid": new FormControl(''),
            "carreraid": new FormControl(''),
            "condicion": new FormControl(''),
            "horarioid": new FormControl(''),
        })
    }

    ngOnInit(){
        if(this.asistencia){
            this.editarAsistencia(this.asistencia)
          }else{
            this.obtenerHorarios();
            this.obtenerCarreras();
            this.obtenerAlumnos();
          }
    }

    CerrarPopUp(){
        this.cerrarRegistroAsistencias.emit();
    }

    editarAsistencia(element){
        this.flagCreateUpdate = true;
        this.titulo = "Editar Registro de asistencia";
        this.subtitulo =  "Nro "+element.asistenciaid;
        this.formularioCrearAsistencia.controls['asistenciaid'].setValue(element.asistenciaid);
        this.formularioCrearAsistencia.controls['alumnoid'].setValue(element.alumnoid);
        this.formularioCrearAsistencia.controls['carreraid'].setValue(element.carreraid);
        this.formularioCrearAsistencia.controls['condicion'].setValue(element.condicion);
        this.formularioCrearAsistencia.controls['horarioid'].setValue(element.horarioid);
    }
   

      

    obtenerAlumnos(){
        this.AlumnoService.ListarAlumnos(this.DTOFiltroAlumno).subscribe(res =>{
          this.arrayAlumnos = res;
          
        })
      }
      


      

      obtenerCarreras(){
        this.CarreraService.ListarCarreras(this.DTOFiltroCarrera).subscribe(res =>{
          this.arrayCarreras = res;
          console.log("arrayCarreras",this.arrayCarreras)
          
        })
      }
      

     

      


      obtenerHorarios(){
        this.HorarioService.ListarHorario().subscribe(res =>{
          this.arrayHorarios = res;
          console.log("arrayHorarios",this.arrayHorarios)
   
         
        })
      }

     

    crearAsistencia(){
        console.log("GRABAR",this.formularioCrearAsistencia.getRawValue());
        //console.log("GRABAR",this.usuario.usuarioId);
        
        
    
        this.loading = true;
    
        if(this.flagCreateUpdate){
          this.AsistenciaService.EditarAsistencia(this.formularioCrearAsistencia.getRawValue()).subscribe(
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
                text: "Asistencia no actualizada. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )
        } else {
          this.AsistenciaService.RegistrarAsistencia(this.formularioCrearAsistencia.getRawValue()).subscribe(
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
                text: "Asistencia no registrada. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )  
        }
    }



}