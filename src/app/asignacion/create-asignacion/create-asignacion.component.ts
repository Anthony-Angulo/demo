import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Table } from 'primeng/table'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-create-asignacion',
  templateUrl: './create-asignacion.component.html',
  styleUrls: ['./create-asignacion.component.scss'],
})
export class CreateAsignacionComponent implements OnInit {

  @ViewChild('dt1') dt: Table | undefined;

  todo: any = [];

  done:any = [];

  docDefinition: any;

  usuarios: any = [];
  zonas: any = [];
  nombreRuta: any;
  usuario: any = '';
  fechaInicio: Date;
  fechaFinal: Date;
  fechaRuta: Date;
  zonaSeleccionada: any = 0;
  selectedInvoices: any = [];

  constructor(private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {

    this.spinner.show();

    Promise.all([
      lastValueFrom(this.http.get(`${environment.apiCobranza}/user`)),
      lastValueFrom(this.http.get(`${environment.apiSAP}/Invoice/zones`))
    ]).then(([usuarios, zonas]: any) => {
      this.usuarios = usuarios;
      this.zonas = zonas;
    }).catch(err => {
      this.toast.error(`Error al obtener lista: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });
  }



  searchFacturas() {
    this.spinner.show();

    let i = this.fechaInicio.getFullYear() + '/' + (this.fechaInicio.getMonth() + 1)  + '/' + this.fechaInicio.getDate();
    let f = this.fechaFinal.getFullYear() + '/' + (this.fechaFinal.getMonth() + 1)+ '/' + this.fechaFinal.getDate();

    console.log(i)
    console.log(this.zonaSeleccionada)

    let output = {
      Zone: this.zonaSeleccionada,
      InitialDate: i,
      FinalDate: f
    }

    lastValueFrom(this.http.post(`${environment.apiSAP}/Invoice/GetInvoicesByzone`, output)).then((val:any) => {
      this.todo = val.map((x:any) => {
        if(x.DocCur == "USD") {
          x.DocTotal = x.DocTotalFC;
        }
        return {
          DocNum: x.DocNum,
          CardCode: x.CardCode,
          CardFName: x.CardFName,
          DocTotal: x.DocTotal,
          DocCur: x.DocCur,
          DocDate: x.DocDate,
          DocDueDate: x.DocDueDate,
          LicTradNum: x.LicTradNum
        }
      })
    }).catch(err => {
      this.toast.error(`Error al obtener lista: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });
  }

  async agregarAsignacion() {

    console.log(this.selectedInvoices);

    this.spinner.show();

    let user = this.usuarios.find((x:any) => x.Id == this.usuario);

    let output = {
      userId: user.Id,
      userName: user.Name,
      nombre: this.nombreRuta,
      statusId: 1,
      fechaDeRuta: this.fechaRuta,
      status: 'Creado'
    }

    let resp: any = {};

    resp = await this.http.post(`${environment.apiCobranza}/asignaciones`, output).toPromise()

    let outputFac = this.selectedInvoices.map((x:any) => {
      return [
        resp.id,
        x.DocNum,
        x.CardCode,
        x.CardFName,
        x.DocTotal,
        x.DocCur,
        '8',
        x.DocDate,
        x.DocDueDate,
        x.LicTradNum
       ]
    });

    lastValueFrom(this.http.post(`${environment.apiCobranza}/asignacionesDetail`, outputFac)).then((res:any) => {
      console.log(res)
      this.toast.success('Creado correctamente.');
      // this.createpdf();
      this.router.navigate(['/asignacion']);
    }).catch(err => {
      this.toast.error(`Error al guardar asignacion: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });

  }

  createpdf() {
    let outputFac = this.selectedInvoices.map((x:any) => {
      return {
        'Factura': x.DocNum,
        'CodigoCliente': x.CardCode,
        'NombreCliente': x.CardFName,
        'Total': x.DocTotal,
        'Moneda': x.DocCur,
    }
    });

    this.docDefinition = {
      pageSize: 'A4',
      pageMargins: [100, 70, 100, 70],
      header: { text: 'LISTA DE FACTURAS', alignment: 'center', style: 'header', margin: 20 },
      pageOrientation: 'portrait',
      content: [
        this.table(outputFac, ['Factura','CodigoCliente','NombreCliente','Total','Moneda'])
      ]
    }

    pdfMake.createPdf(this.docDefinition).open();
  }

  table(data:any, columns: any) {
    console.log(data)
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }

  buildTableBody(data: any, columns: any) {
    // console.log(data)
    var body = [];

    body.push(columns);

    data.forEach((x: any) => {
      var dataRow: any = [];
      console.log(x)

      columns.forEach((y: any) => {
        dataRow.push(x[y]);
      });

      body.push(dataRow);
    });

    console.log(body);

    return body;
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


  back(){
    this.router.navigate(['/asignacion']);
  }

}


