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
import { FiltroAlumno } from 'src/app/model/FiltroAlumno';
import { AlumnoService } from '../../services/alumno/alumno.service';


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
    selector: 'app-listado-alumno',
    templateUrl: './listado-alumno.component.html',
    styleUrls: ['./listado-alumno.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesDates,DatePipe,
        
         
    ]
})

export class ListadoAlumnoComponent{
    DTOFiltroAlumno : FiltroAlumno = new FiltroAlumno();
    today = moment();
    loading:boolean;
    data : any =  [];
    alumno : any = [];
    alumnos: any = [];
    
    value = '';
    
    abrirRegistroAlumno :boolean = false;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    pageSizeOptions = [15,20,30,50,100,200];
    displayedColumns = ['checked','Alumnoid','Nom_alumno','Ape_alumno','Dni','Edad','codigo']; // aqui llamamos las columnas de las tabla de alumno
    dataSource:any;

    constructor(private router:Router, private AlumnoService:AlumnoService,private datepipe :DatePipe){

    }
    applyFilter(filterValue: string) {//Comando que sirve para poder hacer los filtros
        console.log("valor",filterValue);
        if(null != this.dataSource){
           this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

    ngOnInit(){

      this.ListadoAlumnoFiltro();
    }

    ListadoAlumnoFiltro(){//Comando que hace que puedas decidir que tabla se hara el filtro
        this.loading = true;
        console.log('this.DTOFiltroAlumno',this.DTOFiltroAlumno)
        this.AlumnoService.ListarAlumnos(this.DTOFiltroAlumno).subscribe(//Llamamos los datos de AlumnoService para listar alumnos
            res=>{
                this.alumnos = res;
                console.log('this.alumnos',this.alumnos)
                this.dataSource = new MatTableDataSource(this.alumnos);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.loading = false;
            },err =>{
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

    editarAlumno(element){//Llamamos los datos de AlumnoService para editar los datos de los alumnos
        this.alumno = element;
        console.log("elment",element);
        //this.flagDeudasDetalle=true;
        this.abrirRegistroAlumno = true;
    }


    CerrarPopUpRegAlumnos(){//Cierra la ventana del listado
        this.ListadoAlumnoFiltro();
        console.log("cerrar en listado");
        this.abrirRegistroAlumno = false;
    }

    EliminarAlumno(element){
        console.log("baja=>",element);
        this.alumnos = element
    
        Swal.fire({//Consultamos si el usuario quiere anular un alumno
            title:'Anular alumno',
            html:'<span>¿Desea anular el alumno <b>'+element.Nom_alumno+'</b>?</span>',
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
              console.log("res",this.alumnos.Alumnoid)
              this.AlumnoService.EliminarAlumno(this.alumnos.Alumnoid).subscribe(
                res =>{ 
                    console.log("res",res)
                  Swal.fire({
                    title: '¡Alumno anulado!',
                    text: 'El nro '+element.Alumnoid+' ha sido anulado.',
                    icon:'success'
                }).then(resp =>{
                      console.log("resp",resp.value)
                    if(resp.value == true){
                      Swal.close();
                      this.ListadoAlumnoFiltro();
                    }
                  });
                },
                err =>{//Mensaje en caso de que no se pudo eliminar el alumno
                    console.log("error",err)
                  Swal.fire({
                    title: "Error",
                    text: 'No se pudo anular el Alumno Nro '+element.Alumnoid+'.',
                    icon: "error",
                    allowOutsideClick: false
                  });
                }
              )}
          });
        }

}