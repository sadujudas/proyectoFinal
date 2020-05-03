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
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    pageSizeOptions = [15,20,30,50,100,200];
    displayedColumns = ['checked','usuarioId','usuarioNombre','usuarioDni','usuarioEmail']; 
    dataSource: any;
    constructor(private router:Router, private LoginService:LoginService,private datepipe :DatePipe){

    }
    applyFilter(filterValue: string) {
        console.log("valor",filterValue);
        if(null != this.dataSource){
           this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

    ngOnInit(){}


    ListadoUsuarioFiltro(){
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
}