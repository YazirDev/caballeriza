# Sistema de Gestión de Caballeriza

Sistema web para administrar caballos, personal, reservas, alimentación y alertas.  
Desarrollado para el curso **EIF209 — Programación IV**, Universidad Nacional Sede Regional Chorotega, Campus Liberia. Primer Semestre 2026.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Backend | Spring Boot 3.2.5 (Java 21) |
| Base de datos | PostgreSQL 17 |
| Seguridad | Spring Security + JWT |
| Documentación API | Swagger / OpenAPI 3 |
| Frontend | React + React Router + Bootstrap Icons |

---

## Estructura del repositorio

```
caballeriza/
├── backend/
│   ├── src/main/java/com/caballeriza/
│   │   ├── config/          ← SecurityConfig, SwaggerConfig, CorsConfig
│   │   ├── controller/      ← Endpoints REST
│   │   ├── service/         ← Lógica de negocio
│   │   ├── repository/      ← Acceso a base de datos (JPA)
│   │   ├── model/           ← Entidades JPA
│   │   ├── dto/             ← Objetos de transferencia de datos
│   │   ├── security/        ← Filtros JWT y autenticación
│   │   └── exception/       ← Manejo global de errores
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       └── Sidebar.jsx
│   │   └── pages/           ← Dashboard, Caballos, Personal, Reservas, Alimentación, Inventario, Alertas
│   └── package.json
└── README.md
```

---

## Requisitos previos

Instalar las siguientes herramientas antes de continuar:

- **Java 21** (Temurin 21) → https://adoptium.net/temurin/releases/?version=21
- **Maven 3.9+** → https://maven.apache.org/download.cgi
- **Node.js 18+** → https://nodejs.org
- **PostgreSQL 17** → https://www.postgresql.org/download/

---

## 1. Configurar la base de datos

Abrir pgAdmin (o psql) y ejecutar estos comandos:

```sql
CREATE DATABASE caballeriza;
CREATE USER admin WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE caballeriza TO admin;
ALTER DATABASE caballeriza OWNER TO admin;
```

Las tablas se crean automáticamente cuando el backend arranca por primera vez. **No se necesita correr ningún SQL adicional.**

Datos de conexión que usa el backend:

| Campo | Valor |
|-------|-------|
| Host | localhost |
| Puerto | 5432 |
| Base de datos | caballeriza |
| Usuario | admin |
| Contraseña | admin123 |

---

## 2. Arrancar el backend

### Opción A — Java 21 configurado como versión por defecto

```bash
cd backend
mvn spring-boot:run -DskipTests
```

### Opción B — El sistema tiene varias versiones de Java instaladas (Windows)

Abrir PowerShell y ejecutar:

```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH
cd backend
mvn spring-boot:run -DskipTests
```

Ajustar la ruta de `JAVA_HOME` según dónde esté instalado Java 21 en el equipo.

### Opción B — Mac / Linux con múltiples versiones de Java

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)   # Mac
# o en Linux:
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64

cd backend
mvn spring-boot:run -DskipTests
```

### Verificar que el backend está corriendo

Abrir en el navegador:

```
http://localhost:8080/swagger-ui/index.html
```

Si carga la interfaz de Swagger, el backend funciona correctamente.

---

## 3. Arrancar el frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en:

```
http://localhost:5173
```

> Si el frontend corre en un puerto diferente al 5173 o 3000, avisar para actualizar la configuración de CORS en el backend (`application.properties`).

---

## 4. Autenticación

Todos los endpoints excepto `/api/auth/**` requieren un token JWT en cada request:

```
Authorization: Bearer <token>
```

### Registrar un usuario

```
POST /api/auth/register
```

Body JSON:

```json
{
  "username": "admin1",
  "password": "admin123",
  "email": "admin@caballeriza.com",
  "rol": "ADMINISTRADOR"
}
```

Roles disponibles: `ADMINISTRADOR`, `VETERINARIO`, `CUIDADOR`, `CLIENTE`

### Iniciar sesión (login)

```
POST /api/auth/login
```

Body JSON:

```json
{
  "username": "admin1",
  "password": "admin123"
}
```

Ambos endpoints devuelven un token JWT. Copiar ese token y enviarlo en el header `Authorization: Bearer <token>` en todos los requests siguientes.

### Usuarios de prueba sugeridos

Registrar estos usuarios desde Swagger para probar cada rol:

| Username | Contraseña | Rol |
|----------|-----------|-----|
| admin1 | admin123 | ADMINISTRADOR |
| vet1 | vet123 | VETERINARIO |
| cuidador1 | cuidador123 | CUIDADOR |
| cliente1 | cliente123 | CLIENTE |

---

## 5. Documentación de la API (Swagger)

Toda la API está documentada con Swagger / OpenAPI 3:

```
http://localhost:8080/swagger-ui/index.html
```

Para probar endpoints autenticados desde Swagger:

1. Hacer login con `POST /api/auth/login`.
2. Copiar el token JWT de la respuesta.
3. Hacer clic en el botón **Authorize** (candado) en la esquina superior derecha de Swagger.
4. Pegar el token con el formato `Bearer <token>`.
5. Todos los endpoints quedan autenticados durante la sesión.

URL base de la API:

```
http://localhost:8080
```

---

## 6. Endpoints disponibles

### Autenticación `/api/auth`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión — devuelve JWT |

---

### Caballos `/api/caballos`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/caballos` | Listar todos los caballos |
| POST | `/api/caballos` | Crear caballo |
| GET | `/api/caballos/{id}` | Ver caballo por ID |
| PUT | `/api/caballos/{id}` | Actualizar caballo |
| DELETE | `/api/caballos/{id}` | Eliminar caballo |
| GET | `/api/caballos/{id}/historial` | Ver historial médico |
| POST | `/api/caballos/{id}/historial` | Agregar registro médico |

Campos del caballo: `nombre`, `identificador`, `edad`, `raza`, `sexo`, `peso`, `foto` (opcional).  
Campos del historial médico: `tipo` (vacuna / tratamiento / alergia / observación), `fecha`, `descripcion`, `responsable`.

---

### Personal `/api/personal`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/personal` | Listar empleados |
| POST | `/api/personal` | Crear empleado |
| GET | `/api/personal/{id}` | Ver empleado |
| PUT | `/api/personal/{id}` | Actualizar empleado |
| DELETE | `/api/personal/{id}` | Eliminar empleado |
| GET | `/api/personal/{id}/turnos` | Ver turnos del empleado |
| POST | `/api/personal/{id}/turnos` | Asignar turno/tarea |

Roles de empleado: `VETERINARIO`, `POTRADOR`, `CUIDADOR`, `ADMINISTRADOR`.

---

### Reservas `/api/reservas`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/reservas` | Listar todas las reservas |
| POST | `/api/reservas` | Crear reserva |
| GET | `/api/reservas/{id}` | Ver reserva |
| PUT | `/api/reservas/{id}` | Editar reserva |
| DELETE | `/api/reservas/{id}` | Cancelar reserva |

Tipos de reserva: `VETERINARIO`, `MONTA`, `PASEO`, `ENTRENAMIENTO`.

---

### Alimentación `/api/alimentacion`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/alimentacion/planes/{caballoId}` | Ver planes de un caballo |
| POST | `/api/alimentacion/planes` | Crear plan de alimentación |
| DELETE | `/api/alimentacion/planes/{id}` | Eliminar plan |
| POST | `/api/alimentacion/suministros` | Registrar suministro |
| GET | `/api/alimentacion/suministros/{caballoId}` | Ver suministros del caballo |
| GET | `/api/alimentacion/inventario` | Ver inventario completo |
| POST | `/api/alimentacion/inventario` | Agregar item al inventario |
| PUT | `/api/alimentacion/inventario/{id}` | Actualizar item |
| GET | `/api/alimentacion/inventario/stock-bajo` | Ver items con stock bajo |

Tipos de insumo: `ALIMENTO`, `MEDICINA`, `OTRO`.

---

### Alertas `/api/alertas`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/alertas` | Listar todas las alertas |
| GET | `/api/alertas/no-leidas` | Ver alertas no leídas |
| PUT | `/api/alertas/{id}/leer` | Marcar alerta como leída |
| POST | `/api/alertas/generar` | Generar alertas automáticas |

Tipos de alerta generadas automáticamente: `VACUNA_PROXIMA`, `TRATAMIENTO_VENCIDO`, `STOCK_BAJO`.

---

## 7. Navegación del frontend

El sidebar del frontend expone estas secciones:

| Sección | Ruta |
|---------|------|
| Dashboard | `/dashboard` |
| Caballos | `/horses` |
| Personal | `/staff` |
| Reservas | `/reservations` |
| Alimentación | `/feeding` |
| Inventario | `/inventory` |
| Alertas | `/alerts` |

---

## 8. CORS

El backend acepta requests desde:

```
http://localhost:3000
http://localhost:5173
```

Para agregar otro origen, editar `backend/src/main/resources/application.properties`:

```properties
spring.web.cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

---

## 9. Variables de configuración (application.properties)

```properties
# Base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/caballeriza
spring.datasource.username=admin
spring.datasource.password=admin123

# JWT — cambiar en producción
jwt.secret=caballerizaSecretKey2026EIF209ProgramacionIVUNAChorotega1234567890AB
jwt.expiration=86400000   # 24 horas en milisegundos

# Puerto del servidor
server.port=8080
```

---

## 10. Migración a React Native (móvil)

La API REST está diseñada para ser consumida desde cualquier cliente. Para portar el frontend a React Native:

1. La lógica de llamadas a la API (fetch / axios) se reutiliza sin cambios.
2. Reemplazar componentes HTML (`<div>`, `<input>`, etc.) por sus equivalentes de React Native (`<View>`, `<TextInput>`, etc.).
3. Reemplazar React Router por React Navigation.
4. El token JWT se guarda en `AsyncStorage` en lugar de `localStorage`.
5. Los endpoints no cambian — el backend es el mismo.

Ejemplo de login desde React Native:

```javascript
const login = async (username, password) => {
  const response = await fetch('http://<IP_DEL_SERVIDOR>:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  await AsyncStorage.setItem('token', data.token);
};
```

Reemplazar `<IP_DEL_SERVIDOR>` por la IP local de la máquina donde corre el backend (no usar `localhost` desde el emulador Android; usar `10.0.2.2` para el emulador o la IP real para dispositivo físico).

---

## Módulos cubiertos por el sistema

1. Gestión de caballos con historial médico
2. Gestión de personal con turnos y tareas
3. Calendario y reservas (veterinario, monta, paseo, entrenamiento)
4. Planes de alimentación e inventario de insumos
5. Alertas automáticas (stock bajo, vacunas próximas, tratamientos vencidos)
6. Autenticación con JWT y control de acceso por roles

---

## Curso

Universidad Nacional — Sede Regional Chorotega, Campus Liberia  
Ingeniería en Sistemas de Información  
Programación IV (EIF209) — Primer Semestre 2026  
Profesor: Darin Mauricio Gamboa Vasquez
