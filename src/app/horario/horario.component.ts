import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario/horario.service';



@Component({
    selector:'app-horario',
    templateUrl:'./horario.component.html',
    styleUrls: ['./horario.component.scss'],
})

export class HorarioComponent implements OnInit{
    abrirRegistroHorarios : boolean = false;
    horario : any;

    constructor(private horarioService:HorarioService){

    }

    ngOnInit(){
        
    }

    crearRegistroHorarios(){
        this.horario = [];
        this.abrirRegistroHorarios = true;
    }

    CerrarPopUpRegHorarios(Click:boolean){
        this.abrirRegistroHorarios = false;
    }
}