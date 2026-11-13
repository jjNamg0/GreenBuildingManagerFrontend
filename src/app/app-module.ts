import { LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { authinterceptor } from './interceptors/authinterceptor';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Barralateralcomponent } from './components/barralateralcomponent/barralateralcomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Toastcomponent } from './components/toastcomponent/toastcomponent';
import { Cambiotemacomponent } from './components/cambiotemacomponent/cambiotemacomponent';
import { Cargandocomponent } from './components/cargandocomponent/cargandocomponent';
import { Paginacioncomponent } from './components/paginacioncomponent/paginacioncomponent';
import { Notfoundcomponent } from './components/notfoundcomponent/notfoundcomponent';
import { Terminoscomponent } from './components/terminoscomponent/terminoscomponent';
import { Privacidadcomponent } from './components/privacidadcomponent/privacidadcomponent';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Registrocomponent } from './components/registrocomponent/registrocomponent';
import { Verificarcodigocomponent } from './components/verificarcodigocomponent/verificarcodigocomponent';
import { Olvidecontrasenacomponent } from './components/olvidecontrasenacomponent/olvidecontrasenacomponent';
import { Mapacomponent } from './components/mapacomponent/mapacomponent';
import { Listaconjuntoscomponent } from './components/listaconjuntoscomponent/listaconjuntoscomponent';
import { Rutacomponent } from './components/rutacomponent/rutacomponent';
import { Miconjuntocomponent } from './components/miconjuntocomponent/miconjuntocomponent';
import { Tarjetaespaciocomponent } from './components/tarjetaespaciocomponent/tarjetaespaciocomponent';
import { Reservarespaciocomponent } from './components/reservarespaciocomponent/reservarespaciocomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Eventoscomponent } from './components/eventoscomponent/eventoscomponent';
import { Tarjetaeventocomponent } from './components/tarjetaeventocomponent/tarjetaeventocomponent';
import { Paraticomponent } from './components/paraticomponent/paraticomponent';
import { Perfilcomponent } from './components/perfilcomponent/perfilcomponent';
import { Admininiciocomponent } from './components/admininiciocomponent/admininiciocomponent';
import { Adminconjuntoscomponent } from './components/adminconjuntoscomponent/adminconjuntoscomponent';
import { Conjuntoformcomponent } from './components/conjuntoformcomponent/conjuntoformcomponent';
import { Adminconjuntodetallecomponent } from './components/adminconjuntodetallecomponent/adminconjuntodetallecomponent';
import { Unidadformcomponent } from './components/unidadformcomponent/unidadformcomponent';
import { Espacioformcomponent } from './components/espacioformcomponent/espacioformcomponent';
import { Adminusuarioscomponent } from './components/adminusuarioscomponent/adminusuarioscomponent';
import { Admineventoscomponent } from './components/admineventoscomponent/admineventoscomponent';
import { Eventoformcomponent } from './components/eventoformcomponent/eventoformcomponent';
import { Adminreservascomponent } from './components/adminreservascomponent/adminreservascomponent';
import { Adminauditoriacomponent } from './components/adminauditoriacomponent/adminauditoriacomponent';
import { Alertacomponent } from './components/alertacomponent/alertacomponent';
import { Vaciocomponent } from './components/vaciocomponent/vaciocomponent';
import { Conjuntoscercanoscomponent } from './components/conjuntoscercanoscomponent/conjuntoscercanoscomponent';
import { Calendarioreservacomponent } from './components/calendarioreservacomponent/calendarioreservacomponent';
import { Tarjetareservacomponent } from './components/tarjetareservacomponent/tarjetareservacomponent';
import { Cambiopasswordcomponent } from './components/cambiopasswordcomponent/cambiopasswordcomponent';
import { Tablaunidadescomponent } from './components/tablaunidadescomponent/tablaunidadescomponent';
import { Tablaespacioscomponent } from './components/tablaespacioscomponent/tablaespacioscomponent';
import { Filausuariocomponent } from './components/filausuariocomponent/filausuariocomponent';
import { Asignarunidadcomponent } from './components/asignarunidadcomponent/asignarunidadcomponent';
import { Filaeventoadmincomponent } from './components/filaeventoadmincomponent/filaeventoadmincomponent';
import { Selectorplantillacomponent } from './components/selectorplantillacomponent/selectorplantillacomponent';
import { Filareservaadmincomponent } from './components/filareservaadmincomponent/filareservaadmincomponent';
import { Filaauditoriacomponent } from './components/filaauditoriacomponent/filaauditoriacomponent';

registerLocaleData(localeEsCo);

/**
 * Módulo raíz de la aplicación: declara los components, importa los módulos de Angular y registra el interceptor HTTP.
 */
@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Barralateralcomponent,
    Footercomponent,
    Toastcomponent,
    Cambiotemacomponent,
    Cargandocomponent,
    Paginacioncomponent,
    Notfoundcomponent,
    Terminoscomponent,
    Privacidadcomponent,
    Homecomponent,
    Logincomponent,
    Registrocomponent,
    Verificarcodigocomponent,
    Olvidecontrasenacomponent,
    Mapacomponent,
    Listaconjuntoscomponent,
    Rutacomponent,
    Miconjuntocomponent,
    Tarjetaespaciocomponent,
    Reservarespaciocomponent,
    Misreservascomponent,
    Eventoscomponent,
    Tarjetaeventocomponent,
    Paraticomponent,
    Perfilcomponent,
    Admininiciocomponent,
    Adminconjuntoscomponent,
    Conjuntoformcomponent,
    Adminconjuntodetallecomponent,
    Unidadformcomponent,
    Espacioformcomponent,
    Adminusuarioscomponent,
    Admineventoscomponent,
    Eventoformcomponent,
    Adminreservascomponent,
    Adminauditoriacomponent,
    Alertacomponent,
    Vaciocomponent,
    Conjuntoscercanoscomponent,
    Calendarioreservacomponent,
    Tarjetareservacomponent,
    Cambiopasswordcomponent,
    Tablaunidadescomponent,
    Tablaespacioscomponent,
    Filausuariocomponent,
    Asignarunidadcomponent,
    Filaeventoadmincomponent,
    Selectorplantillacomponent,
    Filareservaadmincomponent,
    Filaauditoriacomponent,
  ],
  imports: [BrowserModule, CommonModule, FormsModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authinterceptor])),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
  bootstrap: [App],
})
export class AppModule {}
