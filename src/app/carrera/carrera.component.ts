import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../services/carrera/carrera.service';



@Component({
    selector:'app-carrera',
    templateUrl:'./carrera.component.html',
    styleUrls: ['./carrera.component.scss'],
})

export class CarreraComponent implements OnInit{
    abrirRegistroCarreras : boolean = false;
    carrera : any;

    constructor(private carreraService:CarreraService){

    }

    ngOnInit(){
        
    }

    crearRegistroCarreras(){
        this.carrera = [];
        this.abrirRegistroCarreras = true;
    }

    CerrarPopUpRegCarreras(Click:boolean){
        this.abrirRegistroCarreras = false;
    }
}