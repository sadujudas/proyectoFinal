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
import { FiltroAsistencia } from 'src/app/model/FiltroAsistencia';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { CarreraService } from 'src/app/services/carrera/carrera.service';
import { HorarioService } from 'src/app/services/horario/horario.service';
import { FiltroAlumno } from 'src/app/model/FiltroAlumno';
import { Observable } from 'rxjs/Rx';
import { FiltroCarrera } from 'src/app/model/FiltroCarrera';
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
    selector: 'app-listado-asistencia',
    templateUrl: './listado-asistencia.component.html',
    styleUrls: ['./listado-asistencia.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesDates,DatePipe,
        
         
    ]
})

export class ListadoAsistenciaComponent{
    DTOFiltroAsistencia : FiltroAsistencia = new FiltroAsistencia();
    DTOFiltroAlumno : FiltroAlumno = new FiltroAlumno();
    DTOFiltroCarrera : FiltroCarrera = new FiltroCarrera();
    today = moment();
    loading:boolean;
    data : any =  [];
    asistencia : any = [];
    asistencias: any = [];
    
    ruc = new FormControl();
    rucCar = new FormControl();
    rucHora = new FormControl();
    value = '';
    idAlum;
    idCarr;
    idHora;
    arrayAlumnos : any;
    alumnos : boolean = false;
    filteredAlumno: Observable<any[]>;
    arrayCarreras : any;
    carreras : boolean = false;
    filteredCarrera: Observable<any[]>;
    arrayHorarios : any;
    horarios : boolean = false;
    filteredHorario: Observable<any[]>;
    abrirRegistroAsistencia :boolean = false;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    pageSizeOptions = [15,20,30,50,100,200];
    displayedColumns =['checked','asistenciaid','fecha','Nom_alumno','Ape_alumno','Nom_carrera','turno'];//mencionamos los campos que tendra 
    dataSource:any;

    constructor(private router:Router, 
        private AlumnoService:AlumnoService,
        private datepipe :DatePipe,
        private AsistenciaService:AsistenciaService,
        private CarreraService:CarreraService,
        private HorarioService:HorarioService
        ){
            this.DTOFiltroAsistencia.FechaIni = this.datepipe.transform(moment().add(-30, 'day'),'yyyy-MM-dd');
            this.DTOFiltroAsistencia.FechaFin = this.datepipe.transform(moment(),'yyyy-MM-dd');

        }

        ngOnInit(){
            this.ListadoAsistenciaFiltro();
            this.obtenerAlumnos();
            this.obtenerCarreras();
            this.obtenerHorarios();
        }
        blankIdAlumno(){
          this.DTOFiltroAsistencia.IdAlum = "";
        }

        blankIdCarrera(){
          this.DTOFiltroAsistencia.IdCarre = "";
        }

        blankIdHorario(){
          this.DTOFiltroAsistencia.IdHora = "";
        }
        ListadoAsistenciaFiltro(){//Buscara los datos que solicitado por filtro
            this.loading = true;
            this.DTOFiltroAsistencia.FechaIni = this.datepipe.transform(this.DTOFiltroAsistencia.FechaIni,'yyyy-MM-dd')//Transforma el formato de la fecha inicio
            this.DTOFiltroAsistencia.FechaFin = this.datepipe.transform(this.DTOFiltroAsistencia.FechaFin,'yyyy-MM-dd')//Transforma el formato de la fecha final
            console.log('this.DTOFiltroAsistencia',this.DTOFiltroAsistencia)
            this.AsistenciaService.ListarAsistencia(this.DTOFiltroAsistencia).subscribe(
                res=>{
                    this.asistencias = res;
                    console.log('this.asistencias',this.asistencias)
                    this.dataSource = new MatTableDataSource(this.asistencias);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                    this.loading = false;
                },err =>{//Mensaje de error en cas que no encuentre los datos solicitado
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
        private _filterAlumno(value:string):any[]{
            const filterValue = value.toString().toLowerCase();
            console.log("var",value);
            return this.arrayAlumnos.filter(state => state.Nom_alumno.toLowerCase().includes(filterValue) === true);
          }

          

        obtenerAlumnos(){
            this.AlumnoService.ListarAlumnos(this.DTOFiltroAlumno).subscribe(res =>{
              this.arrayAlumnos = res;
              console.log("arrayAlumnos",this.arrayAlumnos)
              this.filteredAlumno = this.ruc.valueChanges
              .pipe(
                  startWith(""),
                  map(state =>
                      state ? this._filterAlumno(state) : this.arrayAlumnos.slice()
                  )
              );
            })
          }
          obtenerIdAlum(termino:string){
            this.idAlum = termino;
            this.DTOFiltroAsistencia.IdAlum = termino;
          }
          

          EnteroObtenerRucRazSocialAlum(termino:string = ''){
            if(termino != null && termino != ''){
              let termino1 = termino.toLowerCase();
              for(let p of this.arrayAlumnos){
                  let raz = p.Nom_alumno.toLocaleLowerCase();
                if(raz.indexOf(termino1) >=0){
                  this.idAlum = p.Alumnoid;
                  this.DTOFiltroAsistencia.IdAlum = p.Alumnoid;
                }
              }
            }
          }

          private _filterCarreras(value:string):any[]{
            const filterValue = value.toString().toLowerCase();
            console.log("var",value);
            return this.arrayCarreras.filter(state => state.Nom_carrera.toLowerCase().includes(filterValue) === true);
          }

          obtenerCarreras(){
            this.CarreraService.ListarCarreras(this.DTOFiltroCarrera).subscribe(res =>{
              this.arrayCarreras = res;
              console.log("arrayCarreras",this.arrayCarreras)
              this.filteredCarrera = this.rucCar.valueChanges
              .pipe(
                  startWith(""),
                  map(state =>
                      state ? this._filterCarreras(state) : this.arrayCarreras.slice()
                  )
              );
            })
          }
          obtenerIdCarre(termino:string){
            this.idCarr = termino;
            this.DTOFiltroAsistencia.IdCarre = termino;
          }

          EnteroObtenerRucRazSocialCarre(termino:string = ''){
            if(termino != null && termino != ''){
              let termino1 = termino.toLowerCase();
              for(let p of this.arrayCarreras){
                  let raz = p.Nom_alumno.toLocaleLowerCase();
                if(raz.indexOf(termino1) >=0){
                  this.idCarr = p.carreraid;
                  this.DTOFiltroAsistencia.IdCarre = p.carreraid;
                }
              }
            }
          }

          private _filterHorarios(value:string):any[]{
            const filterValue = value.toString().toLowerCase();
            console.log("var",value);
            return this.arrayHorarios.filter(state => state.turno.toLowerCase().includes(filterValue) === true);
          }


          obtenerHorarios(){
            this.HorarioService.ListarHorario().subscribe(res =>{
              this.arrayHorarios = res;
              console.log("arrayHorarios",this.arrayHorarios)
              this.filteredHorario = this.rucHora.valueChanges
              .pipe(
                  startWith(""),
                  map(state =>
                      state ? this._filterHorarios(state) : this.arrayHorarios.slice()
                  )
              );
            })
          }

          obtenerIdHorario(termino:string){
            this.idHora = termino;
            this.DTOFiltroAsistencia.IdHora = termino;
          }

          EnteroObtenerRucRazSocialHora(termino:string = ''){
            if(termino != null && termino != ''){
              let termino1 = termino.toLowerCase();
              for(let p of this.arrayHorarios){
                  let raz = p.turno.toLocaleLowerCase();
                if(raz.indexOf(termino1) >=0){
                  this.idHora = p.horarioid;
                  this.DTOFiltroAsistencia.IdHora = p.horarioid;
                }
              }
            }
          }
          

        editarAsistencia(element){
            this.asistencia = element;
            console.log("elment",element);
            //this.flagDeudasDetalle=true;
            this.abrirRegistroAsistencia = true;
        }

        CerrarPopUpRegAsistencias(){
            this.ListadoAsistenciaFiltro();
            console.log("cerrar en listado");
            this.abrirRegistroAsistencia = false;
        }
    

}