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
import { HorarioService } from 'src/app/services/horario/horario.service';

@Component({
    selector: 'app-registro-horario',
    templateUrl: './registro-horario.component.html',
    styleUrls: ['./registro-horario.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesStatus,MessagesDates,
      DatePipe,
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        
      },
  
      
    ]
})

export class RegistroHorarioComponent implements OnInit{

    loading :boolean = false;
    save : boolean = false;
    flagCreateUpdate :boolean = false;
    titulo:string = "Crear nuevo Horario";
    subtitulo: string = "";
    @Input() horario : any;
    @Output() cerrarRegistroHorarios: EventEmitter<boolean> = new EventEmitter();

    formularioCrearHorario : FormGroup;
    dataSource :any;

    constructor(private routerActive:ActivatedRoute,private router:Router,private HorarioService:HorarioService,private msgStatus:MessagesStatus,private msgTitulos : MessagesTitles){

        this.formularioCrearHorario = new FormGroup({
            "horarioid": new FormControl(''),
            "entrada": new FormControl(''),
            "salida": new FormControl(''),
            "turno": new FormControl(''),
            
        })

    }


    ngOnInit(){

        if(this.horario){
            this.editarHorario(this.horario)
          }else{
            
          }
    }

    CerrarPopUp(){
        this.cerrarRegistroHorarios.emit();
    }

    editarHorario(element){
        this.flagCreateUpdate = true;
        this.titulo = "Editar Horario";
        this.subtitulo =  "Nro "+element.horarioid;
        this.formularioCrearHorario.controls['horarioid'].setValue(element.horarioid);
        this.formularioCrearHorario.controls['entrada'].setValue(element.entrada);
        this.formularioCrearHorario.controls['salida'].setValue(element.salida);
        this.formularioCrearHorario.controls['turno'].setValue(element.turno);
      
       
    }

    crearHorario(){
        console.log("GRABAR",this.formularioCrearHorario.getRawValue());
        

        this.loading = true;
    
        if(this.flagCreateUpdate){
          this.HorarioService.ActualizarHorario(this.formularioCrearHorario.getRawValue()).subscribe(
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
                text: "Horario no editado. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )
        } else {
          this.HorarioService.CrearHorario(this.formularioCrearHorario.getRawValue()).subscribe(
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
                text: "Horario no creado. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )  
        }
    }



}