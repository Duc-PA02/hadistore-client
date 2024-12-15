import { Injectable } from '@angular/core';  
import {  
  HttpRequest,  
  HttpHandler,  
  HttpEvent,  
  HttpInterceptor,  
  HTTP_INTERCEPTORS  
} from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { SessionService } from '../services/session.service';

@Injectable()  
export class AuthInterceptor implements HttpInterceptor {  

  constructor(private sessionService: SessionService) {}  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {  
    const token = this.sessionService.getToken();  
    if (token && !request.url.includes('provinces.open-api.vn') && !request.url.includes('www.sandbox.paypal.com')) {  
      request = request.clone({  
        setHeaders: {  
          Authorization: `Bearer ${token}`  
        }  
      });  
    }  

    return next.handle(request);
  }  
}  