import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login/login.service";
import {HttpErrorResponse } from '@angular/common/http';
import {  MessagesTitles,MessagesStatus } from '../../model/messages';
import Swal from "sweetalert2";


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  submenuValor:string;
  subMenu? : RouteInfo[];
  id? : string;
  target? : string;
  controls? :string;
  
}
export const ROUTES: RouteInfo[] = [
  {path: "/dashboard",title: "Dashboard",icon: "icon-chart-pie-36",class: "",submenuValor:"animals" ,subMenu :[]},
  {
    path: "/alumno/listado",
    title: "Alumnos",
    icon: "icon-atom",
    class: "",
    submenuValor:"animals" ,subMenu:[]
  },
  {
    path: "/horario/listado",
    title: "Horarios",
    icon: "icon-pin",
    class: "" ,
    submenuValor:"animals" ,subMenu:[]
  },
  {
    path: "/carrera/listado",
    title: "Carreras",
    icon: "icon-bell-55",
    class: "",
    submenuValor:"animals" ,subMenu:[]
  },

  {path: "/usuario/listado",title: "Usuario",icon: "icon-single-02",class: "",submenuValor:"animals",subMenu:[
    //{path: "/usuario/listado", title: "Listado", icon: "supervisor_account", class: "" ,submenuValor:"animals", id : "collapseOne" },
  ]},
  {
    path: "/tables",
    title: "Table List",
    icon: "icon-puzzle-10",
    class: "",
    submenuValor:"animals" ,subMenu:[]
  },
  {
    path: "/typography",
    title: "Typography",
    icon: "icon-align-center",
    class: "",
    submenuValor:"animals" ,subMenu:[]
  },
  {
    path: "/rtl",
    title: "RTL Support",
    icon: "icon-world",
    class: "",
    submenuValor:"animals" ,subMenu:[]
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router:Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  CerrarSession() {
  
    this.router.navigate(["/login"]);
  }
}
