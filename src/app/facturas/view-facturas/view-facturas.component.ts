import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Table } from 'primeng/table'

@Component({
  selector: 'app-view-facturas',
  templateUrl: './view-facturas.component.html',
  styleUrls: ['./view-facturas.component.scss']
})
export class ViewFacturasComponent implements OnInit {

  @ViewChild('dt1') dt: Table | undefined;

  facturas: any = [];

  constructor(private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show(); 

    lastValueFrom(this.http.get(`${environment.apiSAP}/invoice`)).then((res: any) => {
      this.facturas = res;
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
