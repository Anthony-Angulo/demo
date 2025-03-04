import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Table } from 'primeng/table'

@Component({
  selector: 'app-view-asignacion',
  templateUrl: './view-asignacion.component.html',
  styleUrls: ['./view-asignacion.component.scss']
})
export class ViewAsignacionComponent implements OnInit {

  @ViewChild('dt1') dt: Table | undefined;
  @ViewChild('dt2') dt2: Table | undefined;

  asignaciones: any = [];
  usuarios: any = [];
  facturas: any = [];
  clientes: any = [];
  zonas: any = [];
  facturasDetail: any = [];
  openCreate: boolean;
  openView: boolean;
  openCambio: boolean;
  usuario: any = '';
  facturaSeleccionada: any = 0;
  clienteSeleccionado: any;
  cambio: any = 0;
  zonaSeleccionada: any = 0;
  facturasAgregadas: any = [];
  facturasClientes: any = [];
  facturasAgregadasTemp: any = [];
  info: any;

  constructor(private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {

    this.spinner.show();
    
    Promise.all([
      lastValueFrom(this.http.get(`${environment.apiSAP}/invoice`)),
      lastValueFrom(this.http.get(`${environment.apiCobranza}/user`)),
      lastValueFrom(this.http.get(`${environment.apiCobranza}/asignaciones`)),
      lastValueFrom(this.http.get(`${environment.apiCobranza}/asignacionesDetail/tipoCambio/obtener`)),
      lastValueFrom(this.http.get(`${environment.apiSAP}/Invoice/zones`))
    ]).then(([facturas, usuarios, asignaciones, tc, zonas]: any) => {
      this.facturas = facturas;
      this.usuarios = usuarios;
      this.cambio = tc[0].Qty;
      this.asignaciones = asignaciones;
      this.zonas = zonas;
    }).catch(err => {
      this.toast.error(`Error al obtener lista: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });

  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  applyFilterGlobal2($event: any, stringVal: string) {
    this.dt2!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openCreateAsignacion() {
    // this.openCreate = true;
    this.router.navigate(['/asignacion/Create']);
  }

  openTipoCambio() {
    this.openCambio = true;
  }

  async getFacturas(){

    this.facturasAgregadas = [];

    this.spinner.show();

    await lastValueFrom(this.http.get(`${environment.apiSAP}/Invoice/GetInvoicesByZone/${this.zonaSeleccionada}`)).then((resp:any) => {
      console.log(resp)
      this.facturasAgregadasTemp = resp;
      this.clientes = resp.map((x:any) =>  {
        return {
          cardName: x.CardName
        }
      });
    }).catch(err => {
      this.toast.error(`Error al obtener lista: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });


      console.log(this.clientes)
  }
  
  addFacturaCombo() {
    this.facturasClientes = this.facturasAgregadasTemp.filter((y:any) => y.CardName == this.clienteSeleccionado);
    console.log(this.facturasClientes)
  }

  addFacturaCliente() {

    let temp: any = this.facturasAgregadas;

    let addF = this.facturasClientes.find((x:any) => x.DocNum == this.facturaSeleccionada);

    temp.push({DocNum: addF.DocNum, CardName: addF.CardName, DocTotal: addF.DocTotal});

    this.facturasAgregadas = [];
    
    setTimeout(() => {
      this.facturasAgregadas = temp;
      this.toast.success("Agregada a la lista")
    }, 300)

    console.log(this.facturasAgregadas)
  }

  closeCreate() {
    this.openCreate = false;
  }

  async agregarAsignacion() {

    this.spinner.show();

    let user = this.usuarios.find((x:any) => x.Id == this.usuario);

    let output = {
      userId: user.Id,
      userName: user.Name,
      statusId: 1,
      status: 'Creado'
    }

    let resp: any = {};

    resp = await this.http.post(`${environment.apiCobranza}/asignaciones`, output).toPromise()

    let outputFac = this.facturasAgregadas.map((x:any) => {
      return [
        resp.id,
        x.DocNum,
        x.CardName,
        x.DocTotal,
        x.currency,
        '8'
       ]
    });

    lastValueFrom(this.http.post(`${environment.apiCobranza}/asignacionesDetail`, outputFac)).then((res:any) => {
      console.log(res)
      this.closeCreate();
      this.ngOnInit();
    }).catch(err => {
      this.toast.error(`Error al guardar asignacion: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });

  }

  viewAsginacon(asg: any) {

    this.router.navigate(['/asignacion', asg.id]);
    // this.spinner.show();
    // console.log(asg)
    // this.info = asg;
    // lastValueFrom(this.http.get(`${environment.apiCobranza}/asignacionesDetail/${asg.id}`)).then((resp:any) => {
    //   this.facturasDetail = resp.data;
    //   this.openView = true;
    // }).catch(err => {
    //   this.toast.error(`Error al obtener lista: ${err.message}`)
    // }).finally(() => {
    //   this.spinner.hide();
    // });
  }

  closeView() {
    this.openView = false;
  }
  
  closeCambio() {
    this.openCambio = false;
  }

  agregarCambio() {

    this.spinner.show();

    lastValueFrom(this.http.put(`${environment.apiCobranza}/asignacionesDetail/cambio`, {cambio: this.cambio})).then((val:any) => {
      this.closeCambio();
      this.ngOnInit();
    }).catch(err => {
      this.toast.error(`Error al guardar tipo de cambio: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });

  }

}
