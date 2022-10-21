import {Injectable} from '@angular/core'
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.endsWith("login"))
        return next.handle(req)
        let token=localStorage.getItem("token")
        let JsonReq: HttpRequest<any>= req.clone({
            setHeaders:{'Authorization' :'Bearer '+ token}
        });
        return next.handle(JsonReq)
    }
}