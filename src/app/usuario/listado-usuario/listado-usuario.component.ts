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
import { FiltroUsuario } from 'src/app/model/filtroUsuario';
import { LoginService } from 'src/app/services/login/login.service';
import { state } from '@angular/animations';


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
    selector: 'app-listado-usuario',
    templateUrl: './listado-usuario.component.html',
    styleUrls: ['./listado-usuario.component.scss'],
    providers: [MessagesTitles,MessagesGeneral,MessagesDates,DatePipe,
        
         
    ]
})

export class ListadoUsuarioComponent{
    DTOFiltroUsuario : FiltroUsuario = new FiltroUsuario();
    today = moment();
    loading:boolean;
    data : any =  [];
    usuario : any = [];
    usuarios: any = [];
    usuariosArr;
    dni = new FormControl();
    filteredUsuario: any;
    value = '';
    nombre;
    abrirRegistroUsuario :boolean = false;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    pageSizeOptions = [15,20,30,50,100,200];
    displayedColumns = ['checked','usuarioId','usuarioNombre','usuarioDni','usuarioEmail']; //Aqui se obtiene la informacion por columnas
    dataSource: any;
    constructor(private router:Router, private LoginService:LoginService,private datepipe :DatePipe){

    }
    applyFilter(filterValue: string) {//Comando que sirve para poder hacer los filtros
        console.log("valor",filterValue);
        if(null != this.dataSource){
           this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

    ngOnInit(){
      this.ListadoUsuarioFiltro()
    }


    ListadoUsuarioFiltro(){//Comando que hace que puedas decidir que tabla se hara el filtro
        this.loading = true;
        console.log('this.DTOFiltroUsuario',this.DTOFiltroUsuario)
        this.LoginService.ListarUsuarios(this.DTOFiltroUsuario).subscribe(
            res=>{
                this.usuarios = res;
                console.log('this.usuarios',this.usuarios)
                this.dataSource = new MatTableDataSource(this.usuarios);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.loading = false;
            },err =>{
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

    editarUsuario(element){//Llamamos los datos de UsuarioService para editar los datos de los alumnos
        this.usuario = element;
        console.log("elment",element);
        //this.flagDeudasDetalle=true;
        this.abrirRegistroUsuario = true;
    }

    CerrarPopUpRegUsuarios(){//Cierra la ventana del listado
        this.ListadoUsuarioFiltro();
        console.log("cerrar en listado");
        this.abrirRegistroUsuario = false;
    }

    EliminarUsuario(element){
        console.log("baja=>",element);
        this.usuarios = element
    
        Swal.fire({//Aqui ponemos una aviso de confirmacion antes que se elimine un dato
            title:'Anular Usuario',
            html:'<span>¿Desea anular el usuario <b>'+element.usuarioNombre+'</b>?</span>',
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
              console.log("res",this.usuarios.usuarioId)
              this.LoginService.EliminarUsuario(this.usuarios.usuarioId).subscribe(
                res =>{ 
                    console.log("res",res)
                  Swal.fire({
                    title: '¡Usuario anulado!',
                    text: 'El nro '+element.usuarioId+' ha sido anulada.',
                    icon:'success'
                }).then(resp =>{
                      console.log("resp",resp.value)
                    if(resp.value == true){
                      Swal.close();
                      this.ListadoUsuarioFiltro();
                    }
                  });
                },
                err =>{//Mensaje en caso de que no se pudo eliminar el usuario
                    console.log("error",err)
                  Swal.fire({
                    title: "Error",
                    text: 'No se pudo anular el usuario Nro '+element.usuarioId+'.',
                    icon: "error",
                    allowOutsideClick: false
                  });
                }
              )}
          });
        }
    
    
}