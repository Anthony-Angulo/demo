import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private toast: ToastrService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var permisos = JSON.parse(localStorage.getItem('Permisos') || '{}');
      if(localStorage.getItem('token') != null) {
        if(route.data.permiso && permisos.indexOf(route.data.permiso) === -1){
          this.router.navigate(['/dashboard']);
          this.toast.error("No tienes accesso a este modulo.");
          return false
        } else {
          return true;
        }
      } else {
        this.router.navigate(['/login']);
         return false;
      }
    
  }
  
}
