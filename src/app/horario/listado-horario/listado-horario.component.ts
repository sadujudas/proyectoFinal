import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import { startWith, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DatePipe, formatCurrency } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swal from "sweetalert2";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MessagesTitles, MessagesGeneral, MessagesDates } from '../../model/messages';
import * as moment from 'moment';
import { state } from '@angular/animations';
import { HorarioService } from 'src/app/services/horario/horario.service';

export const MY_FORMATS = {
    parse: {
      dateInput: "DD-MM-YYYY"
    },
    display: {
      dateInput: "DD-MM-YYYY",
      monthYearLabel: "MMM YYYY",
      dateA11yLabel: "LL",
      monthYearA11yLabel: "MMMM YYYY"
    }
};

@Component({
    selector: 'app-listado-horario',
    templateUrl: './listado-horario.component.html',
    styleUrls: ['./listado-horario.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesDates,DatePipe,
        
         
    ]
})

export class ListadoHorarioComponent{

    today = moment();
    loading:boolean;
    data : any =  [];
    horario : any = [];
    horarios: any = [];
    
    value = '';
    
    abrirRegistroHorario :boolean = false;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    pageSizeOptions = [15,20,30,50,100,200];
    displayedColumns =['checked','horarioid','entrada','salida','turno'];//Mencionamos los campos que tendra horario
    dataSource:any;

    constructor(private router:Router, private HorarioService:HorarioService,private datepipe :DatePipe){

    }
    applyFilter(filterValue: string) {
        console.log("valor",filterValue);
        if(null != this.dataSource){
           this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

    ngOnInit(){
        this.ListadoHorarioFiltro();
    }


    ListadoHorarioFiltro(){
        this.loading = true;
        this.HorarioService.ListarHorario().subscribe(
            res=>{//Buscara los datos que solicitado por filtro
                this.horarios = res;
                console.log('this.horarios',this.horarios)
                this.dataSource = new MatTableDataSource(this.horarios);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.loading = false;
            },err =>{//Dara error en caso que no encuentre los datos solicitado
              console.log('Error',err)
                Swal.fire({
                    title: "¡Algo salió mal!",
                    text:  err.error['error'],
                    icon: "warning",
                    allowOutsideClick: true 
                });
                this.loading = false;
            }
        )
    }

    editarHorario(element){
        this.horario = element;
        console.log("elment",element);
        //this.flagDeudasDetalle=true;
        this.abrirRegistroHorario = true;//Te ubicara a la ventana donde se hara el registro
    }

    CerrarPopUpRegHorarios(){
        this.ListadoHorarioFiltro();
        console.log("cerrar en listado");
        this.abrirRegistroHorario = false;
    }

    EliminarHorario(element){
        console.log("baja=>",element);
        this.horarios = element //Seleccionara el registro que quieres eliminar
    
        Swal.fire({//Te consultara si desea eliminar un registro
            title:'Anular horario',
            html:'<span>¿Desea eliminar el horario <b>'+element.horarioid+'</b>?</span>',
            icon: 'warning',
            focusConfirm: false,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor:'#FC3333',
            cancelButtonColor:'#3351FC',
            confirmButtonText:'Si,confirmar.',
            cancelButtonText: 'No,Cancelar.'
          }).then((result)=>{
            if(result.value){
            console.log("result=>",result.value)
              Swal.fire({
                title: '¡Espere!',
                html: 'Procesando solicitud.'
              })
              Swal.showLoading();
              console.log("res",this.horarios.horarioid)
              this.HorarioService.EliminarHorario(this.horarios.horarioid).subscribe(
                res =>{ 
                    console.log("res",res)
                  Swal.fire({
                    title: '¡Horario anulado!',
                    text: 'El nro '+element.horarioid+' ha sido anulado.',
                    icon:'success'
                }).then(resp =>{
                      console.log("resp",resp.value)
                    if(resp.value == true){
                      Swal.close();
                      this.ListadoHorarioFiltro();
                    }
                  });
                },
                err =>{
                    console.log("error",err)
                  Swal.fire({
                    title: "Error",
                    text: 'No se pudo anular el Alumno Nro '+element.horarioid+'.',
                    icon: "error",
                    allowOutsideClick: false
                  });
                }
              )}
          });
        }



}
