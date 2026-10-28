
import express from 'express';

import { prisma } from '../config/database.js';

import { EntregasRepositoryPrisma } from '../repositories/entregas.repository.prisma.js';
import { MotoristasRepositoryPrisma } from '../repositories/motoristas.repository.prisma.js';

import { EntregasService } from '../services/entregas.service.js';
import { MotoristasService } from '../services/motoristas.service.js';

import { EntregasController } from '../controllers/entregas.controller.js';
import { MotoristasController } from '../controllers/motoristas.controller.js';

export function criarRotas() {
  const router = express.Router();

  // Repositórios Prisma
  const entregasRepository = new EntregasRepositoryPrisma(prisma);
  const motoristasRepository = new MotoristasRepositoryPrisma(prisma);

  // Serviços
  const entregasService = new EntregasService(
    entregasRepository,
    motoristasRepository
  );

  const motoristasService = new MotoristasService(
    motoristasRepository,
    entregasRepository
  );

  // Controladores SSR
  const entregasController = new EntregasController(
    entregasService,
    motoristasService
  );

  const motoristasController = new MotoristasController(
    motoristasService
  );

  // Página inicial
  router.get('/', (req, res) => {
    return res.redirect(302, '/entregas');
  });

  // Entregas
  router.get('/entregas', (req, res, next) =>
    entregasController.listar(req, res, next)
  );

  // Esta rota precisa vir antes de /entregas/:id
  router.get('/entregas/nova', (req, res, next) =>
    entregasController.nova(req, res, next)
  );

  router.post('/entregas', (req, res, next) =>
    entregasController.criar(req, res, next)
  );

  router.get('/entregas/:id', (req, res, next) =>
    entregasController.buscarPorId(req, res, next)
  );

  router.patch('/entregas/:id/avancar', (req, res, next) =>
    entregasController.avancar(req, res, next)
  );

  router.patch('/entregas/:id/cancelar', (req, res, next) =>
    entregasController.cancelar(req, res, next)
  );

  router.patch('/entregas/:id/atribuir', (req, res, next) =>
    entregasController.atribuir(req, res, next)
  );

  router.get('/entregas/:id/historico', (req, res, next) =>
    entregasController.historico(req, res, next)
  );

  // Motoristas
  router.get('/motoristas', (req, res, next) =>
    motoristasController.listar(req, res, next)
  );

  // Esta rota precisa vir antes de /motoristas/:id
  router.get('/motoristas/novo', (req, res, next) =>
    motoristasController.novo(req, res, next)
  );

  router.post('/motoristas', (req, res, next) =>
    motoristasController.criar(req, res, next)
  );

  router.get('/motoristas/:id/entregas', (req, res, next) =>
    motoristasController.listarEntregas(req, res, next)
  );

  router.get('/motoristas/:id', (req, res, next) =>
    motoristasController.buscarPorId(req, res, next)
  );

  return router;
}
