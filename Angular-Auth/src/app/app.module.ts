import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularBootstrapToastsModule } from 'angular-bootstrap-toasts';
import { NgSpinnerModule } from 'ng-bootstrap-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';

import { AppRoutingModule, externalUrlProvider } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Oauth2Handler } from './oauth2handler';
import { LogoutComponent } from './logout/logout.component';
import { HttpIntercpterService } from './services/http/http-intercpter.service';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { LoaderInterceptorService } from './services/http/loader-interceptor.service';
import { SocialLoginComponent } from './social-login/social-login.component';
import { ExternalUrlDirective } from './directives/external-url.directive';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    Oauth2Handler,
    LogoutComponent,
    SocialLoginComponent,
    ExternalUrlDirective,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgSpinnerModule,
    BrowserAnimationsModule,
    AngularBootstrapToastsModule,
    HomeModule,
    SharedModule,
    ToastNotificationsModule.forRoot(
      { 
        duration: 6000, type: 'primary', 
        position: 'bottom-right',
        preventDuplicates: true
      }
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercpterService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
          const externalUrl = route.paramMap.get('externalUrl');
          window.open(externalUrl, '_self');
      },
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
