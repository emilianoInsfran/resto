import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import	{ HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerComponent } from './scanner/scanner.component';
import { PedidoComponent } from './pedido/pedido.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { CheckComponent } from './check/check.component';
import { PopupComponent } from './popup/popup.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { CngTabsModule } from '@codehint-ng/tabs';

//----------------------
//PERFIL - secciones
//----------------------
import { PerfilComponent } from './perfil/perfil.component';
import { EsteticaComponent } from './perfil/estetica/estetica.component';
import { MenuComponent } from './perfil/menu/menu.component';
import { PromosComponent } from './perfil/promos/promos.component';
import { GeneralComponent } from './perfil/general/general.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaCategoriasComponent } from './perfil/estetica/lista-categorias/lista-categorias.component';
import { AltaPlatosComponent } from './perfil/menu/alta-platos/alta-platos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaPlatosComponent } from './perfil/menu/lista-platos/lista-platos.component';
const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyAUu7TIQH7gWrFVTAZrYnAV13hWjpue-EQ'
};


@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    HomeComponent,
    ScannerComponent,
    PedidoComponent,
    LoginComponent,
    RegistroComponent,
    CheckComponent,
    PopupComponent,
    PerfilComponent,
    EsteticaComponent,
    MenuComponent,
    PromosComponent,
    GeneralComponent,
    ListaCategoriasComponent,
    AltaPlatosComponent,
    NavbarComponent,
    ListaPlatosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    PasswordStrengthMeterModule,
    SimpleModalModule,
    CngTabsModule,
    ColorPickerModule,
    FontPickerModule,
    DragDropModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    PopupComponent
  ],
  providers: [
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    },

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
