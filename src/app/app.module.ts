import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { AmazingTimePickerModule } from "amazing-time-picker";
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from '@angular/material/core';

import { MatSortModule } from '@angular/material/sort';
import {  MatTableModule } from '@angular/material/table';

import {MatFormFieldModule} from '@angular/material/form-field';

import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { SharedModule } from './shared/shared.module';

// libreria para tiempo de inactividad
import { BnNgIdleService } from 'bn-ng-idle';


// libreria para cerrar la session luego de un tiempo determinado
import { UserIdleModule } from 'angular-user-idle';

import { SessionExpirationAlert, SessionInteruptService } from 'session-expiration-alert';


 
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    AmazingTimePickerModule,
    AdminLayoutModule,
    SharedModule,
    UserIdleModule.forRoot({idle: 3, timeout: 5, ping: 3}),
    SessionExpirationAlert.forRoot({totalMinutes: 0.5}),
    NgbModule,
    // TextMaskModule,
    NgxMaskModule.forRoot(),   
    MatButtonModule,
    MatFormFieldModule
  ],
  exports:[
    MatIconModule, 
    MatButtonModule,
    MatFormFieldModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    Error404Component
    ],
  providers: [BnNgIdleService,{
    provide: SessionInteruptService,
  }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
