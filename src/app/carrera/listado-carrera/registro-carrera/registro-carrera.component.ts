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
import { CarreraService } from 'src/app/services/carrera/carrera.service';
import { HorarioService } from 'src/app/services/horario/horario.service';


@Component({
    selector: 'app-registro-carrera',
    templateUrl: './registro-carrera.component.html',
    styleUrls: ['./registro-carrera.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesStatus,MessagesDates,
      DatePipe,
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        
      },
  
      
    ]
})

export class RegistroCarreraComponent implements OnInit{

    loading :boolean = false;
    save : boolean = false;
    flagCreateUpdate :boolean = false;
    titulo:string = "Crear nueva carrera";
    subtitulo: string = "";
    horariosarr: any;
    @Input() carrera : any;
    @Output() cerrarRegistroCarreras: EventEmitter<boolean> = new EventEmitter();

    formularioCrearCarrera : FormGroup;
    dataSource :any;
    constructor(private routerActive:ActivatedRoute,
        private router:Router,
        private CarreraService:CarreraService,
        private msgStatus:MessagesStatus,
        private msgTitulos : MessagesTitles,
        private HorarioService : HorarioService){

        this.formularioCrearCarrera = new FormGroup({
            "carreraid": new FormControl(''),
            "Nom_carrera": new FormControl(''),
            "Profesor_cargo": new FormControl(''),
            "horarioid": new FormControl(''),
            "turno": new FormControl('')
        })
    }

    ngOnInit(){

        if(this.carrera){
            this.editarCarrera(this.carrera)
          }else{
            this.obtenerHorarios();
          }
    }

    CerrarPopUp(){
        this.cerrarRegistroCarreras.emit();
    }

    editarCarrera(element){
        this.flagCreateUpdate = true;
        this.titulo = "Editar Carrera";
        this.subtitulo =  "Nro "+element.carreraid;
        this.formularioCrearCarrera.controls['carreraid'].setValue(element.carreraid);
        this.formularioCrearCarrera.controls['Nom_carrera'].setValue(element.Nom_carrera);
        this.formularioCrearCarrera.controls['Profesor_cargo'].setValue(element.Profesor_cargo);
        this.formularioCrearCarrera.controls['horarioid'].setValue(element.horarioid);
        this.formularioCrearCarrera.controls['turno'].setValue(element.turno);
     
       
    }
    obtenerHorarios(){
        this.HorarioService.ListarHorario().subscribe(res =>{
          this.horariosarr = res;
          console.log("productos",this.horariosarr)
        })
    }

    setTurno(evento){
        console.log("turno",evento.value);
        this.horariosarr.forEach(element => {
          if(element.horarioid == evento.value){
            this.formularioCrearCarrera.controls['turno'].setValue(element.turno);
            console.log("elem",element.turno);
          }
        });    
      }

    crearCarrera(){
        console.log("GRABAR",this.formularioCrearCarrera.getRawValue());
        //console.log("GRABAR",this.usuario.usuarioId);
        
        
    
        this.loading = true;
    
        if(this.flagCreateUpdate){
          this.CarreraService.ActualizarCarrera(this.formularioCrearCarrera.getRawValue()).subscribe(
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
                text: "Carrera no actualizada. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )
        } else {
          this.CarreraService.CrearCarrera(this.formularioCrearCarrera.getRawValue()).subscribe(
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
                text: "Carrera no creada. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )  
        }
    }

}