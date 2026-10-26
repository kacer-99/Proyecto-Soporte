# Sistema de Gestión de Tickets de Soporte Técnico

## Descripción del Proyecto

Aplicación web **full stack** para gestionar tickets de soporte técnico. Permite **registrar, listar, consultar, editar y eliminar** tickets desde una interfaz Angular, que se comunica con una API REST (Node.js + Express) conectada a una base de datos Microsoft SQL Server. La información se mantiene después de recargar la página y de reiniciar la API.

## Autor

**Kevin Carrasco Garrido** — Electivo Angular, Instituto Profesional Virginio Gómez, Sede Chillán.

## Tecnologías Utilizadas

| Área | Tecnologías |
| --- | --- |
| Frontend | Angular 22 (componentes standalone, zoneless, Router, HttpClient, formularios con `ngModel`) |
| Backend | Node.js, Express 5, paquete `mssql` |
| Base de datos | Microsoft SQL Server |
| Control de versiones | Git y GitHub (Conventional Commits) |

## Requisitos previos

- Node.js y npm.
- Angular CLI 22 (`npm install -g @angular/cli`).
- Microsoft SQL Server activo, con TCP/IP habilitado en el puerto 1433, y SSMS (o una herramienta equivalente) para ejecutar el script.

## Instrucciones de Instalación

```bash
git clone https://github.com/kacer-99/Proyecto-Soporte.git
cd Proyecto-Soporte

# Dependencias del backend
cd backend-soporte
npm install

# Dependencias del frontend
cd ../frontend-soporte
npm install
```

### Base de datos

1. Abrir SQL Server Management Studio y conectarse al servidor local.
2. Abrir y ejecutar el script **`database/SoporteTecnico.sql`**. Crea la base de datos `SoporteTecnico` y la tabla `Tickets`.
3. Comprobar con `SELECT * FROM Tickets;`.

### Conexión

El backend se conecta con estos datos (definidos en `backend-soporte/index.js`): servidor `localhost`, puerto `1433`, usuario `sa`, contraseña `alumnos`, base `SoporteTecnico`. Si en otro computador son distintos, se deben modificar en el objeto `dbConfig` de ese archivo.


## Si falla la conexión a SQL Server

El backend usa: servidor `localhost`, puerto `1433`, usuario `sa`, clave `alumnos`.
Si aparece "Error conectando a la base de datos":
1. Verificar que SQL Server esté activo y que exista la base `SoporteTecnico` (ejecutar `database/SoporteTecnico.sql`).
2. Habilitar TCP/IP (puerto 1433) en SQL Server Configuration Manager y reiniciar el servicio.
3. Usar autenticación mixta y comprobar que `sa` esté habilitado con la clave configurada.
4. Si los datos son distintos, modificarlos en `dbConfig` dentro de `backend-soporte/index.js`.


## Instrucciones de Ejecución

El orden es: SQL Server activo → backend → frontend. Se necesitan dos terminales.

**Terminal 1 — Backend** (carpeta `backend-soporte`):

```bash
node index.js
```

Debe mostrar `Conectado a SQL Server` y quedar disponible en <http://localhost:3000/api/tickets>.

**Terminal 2 — Frontend** (carpeta `frontend-soporte`):

```bash
ng serve
```

Abrir <http://localhost:4200>.

## Estructura General del Proyecto

```text
Proyecto-Soporte/
├── database/
│   └── SoporteTecnico.sql        # Script de creación de la base de datos y la tabla
├── backend-soporte/
│   ├── index.js                  # API REST (Express + mssql): GET, POST, PUT, DELETE
│   └── package.json
└── frontend-soporte/
    └── src/app/
        ├── components/
        │   ├── cabecera/         # Encabezado
        │   ├── menu/             # Menú de navegación
        │   ├── tickets/          # Listado y eliminación de tickets
        │   ├── nuevo-ticket/     # Formulario de registro
        │   └── editar-ticket/    # Formulario de edición
        ├── models/ticket.ts      # Interfaz Ticket
        ├── services/ticket.ts    # TicketService: comunicación HTTP con la API
        ├── app.routes.ts         # Rutas de la aplicación
        └── app.config.ts         # Configuración (HttpClient, Router, zoneless)
```

## API REST

| Método | Ruta | Acción |
| --- | --- | --- |
| GET | `/api/tickets` | Listar todos los tickets |
| GET | `/api/tickets/:id` | Obtener un ticket |
| POST | `/api/tickets` | Crear un ticket |
| PUT | `/api/tickets/:id` | Actualizar un ticket |
| DELETE | `/api/tickets/:id` | Eliminar un ticket |

Las consultas son **parametrizadas** (`.input()` de `mssql`): los datos del usuario no se concatenan en el SQL. La API responde con códigos 200, 201, 400 (datos incompletos), 404 (no existe) y 500 (error interno), con un mensaje en JSON.

## Modelo de datos (tabla `Tickets`)

`id` (autoincremental), `asunto`, `solicitante`, `descripcion`, `categoria`, `prioridad`, `estado` y `fechaRegistro` (se asigna automáticamente con `GETDATE()`).

## Funcionalidades Implementadas

- Listado de tickets obtenidos desde SQL Server, con su fecha de registro.
- Prioridad y estado con distintivos de color.
- Registro de tickets con validación de campos obligatorios (solicitante, asunto y descripción).
- Edición de tickets: el formulario se carga con los datos actuales.
- Eliminación con confirmación previa.
- Mensajes de error visibles cuando la API no responde o rechaza la operación.
- Navegación con rutas: `/tickets`, `/nuevo` y `/editar/:id`.

## Pruebas Realizadas

| Prueba | Cómo se probó | Resultado esperado | Resultado |
| --- | --- | --- | --- |
| Inicio | Se siguió este README con SQL Server, backend y frontend | Los tres componentes funcionan | si |
| GET | Abrir `/tickets` | Se muestran los tickets de la base | si |
| POST | Crear un ticket y consultar `SELECT * FROM Tickets` | El ticket aparece en la base | si |
| PUT | Editar un ticket y recargar la página | El cambio permanece | si |
| DELETE | Eliminar un ticket y confirmar | Desaparece de la lista y de la base | si |
| Validación | Guardar el formulario con campos vacíos | Aparece el mensaje y no se guarda | si |
| Error | Detener el backend y abrir `/tickets` | Aparece el mensaje de error con "Reintentar" | si |
| Persistencia | Reiniciar el backend y recargar | Los tickets siguen existiendo | si |

## Declaración de Uso de Inteligencia Artificial (IA)

### 1. Herramientas utilizadas

- **Gemini (Google)**
- **Claude (Anthropic)**

### 2. Actividades para las que fueron utilizadas

- **Gemini:** apoyo en la estructura inicial del proyecto (Angular standalone y API con Node.js), en la actualización de la vista con `provideZonelessChangeDetection` y `ChangeDetectorRef`, en la convención Conventional Commits y en la primera versión del README.
- **Claude:** revisión del proyecto contra la rúbrica de la evaluación y orientación en las correcciones finales: script SQL, validación de la descripción, mensajes de error visibles, corrección de la carga de datos en el formulario de edición, prioridad y ajuste orden del readme.

### 3. Código, documentación y depuración que recibieron apoyo de IA

- **Depuración:** la vista que no se actualizaba al crear o editar (Gemini) y el formulario de edición que no mostraba los datos al abrirse (Claude).
- **Código:** la configuración zoneless, el uso de `ChangeDetectorRef`, las validaciones y el manejo de errores.
- **Documentación:** el README y el script SQL.

### 4. Modificaciones, verificaciones y adaptaciones realizadas por mí

Revisé y adapté cada sugerencia al proyecto, ejecuté el script SQL en mi SQL Server y probé manualmente todas las operaciones (GET, POST, PUT, DELETE), la validación, el manejo de errores y la persistencia de los datos.

## Justificación de la Elección de Base de Datos (SQL Server)

1. **Entorno existente:** ya contaba con un SQL Server local configurado, lo que permitió centrarme en la integración entre Angular, la API y la base de datos.
2. **Robustez:** es un motor relacional con transacciones, integridad referencial e índices, adecuado para registrar tickets de forma confiable.
3. **Compatibilidad:** el paquete `mssql` permite consultas parametrizadas desde Node.js de manera sencilla.