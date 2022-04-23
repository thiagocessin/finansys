import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {InMemoryDatabase} from './in-memory-database'



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)//intercepta as requisições http do angular, remover para usar o backend

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
