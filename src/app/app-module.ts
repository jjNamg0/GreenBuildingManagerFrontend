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
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Registrocomponent } from './components/registrocomponent/registrocomponent';
import { Verificarcodigocomponent } from './components/verificarcodigocomponent/verificarcodigocomponent';
import { Olvidecontrasenacomponent } from './components/olvidecontrasenacomponent/olvidecontrasenacomponent';
import { Solicitaradmincomponent } from './components/solicitaradmincomponent/solicitaradmincomponent';
import { Aprobaradmincomponent } from './components/aprobaradmincomponent/aprobaradmincomponent';
import { Googlecallbackcomponent } from './components/googlecallbackcomponent/googlecallbackcomponent';
import { Miconjuntocomponent } from './components/miconjuntocomponent/miconjuntocomponent';
import { Reservarespaciocomponent } from './components/reservarespaciocomponent/reservarespaciocomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Eventoscomponent } from './components/eventoscomponent/eventoscomponent';
import { Paraticomponent } from './components/paraticomponent/paraticomponent';
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
    Miconjuntocomponent,
    Reservarespaciocomponent,
    Misreservascomponent,
    Eventoscomponent,
    Paraticomponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    Logincomponent,
    Registrocomponent,
    Verificarcodigocomponent,
    Olvidecontrasenacomponent,
    Solicitaradmincomponent,
    Aprobaradmincomponent,
    Googlecallbackcomponent,
  ],
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
