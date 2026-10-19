export class EntregasController {
  constructor(service) {
    this.service = service;
  }

  async criar(req, res, next) {
    try {
      const entrega = await this.service.criar(req.body);
      return res.status(201).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }

  async listar(req, res, next) {
    try {
      const entregas = await this.service.listar(req.query.status);
      return res.status(200).json(entregas);
    } catch (erro) {
      return next(erro);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const entrega = await this.service.buscarPorId(
        Number(req.params.id)
      );

      return res.status(200).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }

  async avancar(req, res, next) {
    try {
      const entrega = await this.service.avancar(
        Number(req.params.id)
      );

      return res.status(200).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }

  async cancelar(req, res, next) {
    try {
      const entrega = await this.service.cancelar(
        Number(req.params.id)
      );

      return res.status(200).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }

  async historico(req, res, next) {
    try {
      const historico = await this.service.historico(
        Number(req.params.id)
      );

      return res.status(200).json(historico);
    } catch (erro) {
      return next(erro);
    }
  }

  async atribuir(req, res, next) {
    try {
      const motoristaId = Number(req.body.motoristaId);

      const entrega = await this.service.atribuir(
        Number(req.params.id),
        motoristaId
      );

      return res.status(200).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }
}
