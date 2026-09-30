import express from 'express';

import { Database } from '../database/database.js';

import { EntregasRepository } from '../repositories/entregas.repository.js';
import { MotoristasRepository } from '../repositories/motoristas.repository.js';

import { EntregasService } from '../services/entregas.service.js';
import { MotoristasService } from '../services/motoristas.service.js';

import { EntregasController } from '../controllers/entregas.controller.js';
import { MotoristasController } from '../controllers/motoristas.controller.js';

import { errorHandler } from '../utils/error-handler.js';

export function criarRotas() {
  const router = express.Router();

  const database = new Database();

  const entregasRepository = new EntregasRepository(database);
  const motoristasRepository = new MotoristasRepository(database);

  const entregasService = new EntregasService(
    entregasRepository,
    motoristasRepository
  );

  const motoristasService = new MotoristasService(
    motoristasRepository,
    entregasRepository
  );

  const entregasController = new EntregasController(entregasService);
  const motoristasController = new MotoristasController(motoristasService);

  // Entregas
  router.post('/entregas', (req, res, next) =>
    entregasController.criar(req, res, next)
  );

  router.get('/entregas', (req, res, next) =>
    entregasController.listar(req, res, next)
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

  router.get('/entregas/:id/historico', (req, res, next) =>
    entregasController.historico(req, res, next)
  );

  router.patch('/entregas/:id/atribuir', (req, res, next) =>
    entregasController.atribuir(req, res, next)
  );

  // Motoristas
  router.post('/motoristas', (req, res, next) =>
    motoristasController.criar(req, res, next)
  );

  router.get('/motoristas', (req, res, next) =>
    motoristasController.listar(req, res, next)
  );

  router.get('/motoristas/:id/entregas', (req, res, next) =>
    motoristasController.listarEntregas(req, res, next)
  );

  router.get('/motoristas/:id', (req, res, next) =>
    motoristasController.buscarPorId(req, res, next)
  );

  router.use(errorHandler);

  return router;
}
