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
import { Adminconjuntoscomponent } from './components/adminconjuntoscomponent/adminconjuntoscomponent';
import { Conjuntodetallecomponent } from './components/conjuntodetallecomponent/conjuntodetallecomponent';
import { Conjuntoformcomponent } from './components/conjuntoformcomponent/conjuntoformcomponent';
import { Espacioformcomponent } from './components/espacioformcomponent/espacioformcomponent';
import { Adminusuarioscomponent } from './components/adminusuarioscomponent/adminusuarioscomponent';
import { Adminreservascomponent } from './components/adminreservascomponent/adminreservascomponent';
import { Adminauditoriacomponent } from './components/adminauditoriacomponent/adminauditoriacomponent';
import { Admineventoscomponent } from './components/admineventoscomponent/admineventoscomponent';
import { Eventoformcomponent } from './components/eventoformcomponent/eventoformcomponent';
import { Selectorinvitacioncomponent } from './components/selectorinvitacioncomponent/selectorinvitacioncomponent';
import { Mapacomponent } from './components/mapacomponent/mapacomponent';
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
    Logincomponent,
    Registrocomponent,
    Verificarcodigocomponent,
    Olvidecontrasenacomponent,
    Solicitaradmincomponent,
    Aprobaradmincomponent,
    Googlecallbackcomponent,
    Miconjuntocomponent,
    Reservarespaciocomponent,
    Misreservascomponent,
    Eventoscomponent,
    Paraticomponent,
    Adminconjuntoscomponent,
    Conjuntodetallecomponent,
    Conjuntoformcomponent,
    Espacioformcomponent,
    Adminusuarioscomponent,
    Adminreservascomponent,
    Adminauditoriacomponent,
    Admineventoscomponent,
    Eventoformcomponent,
    Selectorinvitacioncomponent,
    Mapacomponent,
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
