# Sistema de Gestión de Caballeriza

Sistema web para administrar caballos, personal, reservas, alimentación y alertas.
Desarrollado para el curso EIF209 — Programación IV, Universidad Nacional Sede Chorotega.

---

## Tecnologías

- **Backend:** Spring Boot 3.2.5 (Java 21)
- **Base de datos:** PostgreSQL 17
- **Seguridad:** Spring Security + JWT
- **Documentación API:** Swagger / OpenAPI 3
- **Frontend:** React (desarrollado por otro equipo)

---

## Requisitos previos

- Java 21 (Temurin 21) — [Descargar aquí](https://adoptium.net/temurin/releases/?version=21)
- Maven 3.9+
- PostgreSQL 17 instalado y corriendo

---

## Configuración de la base de datos

Abrir pgAdmin y ejecutar:

```sql
CREATE DATABASE caballeriza;
CREATE USER admin WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE caballeriza TO admin;
ALTER DATABASE caballeriza OWNER TO admin;
```

Las tablas se crean automáticamente al arrancar el backend. No se necesita correr ningún SQL adicional.

**Datos de conexión:**

| Campo | Valor |
|-------|-------|
| Host | localhost |
| Puerto | 5432 |
| Base de datos | caballeriza |
| Usuario | admin |
| Contraseña | admin123 |

---

## Cómo arrancar el backend

### Opción 1 — Si Java 21 está configurado como default

```bash
cd backend
mvn spring-boot:run -DskipTests
```

### Opción 2 — Si el sistema tiene múltiples versiones de Java (Windows)

Abrir PowerShell y correr:

```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH
cd backend
mvn spring-boot:run -DskipTests
```

### Verificar que está corriendo

Abrir en el navegador:
```
http://localhost:8080/swagger-ui/index.html
```

Si carga la interfaz de Swagger, el backend está funcionando correctamente.

---

## Documentación de la API

Toda la API está documentada en Swagger:
```
http://localhost:8080/swagger-ui/index.html
```

**URL base:**
```
http://localhost:8080
```

---

## Autenticación

Todos los endpoints excepto `/api/auth/**` requieren un token JWT en el header de cada request:

```
Authorization: Bearer <token>
```

### Registrar usuario

```
POST /api/auth/register
```

```json
{
  "username": "admin1",
  "password": "admin123",
  "email": "admin@caballeriza.com",
  "rol": "ADMINISTRADOR"
}
```

### Login

```
POST /api/auth/login
```

```json
{
  "username": "admin1",
  "password": "admin123"
}
```

Ambos endpoints devuelven un token JWT que debe enviarse en todos los requests siguientes.

**Roles disponibles:** `ADMINISTRADOR`, `CUIDADOR`, `VETERINARIO`, `CLIENTE`

---

## Endpoints de la API

### Caballos `/api/caballos`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/caballos` | Listar todos los caballos |
| GET | `/api/caballos/{id}` | Obtener caballo por ID |
| POST | `/api/caballos` | Crear caballo |
| PUT | `/api/caballos/{id}` | Actualizar caballo |
| DELETE | `/api/caballos/{id}` | Eliminar caballo |
| GET | `/api/caballos/{id}/historial` | Ver historial médico |
| POST | `/api/caballos/{id}/historial` | Agregar registro médico |
| DELETE | `/api/caballos/historial/{historialId}` | Eliminar registro médico |

**Campos caballo:** `nombre`, `identificador`, `edad`, `raza`, `sexo` (MACHO/HEMBRA), `peso`, `fotoUrl`

**Campos historial:** `tipo` (VACUNA/TRATAMIENTO/ALERGIA/OBSERVACION), `descripcion`, `responsable`, `fecha`, `fechaVencimiento`

---

### Personal `/api/personal`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/personal` | Listar empleados |
| GET | `/api/personal/{id}` | Obtener empleado por ID |
| POST | `/api/personal` | Crear empleado |
| PUT | `/api/personal/{id}` | Actualizar empleado |
| DELETE | `/api/personal/{id}` | Eliminar empleado |
| GET | `/api/personal/{id}/turnos` | Ver turnos del empleado |
| POST | `/api/personal/{id}/turnos` | Asignar turno |
| GET | `/api/personal/{id}/tareas` | Ver tareas del empleado |
| POST | `/api/personal/{id}/tareas` | Asignar tarea |

**Roles de empleado:** `VETERINARIO`, `POTRADOR`, `CUIDADOR`, `ADMINISTRADOR`

---

### Reservas `/api/reservas`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/reservas` | Listar todas las reservas |
| GET | `/api/reservas/{id}` | Obtener reserva por ID |
| POST | `/api/reservas` | Crear reserva |
| PUT | `/api/reservas/{id}` | Actualizar reserva |
| PUT | `/api/reservas/{id}/cancelar` | Cancelar reserva |
| DELETE | `/api/reservas/{id}` | Eliminar reserva |
| GET | `/api/reservas/tipo/{tipo}` | Filtrar por tipo |

**Tipos de reserva:** `VETERINARIO`, `MONTA`, `PASEO`, `ENTRENAMIENTO`

**Estados:** `PENDIENTE`, `CONFIRMADA`, `CANCELADA`

---

### Alimentación `/api/alimentacion`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/alimentacion/planes/{caballoId}` | Planes de alimentación del caballo |
| POST | `/api/alimentacion/planes` | Crear plan de alimentación |
| DELETE | `/api/alimentacion/planes/{id}` | Eliminar plan |
| POST | `/api/alimentacion/suministros` | Registrar suministro |
| GET | `/api/alimentacion/suministros/{caballoId}` | Ver suministros del caballo |
| GET | `/api/alimentacion/inventario` | Ver inventario completo |
| POST | `/api/alimentacion/inventario` | Agregar item al inventario |
| PUT | `/api/alimentacion/inventario/{id}` | Actualizar item |
| GET | `/api/alimentacion/inventario/stock-bajo` | Ver items con stock bajo |

**Tipos de insumo:** `ALIMENTO`, `MEDICINA`, `OTRO`

---

### Alertas `/api/alertas`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/alertas` | Listar todas las alertas |
| GET | `/api/alertas/no-leidas` | Ver alertas no leídas |
| PUT | `/api/alertas/{id}/leer` | Marcar alerta como leída |
| POST | `/api/alertas/generar` | Generar alertas automáticas |

**Tipos de alerta:** `VACUNA_PROXIMA`, `TRATAMIENTO_VENCIDO`, `STOCK_BAJO`

---

## CORS configurado para

El backend acepta requests desde:

```
http://localhost:3000
http://localhost:5173
```

Si el frontend corre en otro puerto, avisar para actualizar la configuración.

---

## Estructura del proyecto

```
caballeriza/
├── backend/
│   ├── src/main/java/com/caballeriza/
│   │   ├── config/          ← SecurityConfig, SwaggerConfig
│   │   ├── controller/      ← REST endpoints
│   │   ├── service/         ← lógica de negocio
│   │   ├── repository/      ← acceso a BD
│   │   ├── model/           ← entidades JPA
│   │   ├── dto/             ← objetos de transferencia
│   │   ├── security/        ← JWT, filtros
│   │   └── exception/       ← manejo de errores
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                ← React (otro equipo)
└── README.md
```

---

## Credenciales de prueba

Registrar estos usuarios desde Swagger para probar cada rol:

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin1 | admin123 | ADMINISTRADOR |
| vet1 | vet123 | VETERINARIO |
| cuidador1 | cuidador123 | CUIDADOR |
| cliente1 | cliente123 | CLIENTE |
