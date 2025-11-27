# 🍄 SETAS - E-commerce Website

Sitio web profesional de comercio electrónico para SETAS, especializado en hongos frescos, extractos medicinales y productos naturales.

## 🚀 Características

- ✅ **Carrito de compras completo** con persistencia en localStorage
- ✅ **Integración con WhatsApp** (+593 960945828) para compras directas
- ✅ **Sistema de registro de usuarios** con base de datos SQLite
- ✅ **Emails de bienvenida automáticos** con diseño profesional
- ✅ **Diseño responsivo** (móvil, tablet, escritorio)
- ✅ **Catálogo de productos** con imágenes y descripciones
- ✅ **Backend Node.js** con API REST

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Cuenta de Gmail para enviar emails (o cualquier servicio SMTP)

## 🔧 Instalación

### 1. Instalar Node.js

Si no tienes Node.js instalado:

**Windows:**
- Descarga desde: https://nodejs.org/
- Ejecuta el instalador
- Verifica la instalación: `node --version`

### 2. Instalar Dependencias

Abre PowerShell o CMD en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará:
- `express` - Framework web
- `cors` - Manejo de CORS
- `nodemailer` - Envío de emails
- `sqlite3` - Base de datos

### 3. Configurar Email

Edita el archivo `server.js` (líneas 37-42):

```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_email@gmail.com',        // ← Cambia esto
    pass: 'tu_contraseña_de_aplicacion' // ← Cambia esto
  }
});
```

**Para obtener una contraseña de aplicación de Gmail:**

1. Ve a https://myaccount.google.com/security
2. Activa la verificación en 2 pasos
3. Ve a "Contraseñas de aplicaciones"
4. Genera una nueva contraseña para "Correo"
5. Copia la contraseña de 16 caracteres

También actualiza el email en la línea 48:
```javascript
from: 'SETAS <tu_email@gmail.com>', // ← Cambia esto
```

## 🎯 Uso

### Iniciar el Servidor

```bash
npm start
```

Verás este mensaje:
```
╔════════════════════════════════════════╗
║     🍄 SERVIDOR SETAS INICIADO 🍄      ║
╠════════════════════════════════════════╣
║  Puerto: 3000                          ║
║  URL: http://localhost:3000            ║
╚════════════════════════════════════════╝
```

### Abrir el Sitio Web

Abre tu navegador y ve a: **http://localhost:3000**

## 📱 Funcionalidades del Sitio

### Carrito de Compras
1. Haz clic en "Agregar al Carrito" en cualquier producto
2. Abre el carrito con el botón 🛒 en la esquina superior derecha
3. Ajusta cantidades con los botones + y -
4. Elimina productos con el botón "Eliminar"
5. Compra por WhatsApp o Instagram

### Registro de Usuarios
1. Ve a la sección "Únete a Nuestra Comunidad"
2. Completa el formulario con nombre, email y teléfono
3. Al registrarte:
   - Se guarda en la base de datos SQLite
   - Recibes un email de bienvenida automático
   - Aparece una notificación de confirmación

### Compra por WhatsApp
- **Individual**: Haz clic en el botón "WhatsApp" de cualquier producto
- **Carrito completo**: Abre el carrito y haz clic en "Comprar por WhatsApp"
- Se abrirá WhatsApp con un mensaje pre-llenado

## 🗄️ Base de Datos

La base de datos SQLite se crea automáticamente en `setas_users.db` con esta estructura:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Ver Usuarios Registrados

**API Endpoint:**
```
GET http://localhost:3000/api/users
```

**Respuesta:**
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "phone": "0987654321",
      "created_at": "2025-11-21 17:30:00"
    }
  ],
  "total": 1
}
```

### Estadísticas

```
GET http://localhost:3000/api/stats
```

## 📧 Email de Bienvenida

El email incluye:
- ✉️ Diseño HTML profesional
- 🎨 Colores de la marca SETAS
- 📋 Lista de beneficios
- 🔗 Enlace directo a WhatsApp
- 📱 Enlaces a redes sociales

## 🛠️ API Endpoints

### POST /api/register
Registra un nuevo usuario

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "0987654321"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registro exitoso",
  "userId": 1,
  "emailSent": true
}
```

### GET /api/users
Obtiene todos los usuarios registrados

### GET /api/stats
Obtiene estadísticas del sitio

## 📂 Estructura de Archivos

```
setas/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript del frontend
├── server.js           # Servidor Node.js
├── package.json        # Dependencias
├── setas_users.db      # Base de datos (se crea automáticamente)
└── README.md           # Este archivo
```

## 🎨 Personalización

### Cambiar Productos

Edita `script.js` (líneas 2-90) para modificar productos, precios o agregar nuevos.

### Cambiar Colores

Edita `styles.css` (líneas 2-20) para modificar la paleta de colores.

### Cambiar Número de WhatsApp

Ya está configurado: **+593 960945828**

Para cambiarlo, edita `script.js` línea 96:
```javascript
const WHATSAPP_NUMBER = '593960945828';
```

## 🚀 Despliegue en Producción

### Opción 1: Hostinger (Solo Frontend)

Para el frontend estático:
1. Sube `index.html`, `styles.css`, `script.js` a Hostinger
2. El carrito funcionará sin backend
3. El registro no guardará en base de datos (solo mostrará notificación)

### Opción 2: Servidor Completo (Frontend + Backend)

Para tener registro de usuarios y emails:

**Servicios recomendados:**
- Heroku (gratis para empezar)
- Railway
- Render
- DigitalOcean

**Pasos generales:**
1. Sube todo el proyecto al servicio
2. Configura las variables de entorno para el email
3. El servicio ejecutará `npm start` automáticamente

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Verifica que Node.js esté instalado
node --version

# Reinstala dependencias
npm install
```

### Los emails no se envían
- Verifica que hayas configurado el email y contraseña correctamente
- Asegúrate de usar una "contraseña de aplicación" de Gmail
- Revisa la consola del servidor para ver errores

### El carrito no se actualiza
- Refresca la página (F5)
- Limpia el localStorage del navegador
- Verifica la consola del navegador (F12) para errores

### Error de CORS
Si el frontend y backend están en diferentes dominios, asegúrate de que CORS esté configurado correctamente en `server.js`.

## 📞 Contacto

- **WhatsApp**: +593 960945828
- **Instagram**: @setas_oficial

## 📄 Licencia

MIT License - Libre para uso personal y comercial

---

**¡Desarrollado con 🍄 para SETAS!**
