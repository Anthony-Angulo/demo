import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { last, lastValueFrom } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Client, Clients } from '../../interfaces/clients';
import { Table } from 'primeng/table'


@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss'],
  providers: [ConfirmationService]
})
export class ViewClientsComponent implements OnInit {

  @ViewChild('dt1') dt: Table | undefined;


  clientes: Clients[];
  newClient = {} as Client;

  openCreate: any;
  openEdit: any;


  constructor(private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private dialog: ConfirmationService) { }

  ngOnInit(): void {
    this.spinner.show(); 

    lastValueFrom(this.http.get(`${environment.api}/Clients`)).then((res: any) => {
      this.clientes = res;
    }).catch(err => {
      this.toast.error(`Error al obtener lista: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openCreateClient() {
    this.openCreate = true;
  }

  closeUsuarioCreate(){
    this.openCreate = false;
    this.openEdit = false;
    this.newClient = {} as Client;
  }

  createUser(){
    this.spinner.show();

    lastValueFrom(this.http.post(`${environment.api}/Clients`, this.newClient)).then((res:any) => {
      this.openCreate = false;
      this.newClient = {} as Client;
      this.toast.success("Cliente guardado con exito.");
      this.ngOnInit();
    }).catch(err => {
      console.log(err)
      this.toast.error(`Error al guardar cliente: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });
  }

  openEditModal(client: Client) {
    this.openEdit = true;
    this.newClient = client;
    console.log(this.newClient)
  }

  updateClient(){
    this.spinner.show();

    lastValueFrom(this.http.put(`${environment.api}/Clients`, this.newClient)).then((resp:any) => {
      this.openEdit = false;
      this.newClient = {} as Client;
      this.toast.success("Cliente Modificado con exito.");
      this.ngOnInit();
    }).catch(err => {
      console.log(err)
      this.toast.error(`Error al modificar cliente: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });
  }

  deleteClient(client: Client) {    
    this.dialog.confirm({
    message: `Eliminar cliente con el Nombre: ${client.Nombre}?`,
    accept: () => {

      this.spinner.show();

      lastValueFrom(this.http.delete(`${environment.api}/Clients/${client.id}`)).then((resp:any) => {
        this.toast.success("Cliente Eliminado con exito.");
        this.ngOnInit();
      }).catch(err => {
        console.log(err)
        this.toast.error(`Error al elimnar cliente: ${err.message}`)
      }).finally(() => {
        this.spinner.hide();
      });
    }
  });}

}
