import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { SociosModule } from './socios/socios.module';
import { RouterOutlet, provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { BarcosModule } from './barcos/barcos.module';
import { SalidasModule } from './salidas/salidas.module';
import { AuthModule } from './auth/auth.module';
import { jwtInterceptor } from './interceptor/jwt.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    SociosModule,
    RouterOutlet,
    BarcosModule,
    SalidasModule,
    AuthModule,
    NgxUiLoaderModule
  ],
  providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(withInterceptors([jwtInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
