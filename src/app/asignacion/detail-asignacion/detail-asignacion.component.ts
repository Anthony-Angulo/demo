import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Table } from 'primeng/table';
import { formatDate } from '@angular/common';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as FileSaver from 'file-saver';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-detail-asignacion',
  templateUrl: './detail-asignacion.component.html',
  styleUrls: ['./detail-asignacion.component.scss']
})
export class DetailAsignacionComponent implements OnInit {

  @ViewChild('dt1') dt: Table | undefined;

  facturasDetail: any = [];
  facturasPrint: any = [];
  totalPesos: any;
  totalDolar: any;
  openImage: boolean;
  imageUrl: any;

  cols: any = [ { field: 'InvoiceNumber', header: 'InvoiceNumber', customExportHeader: 'Product Code' },
  { field: 'CardCode', header: 'CardCode' },
  { field: 'Client', header: 'Client' },
  { field: 'Quantity', header: 'Quantity' },
  { field: 'Currency', header: 'Currency' },
  { field: 'DocDate', header: 'DocDate' },
  { field: 'DocDueDate', header: 'DocDueDate' },
  { field: 'LicTradNum', header: 'LicTradNum' }];

  dd: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  async ngOnInit(): Promise<void> {

    const id = this.route.snapshot.paramMap.get('id');
    this.spinner.show();

    await lastValueFrom(this.http.get(`${environment.apiCobranza}/asignacionesDetail/${id}`)).then((resp: any) => {
      this.facturasDetail = resp.data;
    }).catch(err => {
      this.toast.error(`Error al obtener lista: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });

    this.totalPesos = this.facturasDetail.map((x: any) => x.QtyCobrado).reduce((a: any, b: any) => a + b, 0);
    this.totalDolar = this.facturasDetail.map((x: any) => Number(x.CantidadDolares)).reduce((a: any, b: any) => a + b, 0);

  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getImage(det:any) {

    this.openImage = true;

    this.imageUrl = `data:image/png;base64,${det.Firma}`;
  }

  async createPdf() {

    this.spinner.show();

    const id = this.route.snapshot.paramMap.get('id');

    await lastValueFrom(this.http.get(`${environment.apiCobranza}/asignacionesDetail/print/${id}`)).then((resp: any) => {
      this.facturasPrint = resp.data;
    }).catch(err => {
      this.toast.error(`Error al obtener lista: ${err.message}`)
    }).finally(() => {
      this.spinner.hide();
    });

    

    var lista: any = [];

    lista = this.facturasPrint.reduce((group: any, x: any) => {
      const { CardCode } = x;
      group[CardCode] = group[CardCode] ?? [];
      group[CardCode].push(x);
      return group;
    }, {});

    console.log(lista)



    Object.keys(lista).forEach((element: any) => {
      let totP = lista[element].filter((y:any) => y.TipoPago == 'Efectivo' || y.TipoPago == 'Cheque').map((x: any) => x.QtyCobrado).reduce((a: any, b: any) => a + b, 0);
      let totD = lista[element].filter((y:any) => y.TipoPago == 'Efectivo' || y.TipoPago == 'Cheque').map((x: any) => Number(x.CantidadDolares)).reduce((a: any, b: any) => a + b, 0);
      console.log(1)
      this.dd = {
        pageSize: 'A4',
        pageMargins: [100, 70, 100, 70],
        header: { text: 'RECIBO DE COBRANZA', alignment: 'center', style: 'header', margin: 20 },
        pageOrientation: 'landscape',
        content: [
          {
            columns: [
              {
                image: 'data:image/png;base64,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',
                fit: [150, 150]
              },
              [
                { text: `TIPO DE CAMBIO`, margin: 5, alignment: 'center' },
                { text: `16.70`, alignment: 'center'},
              ]
            ],
            columnGap: 170

          },
          {
            columns: [
              [
                { text: `FECHA ${formatDate(new Date(), 'yyyy/MM/dd', 'en')}`, style: 'datos', margin: 5 },
                { text: `COBRADOR LipT`, style: 'datos', margin: 5 },
              ],
              [
                { text: `NUMERO DE CLIENTE ${lista[element][0].CardCode}`, style: 'datos', margin: 5 },
                { text: `NOMBRE DE CLIENTE ${lista[element][0].Client}`, style: 'datos', margin: 5 },
              ]

            ],
          },
          this.table(lista[element], ['CardCode', 'InvoiceNumber', 'TipoPago', 'FechaDePago', 'QtyCobrado', 'CantidadDolares', 'Referencia']),
          {
            columns: [
              [
                { text: ``, margin: [0, 10, 0, 0] },
              ],
              [
                { text: `$ ${totP}                $ ${totD}`, margin: [0, 10, 0, 0] },
              ]

            ]
          },
          {
            columns: [
              [
                { text: `_____________________________`, margin: [0, 10, 0, 0] },
                { text: `Firma del cobrador`, margin: [0, 10, 0, 0] },
              ],
              [
                { text: `_____________________________`, margin: [0, 10, 0, 0] },
                { text: `Recibido por`, margin: [0, 10, 0, 0] },
              ]

            ]
          },
        ],
        styles: {
          header: {
            fontSize: 27,
            bold: true,
            alignment: 'center'
          },
          datos: {
            fontSize: 12,
            bold: false,
            alignment: 'left'
          }
        }
      }
      pdfMake.createPdf(this.dd).open();
    })

  }

  table(data: any, columns: any) {
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

  exportPdf() {

    console.log(this.facturasDetail);
    
    let cols = [
      { field: 'InvoiceNumber', header: 'InvoiceNumber', customExportHeader: 'Product Code' },
      { field: 'CardCode', header: 'CardCode' },
      { field: 'Client', header: 'Client' },
      { field: 'Quantity', header: 'Quantity' },
      { field: 'Currency', header: 'Currency' }
  ];

  let exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(exportColumns, this.facturasDetail);
            doc.save('products.pdf');
        });
    });
}




  back() {
    this.router.navigate(['/asignacion']);
  }

}
