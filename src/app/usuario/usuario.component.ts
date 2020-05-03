import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';

@Component({
    selector:'app-usuario',
    templateUrl:'./usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
})

export class UsuarioComponent implements OnInit{

    constructor(private loginservice:LoginService){

    }

    ngOnInit(){
        
    }
}