import express from 'express';
import { Database } from '../database/database.js';
import { EntregasRepository } from '../repositories/entregas.repository.js';
import { EntregasService } from '../services/entregas.service.js';
import { EntregasController } from '../controllers/entregas.controller.js';
import { errorHandler } from '../utils/error-handler.js';

export function criarRotas() {
  const router = express.Router();

  const database = new Database();
  const repository = new EntregasRepository(database);
  const service = new EntregasService(repository);
  const controller = new EntregasController(service);

  router.post('/entregas', (req, res, next) => controller.criar(req, res, next));
  router.get('/entregas', (req, res, next) => controller.listar(req, res, next));
  router.get('/entregas/:id', (req, res, next) => controller.buscarPorId(req, res, next));
  router.patch('/entregas/:id/avancar', (req, res, next) => controller.avancar(req, res, next));
  router.patch('/entregas/:id/cancelar', (req, res, next) => controller.cancelar(req, res, next));
  router.get('/entregas/:id/historico', (req, res, next) => controller.historico(req, res, next));

  router.use(errorHandler);

  return router;
}

const router = criarRotas();
export default router;
