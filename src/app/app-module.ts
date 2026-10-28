import { LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Toastcomponent } from './components/toastcomponent/toastcomponent';
import { Barralateralcomponent } from './components/barralateralcomponent/barralateralcomponent';
import { Cambiotemacomponent } from './components/cambiotemacomponent/cambiotemacomponent';
import { Noencontradocomponent } from './components/noencontradocomponent/noencontradocomponent';
import { Terminoscomponent } from './components/terminoscomponent/terminoscomponent';
import { Privacidadcomponent } from './components/privacidadcomponent/privacidadcomponent';
import { Authinterceptor } from './interceptors/authinterceptor';

registerLocaleData(localeEsCo);

@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Footercomponent,
    Toastcomponent,
    Barralateralcomponent,
    Cambiotemacomponent,
    Noencontradocomponent,
    Terminoscomponent,
    Privacidadcomponent,
  ],
  imports: [BrowserModule, CommonModule, FormsModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
  bootstrap: [App],
})
export class AppModule {}
