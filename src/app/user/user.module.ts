import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view-user/view-user.component';
import { RouterModule, Routes } from '@angular/router';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';
import { InputTextModule} from 'primeng/inputtext';

const routes: Routes = [
  { path: '', component: ViewUserComponent },
];

@NgModule({
  declarations: [
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    TableModule,
    InputTextModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
