import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './account/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },{
    path: 'clientes',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },{
    path: 'facturas',
    loadChildren: () => import('./facturas/facturas.module').then(m => m.FacturasModule)
  },{
    path: 'asignacion',
    loadChildren: () => import('./asignacion/asignacion.module').then(m => m.AsignacionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
