import { Component, OnInit } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from '../../environments/environment';
import { LoginService } from '../services/login/login.service';
import { usuario } from '../model/usuario';



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit{

    loading: boolean = false;
    data: any;
    form: FormGroup;
    user = new usuario;
    headers: HttpHeaders = new HttpHeaders();

    constructor(private LoginService:LoginService, private router:Router,){
      
      this.form = new FormGroup({
        Usuario: new FormControl("",[Validators.required]),
        Password : new FormControl("",[Validators.required])
      });
    }

    ngOnInit(){
        
    }

    guardarCambio(){
      this.loading = true;
      this.LoginService.loginUsuario(this.form.value).subscribe(
        resp =>{
          this.data = resp;

        },
        err =>{
          this.loading = false;
          console.log("error",err);
          Swal.fire({
            title: "Error",
            text: "Usuario o Contraseña Incorrectos",
            icon: "error",
            allowOutsideClick: true
          });
        }
      );
    }

    
}