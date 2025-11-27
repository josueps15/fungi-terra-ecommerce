require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Database Setup (PostgreSQL)
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL environment variable is not set.');
  console.error('Please configure it in your Render Dashboard.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize Database
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('✅ Connected to PostgreSQL database');

  client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('✅ Users table ready');
  });
});

// Email Configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes

// Register User
app.post('/api/register', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Nombre y email son requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING id',
      [name, email, phone || null]
    );

    const userId = result.rows[0].id;
    console.log(`User registered: ${name} (${email})`);

    // Send Welcome Email
    const mailOptions = {
      from: '"FUNGI TERRA" <ecsetas@gmail.com>',
      to: email,
      subject: '¡Bienvenido a la Familia Fungi Terra! 🍄',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background-color: #2d5016; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">FUNGI TERRA</h1>
          </div>
          
          <div style="padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
            <h2>¡Hola ${name}! 👋</h2>
            <p>Estamos muy felices de que te unas a nuestra comunidad de amantes de los hongos.</p>
            
            <p>En <strong>FUNGI TERRA</strong> nos dedicamos a cultivar los mejores hongos frescos y medicinales para tu bienestar.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2d5016; margin-top: 0;">¿Qué encontrarás aquí?</h3>
              <ul style="padding-left: 20px;">
                <li>🍄 Hongos frescos de alta calidad</li>
                <li>💊 Extractos medicinales potentes</li>
                <li>📦 Envíos seguros a todo el país</li>
                <li>📚 Información científica y recetas</li>
              </ul>
            </div>

            <p>Si tienes alguna pregunta o quieres hacer un pedido, estamos a un clic de distancia:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/593960945828" style="background-color: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 5px; display: inline-block;">WhatsApp</a>
              <a href="https://instagram.com/setas_hongoscomestibles" style="background-color: #E1306C; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 5px; display: inline-block;">Instagram</a>
            </div>

            <p style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
              Gracias por confiar en nosotros.<br>
              El equipo de FUNGI TERRA
            </p>
          </div>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.json({ success: true, message: 'Registro exitoso (Email pendiente)', userId });
      } else {
        console.log('Email sent:', info.response);
        res.json({ success: true, message: 'Registro exitoso y correo enviado', userId, emailSent: true });
      }
    });

  } catch (err) {
    if (err.code === '23505') { // Unique violation code for PostgreSQL
      return res.status(400).json({ success: false, message: 'El email ya está registrado' });
    }
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Get All Users (Admin)
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({ success: true, users: result.rows });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
  }
});

// Get Stats
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as count FROM users');
    res.json({ success: true, totalUsers: parseInt(result.rows[0].count) });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ success: false, message: 'Error al obtener estadísticas' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
