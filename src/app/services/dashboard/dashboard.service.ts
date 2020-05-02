import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class DashboardService{

    constructor(private http: HttpClient ){}
}