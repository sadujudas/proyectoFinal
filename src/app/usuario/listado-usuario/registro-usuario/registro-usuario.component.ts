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
import { LoginService } from 'src/app/services/login/login.service';

@Component({
    selector: 'app-registro-usuario',
    templateUrl: './registro-usuario.component.html',
    styleUrls: ['./registro-usuario.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesStatus,MessagesDates,
      DatePipe,
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        
      },
  
      
    ]
})

export class RegistroUsuarioComponent implements OnInit{

    loading :boolean = false;
    save : boolean = false;
    flagCreateUpdate :boolean = false;
    titulo:string = "Crear nuevo usuario";
    subtitulo: string = "";
    @Input() usuario : any;
    @Output() cerrarRegistroUsuarios: EventEmitter<boolean> = new EventEmitter();

    formularioCrearUsuario : FormGroup;
    dataSource :any;

    constructor(private routerActive:ActivatedRoute,private router:Router,private LoginService:LoginService,private msgStatus:MessagesStatus,private msgTitulos : MessagesTitles){


        this.formularioCrearUsuario = new FormGroup({
            "usuarioId": new FormControl(''),
            "usuarioNombre": new FormControl(''),
            "usuarioDni": new FormControl(''),
            "usuarioEmail": new FormControl(''),
            "usuarioContraseña": new FormControl(''),
        })
    }

    ngOnInit(){
        if(this.usuario){
          this.editarUsuario(this.usuario)
        }else{
          
        }
        

    }

    CerrarPopUp(){
        this.cerrarRegistroUsuarios.emit();
    }

    editarUsuario(element){
        this.flagCreateUpdate = true;
        this.titulo = "Editar Usuario";
        this.subtitulo =  "Nro "+element.usuarioId;
        this.formularioCrearUsuario.controls['usuarioId'].setValue(element.usuarioId);
        this.formularioCrearUsuario.controls['usuarioNombre'].setValue(element.usuarioNombre);
        this.formularioCrearUsuario.controls['usuarioDni'].setValue(element.usuarioDni);
        this.formularioCrearUsuario.controls['usuarioEmail'].setValue(element.usuarioEmail);
        this.formularioCrearUsuario.controls['usuarioContraseña'].setValue(element.usuarioContraseña);
       
    }


    crearUsuario(){
        console.log("GRABAR",this.formularioCrearUsuario.getRawValue());
        //console.log("GRABAR",this.usuario.usuarioId);
        
        
    
        this.loading = true;
    
        if(this.flagCreateUpdate){
          this.LoginService.ActualizarUsuario(this.formularioCrearUsuario.getRawValue()).subscribe(
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
                text: "Usuario no actualizado. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )
        } else {
          this.LoginService.CrearUsuarios(this.formularioCrearUsuario.getRawValue()).subscribe(
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
                text: "Usuario no creado. "+this.msgStatus.message ,
                icon: "error",
                allowOutsideClick: true
              })
            }
          )  
        }
    }

    
}