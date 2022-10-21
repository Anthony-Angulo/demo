import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import {User, Users} from '../../interfaces/users';
import { Table } from 'primeng/table'

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  @ViewChild('dt1') dt: Table | undefined;

  usuarios: Users[];

  constructor(private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {

    this.spinner.show(); 

    lastValueFrom(this.http.get(`${environment.api}/Account/Users`)).then((res: any) => {
      this.usuarios = res;
    }).catch(err => {
      this.toast.error(`Error al obtener lista: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
