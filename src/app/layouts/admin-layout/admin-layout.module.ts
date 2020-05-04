import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { UsuarioComponent } from '../../usuario/usuario.component';
import { ListadoUsuarioComponent } from '../../usuario/listado-usuario/listado-usuario.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatNativeDateModule } from '@angular/material/core';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxMaskModule } from 'ngx-mask'
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegistroUsuarioComponent } from '../../usuario/listado-usuario/registro-usuario/registro-usuario.component';
import { SharedModule } from '../../shared/shared.module';
import { AlumnoComponent } from '../../alumno/alumno.component';
import { ListadoAlumnoComponent } from '../../alumno/listado-alumno/listado-alumno.component';
import { RegistroAlumnoComponent } from '../../alumno/listado-alumno/registro-alumno/registro-alumno.component';
import { HorarioComponent } from '../../horario/horario.component';
import { ListadoHorarioComponent } from '../../horario/listado-horario/listado-horario.component';
import { RegistroHorarioComponent } from '../../horario/listado-horario/registro-horario/registro-horario.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    NgxMaskModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    SharedModule,
  ],
  exports:[
    MatFormFieldModule,
    MatPaginatorModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    NgxMaskModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    UsuarioComponent,
    ListadoUsuarioComponent,
    RegistroUsuarioComponent,
    AlumnoComponent,
    ListadoAlumnoComponent,
    RegistroAlumnoComponent,
    HorarioComponent,
    ListadoHorarioComponent,
    RegistroHorarioComponent
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
