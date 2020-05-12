import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { OauthLoginService } from '../oauth-login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercpterService implements HttpInterceptor {

  constructor(private oauthService: OauthLoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    let authToken = this.oauthService.getAuthToken();
    if(authToken != null) {
      req = req.clone({
        setHeaders: {
          Authorization: authToken
        }
      })
    }
  
    return next.handle(req);
  }

}
