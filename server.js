require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Database Setup
const db = new sqlite3.Database('./setas_users.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('✅ Database connected');

    // Create users table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('✅ Users table ready');
      }
    });
  }
});

// Email Configuration
// IMPORTANTE: Configura estas variables con tus credenciales reales
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar Gmail, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Función para enviar email de bienvenida
async function sendWelcomeEmail(name, email) {
  const mailOptions = {
    from: 'FUNGI TERRA <tu_email@gmail.com>',
    to: email,
    subject: '¡Bienvenido a FUNGI TERRA! 🍄',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #2c2c2c;
            background-color: #faf8f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 32px;
            letter-spacing: 2px;
          }
          .content {
            padding: 40px 30px;
          }
          .content h2 {
            color: #2d5016;
            margin-top: 0;
          }
          .benefits {
            background: #f5f3f0;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .benefits ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .benefits li {
            margin: 8px 0;
          }
          .cta-button {
            display: inline-block;
            background: #2d5016;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            background: #f5f3f0;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #8a8a8a;
          }
          .social-links {
            margin: 15px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #2d5016;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍄 FUNGI TERRA 🍄</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Hongos Frescos y Medicinales</p>
          </div>
          
          <div class="content">
            <h2>¡Hola ${name}! 👋</h2>
            
            <p>¡Bienvenido a la familia FUNGI TERRA! Estamos emocionados de tenerte con nosotros.</p>
            
            <p>Te has unido a una comunidad que valora la salud natural y el poder de los hongos medicinales. Aquí encontrarás:</p>
            
            <div class="benefits">
              <ul>
                <li>🍄 <strong>Hongos frescos</strong> de la más alta calidad</li>
                <li>💊 <strong>Extractos medicinales</strong> concentrados</li>
                <li>🌿 <strong>Productos naturales</strong> para tu bienestar</li>
                <li>🎁 <strong>Promociones exclusivas</strong> para miembros</li>
                <li>📚 <strong>Consejos y recetas</strong> para aprovechar al máximo nuestros productos</li>
              </ul>
            </div>
            
            <p>Como nuevo miembro, recibirás:</p>
            <ul>
              <li>✨ Notificaciones de nuevos productos</li>
              <li>💰 Descuentos especiales y ofertas exclusivas</li>
              <li>📖 Guías sobre los beneficios de los hongos medicinales</li>
            </ul>
            
            <center>
              <a href="https://wa.me/593960945828?text=Hola,%20soy%20nuevo%20miembro%20y%20quiero%20conocer%20las%20promociones" class="cta-button">
                Ver Productos
              </a>
            </center>
            
            <p>Si tienes alguna pregunta, no dudes en contactarnos por WhatsApp. ¡Estamos aquí para ayudarte!</p>
            
            <p>Saludos cordiales,<br>
            <strong>El equipo de FUNGI TERRA</strong></p>
          </div>
          
          <div class="footer">
            <div class="social-links">
              <a href="https://wa.me/593960945828">📱 WhatsApp</a>
              <a href="https://instagram.com/setas_hongoscomestibles">📷 Instagram</a>
            </div>
            <p>© 2025 FUNGI TERRA. Todos los derechos reservados.</p>
            <p style="font-size: 12px; margin-top: 10px;">
              Recibiste este correo porque te registraste en nuestro sitio web.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de bienvenida enviado a ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return false;
  }
}

// API Endpoints

// Registrar nuevo usuario
app.post('/api/register', async (req, res) => {
  const { name, email, phone } = req.body;

  // Validación
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y email son requeridos'
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Email inválido'
    });
  }

  // Insertar en la base de datos
  const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';

  db.run(sql, [name, email, phone || null], async function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({
          success: false,
          message: 'Este email ya está registrado'
        });
      }
      console.error('Error insertando usuario:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al registrar usuario'
      });
    }

    console.log(`✅ Nuevo usuario registrado: ${name} (${email})`);

    // Enviar email de bienvenida
    const emailSent = await sendWelcomeEmail(name, email);

    res.json({
      success: true,
      message: 'Registro exitoso',
      userId: this.lastID,
      emailSent: emailSent
    });
  });
});

// Obtener todos los usuarios (para administración)
app.get('/api/users', (req, res) => {
  const sql = 'SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error obteniendo usuarios:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener usuarios'
      });
    }

    res.json({
      success: true,
      users: rows,
      total: rows.length
    });
  });
});

// Obtener estadísticas
app.get('/api/stats', (req, res) => {
  const sql = 'SELECT COUNT(*) as total FROM users';

  db.get(sql, [], (err, row) => {
    if (err) {
      console.error('Error obteniendo estadísticas:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas'
      });
    }

    res.json({
      success: true,
      totalUsers: row.total
    });
  });
});

// Servir archivos estáticos (HTML, CSS, JS)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🍄 SERVIDOR FUNGI TERRA INICIADO 🍄      ║
╠════════════════════════════════════════╣
║  Puerto: ${PORT}                          ║
║  URL: http://localhost:${PORT}            ║
║                                        ║
║  Endpoints disponibles:                ║
║  • POST /api/register                  ║
║  • GET  /api/users                     ║
║  • GET  /api/stats                     ║
╚════════════════════════════════════════╝
  `);
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error cerrando database:', err);
    } else {
      console.log('\n✅ Database cerrada correctamente');
    }
    process.exit(0);
  });
});
