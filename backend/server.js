/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro ao conectar:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando com sucesso!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

const conectarBanco = require('./config/db');
conectarBanco();
*/

//require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
require('dotenv').config();

const app = express();

const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://crud-api-ten-theta.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
const contatoRoutes = require('./routes/contatoRoutes');
app.use('/api', contatoRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro ao conectar:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando com sucesso!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

