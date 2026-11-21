# GreenBuildingManagerFrontend

Front de **Green Building Manager**, una aplicación para administrar conjuntos residenciales de Cundinamarca: mapa de conjuntos con rutas, reservas de espacios comunes, eventos, invitaciones para visitantes y un asistente con IA.

Este repositorio es el **front**. Necesita el back en Spring Boot del repositorio **GreenBuildingManagerBackend**.

## Tecnologías

| Tecnología | Uso |
|---|---|
| Angular 22 (con `AppModule`, no standalone) | Framework |
| TypeScript | Lenguaje |
| Bootstrap 5.3 | Estilos y componentes |
| Font Awesome 6 | Iconos |
| Leaflet 1.9 + OpenStreetMap | Mapa de conjuntos y rutas |
| SweetAlert2 | Alertas y confirmaciones |
| Animate.css | Animaciones |
| Vitest | Pruebas unitarias |

Bootstrap, Font Awesome, Leaflet, SweetAlert2 y Animate.css se cargan desde CDN en `src/index.html`, para dejar `package.json` y `angular.json` como los genera Angular.

## Requisitos

- **Node.js** y **npm**
- El **back** en funcionamiento, con su dirección configurada en `environment.ts`

## Cómo correrlo

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Arranca el servidor de desarrollo:
   ```bash
   npm start
   ```
3. Abre en el navegador la dirección que muestra la consola.

## Conexión con el back

La dirección del back está en `src/environments/environment.ts` (y en `environment.development.ts`):

```ts
export const environment = {
  urlApi: 'DIRECCION_DEL_BACK',
};
```

Todos los services y el interceptor leen esa variable; ningún archivo tiene la dirección escrita a mano. Para usar el back desplegado:

1. Cambia `urlApi` por la dirección del back, **sin `/` al final** y con `https`.
2. Vuelve a compilar.

El back también debe permitir la dirección del front en los `@CrossOrigin` de sus controladores.

## Pantallas

| Ruta | Pantalla | Quién |
|---|---|---|
| `/` | Inicio | Todos |
| `/mapa` | Mapa de conjuntos y ruta (carro, bicicleta o caminando) | Todos |
| `/invitacion/:codigo` | Invitación a un evento o reserva | Visitantes con el enlace |
| `/login`, `/registro`, `/verificar`, `/olvide-contrasena` | Cuenta | Todos |
| `/terminos`, `/privacidad` | Páginas legales | Todos |
| `/mi-conjunto` | Información del conjunto y sus espacios | Residente |
| `/reservar/:espacioId` | Reservar un espacio | Residente |
| `/mis-reservas` | Reservas propias e invitaciones | Residente |
| `/eventos` | Eventos del conjunto | Residente |
| `/para-ti` | Recomendaciones según los intereses | Residente |
| `/perfil` | Perfil, intereses y cambio de contraseña | Con sesión |
| `/admin` | Panel con resumen | Admin |
| `/admin/conjuntos`, `/admin/conjuntos/:id` | Conjuntos, unidades y espacios | Admin |
| `/admin/usuarios` | Usuarios, asignar unidad, activar o desactivar | Admin |
| `/admin/eventos` | Programar, editar y cancelar eventos | Admin |
| `/admin/reservas` | Aprobar o rechazar reservas | Admin |
| `/admin/auditoria` | Registro de acciones con filtros | Admin |

Además, con la sesión iniciada aparece un botón flotante con el **asistente de IA**, y un botón para cambiar entre tema oscuro y claro.

## Estructura

```
src/app/
├── components/     Pantallas y piezas reutilizables (filas de tabla, alertas, estado vacío, cargando, paginación)
├── guards/         Protección de rutas por sesión y rol
├── interceptors/   Agrega el token JWT a cada petición y cierra la sesión si vence
├── models/         Interfaces, constantes, reglas de validación y funciones de apoyo de cada entidad
└── services/       Llamadas al back y estado de la sesión
```

- **`models/` tiene más que interfaces.** También guarda constantes, listas de opciones, reglas de validación (`ReglaValidacion` + `primerError`) y funciones puras. Así los components quedan solo con lo que usa `this`.
- **Leaflet y SweetAlert2** se toman de la variable global del CDN con `leaflet()` y `sweetAlert()` en `models/`.

## Validaciones del formulario

El front revisa los datos antes de enviarlos, y el back los vuelve a revisar:

- **Correo:** formato válido y de un proveedor conocido (Gmail, Hotmail, Outlook, Yahoo, iCloud, Proton, `unbosque.edu.co`…), en el registro y en las invitaciones.
- **Teléfono:** 10 dígitos. Se aceptan espacios, que se quitan antes de enviar.
- **Contraseña:** 8 o más caracteres, con mayúscula, minúscula, número y símbolo.
- **Mapa del conjunto:** la longitud se ajusta al rango -180/180 aunque el clic se haga en otra copia del mapa del mundo.
