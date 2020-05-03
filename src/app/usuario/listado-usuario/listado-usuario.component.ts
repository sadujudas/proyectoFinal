import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import {  MatSort } from '@angular/material/sort';
import { startWith, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DatePipe, formatCurrency } from "@angular/common";
import Swal from "sweetalert2";
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from "@angular/material/esm2015";
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
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
          },
      
          { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
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
    nombre;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    pageSizeOptions = [15,20,30,50,100,200];
    displayedColumns = []; 
    dataSource: any;
    constructor(private router:Router, private LoginService:LoginService,private datepipe :DatePipe){

    }

    ngOnInit(){}

    private _filterUsu(value:string):any[]{
        const filterValue = value.toString().toLocaleLowerCase();
        console.log("var",value);
        return this.usuariosArr.filter(state => state.usuarioDni.toLocaleLowerCase().includes(filterValue) === true);
    }

    ObtenerUsuarioCombo(){
        this.filteredUsuario = this.dni.valueChanges
        .pipe(
            startWith(""),
            map(state =>
                state ? this._filterUsu(state):this.filteredUsuario.slice()
            )
        );
    }

    obtenerNomUsu(termino:string){
        this.nombre = termino;
        this.DTOFiltroUsuario.nombre = termino;
    }

    EnteroDni(termino:string = ''){
        if(termino != null && termino != ''){
            let termino1 = termino.toLowerCase();
            for(let p of this.usuariosArr){
                let raz = p.usuarioDni.toLocaleLowerCase();
              if(raz.indexOf(termino1) >=0){
                this.dni = p.usuarioDni;
                this.DTOFiltroUsuario.nombre = p.usuarioNombre;
              }
            }
          }
    }

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