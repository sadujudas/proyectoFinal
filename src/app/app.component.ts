import { Component } from "@angular/core";
import { BnNgIdleService } from "bn-ng-idle";

import { LoginService } from "./services/login/login.service";
import { Router, Route } from "@angular/router";
import Swal from "sweetalert2";

//import "rxjs/Rx";
import { UserIdleService } from "angular-user-idle";
import { SessionTimerService } from "session-expiration-alert";
import { isNumber } from "util";
import { interval } from "rxjs";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "black-dashboard-angular";

  constructor(private bnIdle: BnNgIdleService,
    private router: Router,
    public sessionTimer: SessionTimerService,){
      this.bnIdle.startWatching(6000).subscribe(res => {
        if (res) {
          console.log("session expired");
          Swal.fire({
            title: 'Session Cerrada',
            text: "Sessión cerrada por inactividad",
            icon: 'warning',
            allowOutsideClick: false
          }).then(resp => {
            if (resp.value == true) {
              this.router.navigate(["/login"]);
            }
          });
        }
      }); 
    }
    ngOnInit(){
     

    
    }
}
