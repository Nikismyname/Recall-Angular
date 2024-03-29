import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppHttpInterceptor } from './interceptors/app.http.interceptor';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YTPlayerConfig } from 'angular-youtube-player';

import { NgxElectronModule } from 'ngx-electron';
import { OptionsComponent } from './components/options/options.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    OptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxElectronModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    {
      provide: YTPlayerConfig,
      useValue: { shouldLoadAPI: true, multiplePlaying: false }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
