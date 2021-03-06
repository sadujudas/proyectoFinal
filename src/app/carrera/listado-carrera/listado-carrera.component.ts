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
import { CarreraService } from 'src/app/services/carrera/carrera.service';
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
    selector: 'app-listado-carrera',
    templateUrl: './listado-carrera.component.html',
    styleUrls: ['./listado-carrera.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesDates,DatePipe,
        
         
    ]
})

export class ListadoCarreraComponent{
    DTOFiltroCarrera: FiltroCarrera = new FiltroCarrera();

    today = moment();
    loading:boolean;
    data : any =  [];
    carrera : any = [];
    carreras: any = [];
    
    value = '';
    
    abrirRegistroCarrera :boolean = false;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    pageSizeOptions = [15,20,30,50,100,200];
    displayedColumns =['checked','carreraid','Nom_carrera','Profesor_cargo','turno','estado'];
    dataSource:any;

    constructor(private router:Router, private CarreraService:CarreraService,private datepipe :DatePipe){}

    applyFilter(filterValue: string) {
        console.log("valor",filterValue);
        if(null != this.dataSource){
           this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

    ngOnInit(){
        this.ListadoCarreraFiltro();
    }

    ListadoCarreraFiltro(){
        this.loading = true;
        console.log('this.DTOFiltroCarrera',this.DTOFiltroCarrera)
        this.CarreraService.ListarCarreras(this.DTOFiltroCarrera).subscribe(
            res=>{
                this.carreras = res;
                console.log('this.carreras',this.carreras)
                this.dataSource = new MatTableDataSource(this.carreras);
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

    editarCarrera(element){
        this.carrera = element;
        console.log("elment",element);
        //this.flagDeudasDetalle=true;
        this.abrirRegistroCarrera = true;
    }

    CerrarPopUpRegCarreras(){
        this.ListadoCarreraFiltro();
        console.log("cerrar en listado");
        this.abrirRegistroCarrera = false;
    }

    DeshabilitarCarrera(element){
        console.log("baja=>",element);
        this.carreras = element
    
        Swal.fire({
            title:'Deshabilitar Carrera',
            html:'<span>¿Desea deshabilitar la carrera <b>'+element.Nom_carrera+'</b>?</span>',
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
              console.log("res",this.carreras.carreraid)
              this.CarreraService.DeshabilitarCarrera(this.carreras.carreraid).subscribe(
                res =>{ 
                    console.log("res",res)
                  Swal.fire({
                    title: '¡Carrera Deshabilitada!',
                    text: 'El nro '+element.carreraid+' ha sido Deshabilitado.',
                    icon:'success'
                }).then(resp =>{
                      console.log("resp",resp.value)
                    if(resp.value == true){
                      Swal.close();
                      this.ListadoCarreraFiltro();
                    }
                  });
                },
                err =>{
                    console.log("error",err)
                  Swal.fire({
                    title: "Error",
                    text: 'No se pudo deshabilitar la carrera Nro '+element.carreraid+'.',
                    icon: "error",
                    allowOutsideClick: false
                  });
                }
              )}
          });
        }

        habilitarCarrera(element){
          console.log("habilitar=>",element);
          this.carreras = element
      
          Swal.fire({
              title:'habilitar Carrera',
              html:'<span>¿Desea habilitar la carrera <b>'+element.Nom_carrera+'</b>?</span>',
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
                console.log("res",this.carreras.carreraid)
                this.CarreraService.HabilitarCarrera(this.carreras.carreraid).subscribe(
                  res =>{ 
                      console.log("res",res)
                    Swal.fire({
                      title: '¡Carrera habilitada!',
                      text: 'El nro '+element.carreraid+' ha sido habilitada.',
                      icon:'success'
                  }).then(resp =>{
                        console.log("resp",resp.value)
                      if(resp.value == true){
                        Swal.close();
                        this.ListadoCarreraFiltro();
                      }
                    });
                  },
                  err =>{
                      console.log("error",err)
                    Swal.fire({
                      title: "Error",
                      text: 'No se pudo habilitar la carrera Nro '+element.carreraid+'.',
                      icon: "error",
                      allowOutsideClick: false
                    });
                  }
                )}
            });
          }



}