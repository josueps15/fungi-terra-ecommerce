# 📧 Guía Rápida: Configurar Email de Bienvenida

## Problema Actual
Los registros se guardan en la base de datos ✅ pero NO se envían emails ❌

## Solución: Configurar Gmail

### Paso 1: Obtener Contraseña de Aplicación de Gmail

1. Ve a https://myaccount.google.com/security
2. Activa "Verificación en 2 pasos" (si no está activada)
3. Busca "Contraseñas de aplicaciones"
4. Selecciona "Correo" y "Windows"
5. Copia la contraseña de 16 caracteres (ejemplo: `abcd efgh ijkl mnop`)

### Paso 2: Configurar server.js

Abre `server.js` y busca las líneas 46-47:

```javascript
// ANTES (NO FUNCIONA):
auth: {
  user: 'tu_email@gmail.com',
  pass: 'tu_contraseña_de_aplicacion'
}

// DESPUÉS (REEMPLAZA CON TUS DATOS):
auth: {
  user: 'josue@gmail.com',  // ← Tu email real
  pass: 'abcd efgh ijkl mnop'  // ← La contraseña de 16 caracteres
}
```

### Paso 3: Reiniciar el Servidor

```powershell
# Detén el servidor (Ctrl+C en la terminal donde corre npm start)
# Luego vuelve a iniciar:
npm start
```

### Paso 4: Probar

1. Ve a http://localhost:3000
2. Llena el formulario de registro
3. Revisa tu bandeja de entrada

## ⚠️ Importante

- **NO compartas** tu contraseña de aplicación
- La contraseña de aplicación es diferente a tu contraseña de Gmail normal
- Si no funciona, verifica que la verificación en 2 pasos esté activada

## Alternativa: Desactivar Emails Temporalmente

Si no quieres configurar emails ahora, puedes comentar el envío en `server.js` línea 250:

```javascript
// Comentar esta línea para desactivar emails:
// const emailSent = await sendWelcomeEmail(name, email);

// Y cambiar línea 256 a:
emailSent: false  // En vez de emailSent
```

Los registros seguirán guardándose en la base de datos normalmente.

## Ver Registros Sin Email

Abre en tu navegador: http://localhost:3000/api/users

Verás todos los usuarios registrados aunque no se hayan enviado emails.
