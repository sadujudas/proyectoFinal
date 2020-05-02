import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loading1Component } from './loading1/loading1.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Loading2Component } from './loading2/loading2.component';
import { Loading3Component } from './loading3/loading3.component';
import { Loading4Component } from './loading4/loading4.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';  
import {MatCheckboxModule} from '@angular/material/checkbox';  
  
import { Loading5Component } from './loading5/loading5.component';
import { MiniLoading1Component } from './mini-loading1/mini-loading1.component';

@NgModule({
  declarations: [Loading1Component ,DashboardComponent, Loading2Component, Loading3Component, Loading4Component, Loading5Component, MiniLoading1Component,],
  imports: [MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    Loading1Component,
    Loading2Component,
    Loading3Component,
    Loading4Component,
    Loading5Component,
    MiniLoading1Component,
    ReactiveFormsModule,
    DashboardComponent,
]
  
})
export class SharedModule { }
