import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule} from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ViewClientsComponent } from './view-clients/view-clients.component';

const routes: Routes = [
  { path: '', component: ViewClientsComponent },
];

@NgModule({
  declarations: [
    ViewClientsComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    DialogModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientsModule { }
