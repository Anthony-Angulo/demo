import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule} from 'primeng/dialog';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';
import {OrderListModule} from 'primeng/orderlist';
import {CalendarModule} from 'primeng/calendar';
import { InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewAsignacionComponent } from './view-asignacion/view-asignacion.component';
import { DetailAsignacionComponent } from './detail-asignacion/detail-asignacion.component';
import { CreateAsignacionComponent } from './create-asignacion/create-asignacion.component';

const routes: Routes = [
  { path: '', component: ViewAsignacionComponent },
  { path: 'Create', component: CreateAsignacionComponent },
  { path: ':id', component: DetailAsignacionComponent },
]

@NgModule({
  declarations: [
    ViewAsignacionComponent,
    DetailAsignacionComponent,
    CreateAsignacionComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule, 
    CalendarModule,
    CardModule,
    FieldsetModule,
    TableModule,
    InputTextModule,
    DialogModule,

    OrderListModule,
    RouterModule.forChild(routes)
  ]
})
export class AsignacionModule { }
