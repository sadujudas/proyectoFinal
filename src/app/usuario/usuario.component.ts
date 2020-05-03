import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';

@Component({
    selector:'app-usuario',
    templateUrl:'./usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
})

export class UsuarioComponent implements OnInit{
    abrirRegistroUsuarios : boolean = false;
    usuario : any;

    constructor(private loginservice:LoginService){

    }

    ngOnInit(){
        
    }

    crearRegistroUsuarios(){
        this.usuario = [];
        this.abrirRegistroUsuarios = true;
    }

    CerrarPopUpRegUsuarios(Click:boolean){
        this.abrirRegistroUsuarios = false;
    }
}