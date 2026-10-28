
import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';

import { criarRotas } from './src/routes/index.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(expressLayouts);
app.set('layout', 'layouts/base');

// Leitura de formulários e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Suporte a PATCH nos formulários HTML
app.use(methodOverride('_method'));

// Sessões
app.use(session({
  secret: process.env.SESSION_SECRET || 'delivery-tracker-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Mensagens temporárias
app.use(flash());

app.use((req, res, next) => {
  res.locals.mensagens = {
    sucesso: req.flash('sucesso'),
    erro: req.flash('erro')
  };
  next();
});

// Health check preservado
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rotas da aplicação
app.use('/', criarRotas());

// Tratamento de páginas inexistentes
app.use((req, res) => {
  res.status(404).render('erro', {
    titulo: 'Página não encontrada',
    mensagem: 'A página solicitada não existe.'
  });
});

// Tratamento de erros
app.use((erro, req, res, next) => {
  console.error(erro);

  if (res.headersSent) {
    return next(erro);
  }

  res.status(erro.status || erro.statusCode || 500).render('erro', {
    titulo: 'Erro',
    mensagem: erro.status >= 500 || !erro.status
      ? 'Ocorreu um erro interno.'
      : erro.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Delivery Tracker rodando em http://localhost:${PORT}`);
});
