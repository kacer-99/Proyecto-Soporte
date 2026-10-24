# Sistema de Gestión de Tickets de Soporte Técnico

## Descripción del Proyecto

Aplicación **Full-Stack** desarrollada para la gestión de tickets de soporte técnico.

El sistema permite **crear, visualizar, editar y eliminar tickets** mediante una interfaz web desarrollada en Angular, conectada a una API REST implementada con Node.js y Express, utilizando Microsoft SQL Server como base de datos relacional.

## Autor

**Kevin Carrasco Garrido**

## Tecnologías Utilizadas

| Área                      | Tecnologías                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| **Frontend**              | Angular (Standalone Components, Zoneless, ChangeDetectorRef, RxJS) |
| **Backend**               | Node.js, Express.js                                                |
| **Base de Datos**         | Microsoft SQL Server                                               |
| **Control de Versiones**  | Git y GitHub                                                       |
| **Convención de Commits** | Conventional Commits                                               |

---

## Instrucciones de Instalación

### 1. Clonar el repositorio

Clonar el proyecto desde GitHub:

```bash
git clone https://github.com/kacer-99/Proyecto-Soporte.git
```

Ingresar a la carpeta del proyecto:

```bash
cd Proyecto-Soporte
```

### 2. Instalar dependencias del Backend

Ingresar a la carpeta correspondiente al servidor:

```bash
cd backend-soporte
```

Instalar las dependencias:

```bash
npm install
```

### 3. Instalar dependencias del Frontend

Desde la carpeta del backend, ingresar al frontend:

```bash
cd ../frontend-soporte
```

Instalar las dependencias:

```bash
npm install
```

---

## Instrucciones de Ejecución

Para ejecutar correctamente el proyecto, es necesario tener configurada y disponible la conexión con Microsoft SQL Server.

### Backend

Abrir una terminal en la carpeta `backend-soporte` y ejecutar:

```bash
npm start
```

El servidor estará disponible en:

**[http://localhost:3000/api/tickets](http://localhost:3000/api/tickets)**

### Frontend

Abrir otra terminal en la carpeta `frontend-soporte` y ejecutar:

```bash
ng serve
```

La aplicación web estará disponible en:

**[http://localhost:4200](http://localhost:4200)**

> **Nota:** El backend debe estar en ejecución para que el frontend pueda consultar y modificar los tickets almacenados en la base de datos.

---

## Estructura General del Proyecto

```text
Proyecto-Soporte/
│
├── backend-soporte/
│   ├── src/                  # Rutas, controladores y lógica de API REST
│   ├── package.json          # Dependencias del backend
│   └── server.js             # Configuración y ejecución del servidor
│
└── frontend-soporte/
    ├── src/
    │   └── app/              # Componentes, servicios HTTP y rutas
    └── package.json          # Dependencias del frontend
```

---

## Funcionalidades Implementadas

El sistema cuenta con las siguientes funcionalidades:

| Funcionalidad                    | Descripción                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| **Listado de Tickets**           | Permite visualizar los tickets almacenados en SQL Server mediante consultas a la API REST. |
| **Creación de Tickets**          | Formulario para registrar nuevos tickets con validaciones de datos.                        |
| **Edición de Tickets**           | Permite modificar el estado y otros campos de los tickets existentes.                      |
| **Eliminación de Tickets**       | Permite eliminar registros almacenados en la base de datos.                                |
| **Actualización de la Interfaz** | Refleja los cambios realizados sin necesidad de recargar manualmente el navegador.         |

---

## Pruebas Realizadas

### Pruebas de Integración

Se realizaron verificaciones manuales de los endpoints HTTP utilizados por la API REST:

| Método HTTP | Operación                          |
| ----------- | ---------------------------------- |
| `GET`       | Consultar tickets existentes.      |
| `POST`      | Registrar nuevos tickets.          |
| `PUT`       | Actualizar información de tickets. |
| `DELETE`    | Eliminar tickets existentes.       |

Estas pruebas permitieron comprobar la comunicación entre el frontend, el backend y la base de datos SQL Server.

### Pruebas Funcionales

Se realizaron las siguientes comprobaciones:

- Navegación entre las distintas rutas de la aplicación.
- Visualización de los tickets registrados.
- Creación y edición de tickets mediante formularios.
- Eliminación de registros.
- Actualización asíncrona de la interfaz sin recargar el navegador.
- Verificación de la persistencia de los datos en SQL Server.

---

## Declaración de Uso de Inteligencia Artificial (IA)

En cumplimiento con las normativas de la evaluación, declaro el uso de herramientas de Inteligencia Artificial durante el desarrollo del proyecto.

### 1. Herramientas de IA utilizadas

- **Gemini (Google).**

### 2. Actividades para las que fueron utilizadas

La herramienta de IA se utilizó como apoyo en las siguientes actividades:

- Asistencia en la estructuración inicial de la arquitectura del proyecto, utilizando Angular Standalone y una API REST desarrollada con Node.js.
- Orientación para resolver problemas relacionados con la reactividad y actualización de la interfaz del frontend.
- Asesoría sobre la aplicación de la convención **Conventional Commits** para el control de versiones.

### 3. Código, documentación y depuración que recibieron apoyo de IA

**Depuración (Debugging):**

Se utilizó IA para analizar errores relacionados con la actualización de la tabla del frontend, específicamente cuando los cambios realizados al crear o editar un ticket no se reflejaban inmediatamente en la interfaz.

**Código:**

Se recibieron sugerencias específicas para:

- Implementar `provideZonelessChangeDetection` en el archivo `app.config.ts`.
- Utilizar `ChangeDetectorRef` en los componentes de Angular para controlar la actualización de la vista.

**Documentación:**

Se utilizó IA como apoyo para organizar el contenido del archivo `README.md`, aplicar el formato Markdown y estructurar las secciones de documentación del proyecto.

### 4. Modificaciones, verificaciones y adaptaciones realizadas

Las sugerencias proporcionadas por la herramienta de IA fueron revisadas, adaptadas e integradas manualmente según los requerimientos del sistema.

Entre las actividades realizadas de forma independiente se encuentran:

- Adaptación del código sugerido a la lógica de negocio del proyecto.
- Verificación manual del funcionamiento de los endpoints HTTP.
- Comprobación de la comunicación entre frontend, backend y base de datos.
- Pruebas funcionales de la interfaz gráfica.
- Validación de las soluciones implementadas para la actualización asíncrona de los datos.

La IA fue utilizada como herramienta de apoyo durante el desarrollo, mientras que la integración, adaptación y verificación de las funcionalidades se realizaron manualmente.

---

## Estado del Proyecto

**Funcionalidades principales implementadas:** creación, visualización, edición y eliminación de tickets de soporte técnico.

El proyecto permite gestionar los registros mediante una interfaz web conectada a una API REST y una base de datos SQL Server.

## Justificación de la Elección de Base de Datos (SQL Server)

La elección de **Microsoft SQL Server** para este proyecto se fundamenta en los siguientes criterios técnicos y prácticos:

1. **Aprovechamiento de Infraestructura y Entorno Existente:** Se optó por reutilizar un entorno local de SQL Server previamente configurado y operativo. Esto permitió optimizar los tiempos de inicio del proyecto, reduciendo la sobrecarga de configuración inicial y enfocando el desarrollo directamente en la integración de la API REST y el cliente Angular.
2. **Robustez y Estándar Empresarial:** SQL Server es una solución consolidada en el mercado con soporte nativo para transacciones complejas, integridad referencial y alta disponibilidad, garantizando un manejo confiable de la información de los tickets.
3. **Compatibilidad con el Stack de Desarrollo:** Su integración con el ecosistema de Node.js permite una comunicación fluida y un rendimiento eficiente en las consultas asíncronas.