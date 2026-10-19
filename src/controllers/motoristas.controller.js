export class MotoristasController {
  constructor(service) {
    this.service = service;
  }

  async criar(req, res, next) {
    try {
      const motorista = await this.service.criar(req.body);
      return res.status(201).json(motorista);
    } catch (erro) {
      return next(erro);
    }
  }

  async listar(req, res, next) {
    try {
      const motoristas = await this.service.listar();
      return res.status(200).json(motoristas);
    } catch (erro) {
      return next(erro);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const motorista = await this.service.buscarPorId(
        Number(req.params.id)
      );

      return res.status(200).json(motorista);
    } catch (erro) {
      return next(erro);
    }
  }

  async listarEntregas(req, res, next) {
    try {
      const entregas = await this.service.listarEntregas(
        Number(req.params.id),
        req.query.status
      );

      return res.status(200).json(entregas);
    } catch (erro) {
      return next(erro);
    }
  }
}
