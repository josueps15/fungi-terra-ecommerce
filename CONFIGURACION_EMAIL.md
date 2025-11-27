# Instrucciones de Configuración del Email

## Paso 1: Obtener Contraseña de Aplicación de Gmail

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En el menú lateral, selecciona **Seguridad**
3. En "Cómo inicias sesión en Google", activa la **Verificación en 2 pasos**
4. Una vez activada, regresa a **Seguridad**
5. Busca **Contraseñas de aplicaciones** (aparece después de activar 2FA)
6. Selecciona:
   - Aplicación: **Correo**
   - Dispositivo: **Otro (nombre personalizado)** → escribe "SETAS"
7. Haz clic en **Generar**
8. Copia la contraseña de 16 caracteres que aparece

## Paso 2: Configurar en server.js

Abre el archivo `server.js` y busca las líneas 37-42:

```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_email@gmail.com',        // ← Reemplaza con tu email
    pass: 'xxxx xxxx xxxx xxxx'        // ← Pega la contraseña de 16 caracteres
  }
});
```

También actualiza la línea 48:
```javascript
from: 'SETAS <tu_email@gmail.com>',  // ← Reemplaza con tu email
```

## Paso 3: Guardar y Reiniciar

1. Guarda el archivo `server.js`
2. Si el servidor está corriendo, deténlo (Ctrl+C)
3. Inicia nuevamente: `npm start`

## Alternativas a Gmail

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'tu_email@hotmail.com',
    pass: 'tu_contraseña'
  }
});
```

### Yahoo
```javascript
const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'tu_email@yahoo.com',
    pass: 'tu_contraseña_de_aplicacion'
  }
});
```

### SMTP Personalizado
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.tuservidor.com',
  port: 587,
  secure: false,
  auth: {
    user: 'tu_email@tudominio.com',
    pass: 'tu_contraseña'
  }
});
```

## Verificar que Funciona

1. Inicia el servidor: `npm start`
2. Abre http://localhost:3000
3. Regístrate con tu propio email
4. Revisa tu bandeja de entrada (y spam)
5. Deberías recibir el email de bienvenida

## Problemas Comunes

### "Invalid login"
- Verifica que la contraseña de aplicación sea correcta
- Asegúrate de que la verificación en 2 pasos esté activada

### "Less secure app access"
- Gmail ya no permite esto, debes usar contraseñas de aplicación

### El email no llega
- Revisa la carpeta de spam
- Verifica que el email esté escrito correctamente
- Revisa los logs del servidor para ver errores

### "Connection timeout"
- Verifica tu conexión a internet
- Algunos firewalls bloquean el puerto 587
