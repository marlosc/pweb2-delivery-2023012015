export class EntregasController {
  constructor(service) {
    this.service = service;
  }

  criar(req, res, next) {
    try {
      const entrega = this.service.criar(req.body);
      return res.status(201).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }

  listar(req, res, next) {
    try {
      const entregas = this.service.listar(req.query.status);
      return res.status(200).json(entregas);
    } catch (erro) {
      return next(erro);
    }
  }

  buscarPorId(req, res, next) {
    try {
      const entrega = this.service.buscarPorId(Number(req.params.id));
      return res.status(200).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }

  avancar(req, res, next) {
    try {
      const entrega = this.service.avancar(Number(req.params.id));
      return res.status(200).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }

  cancelar(req, res, next) {
    try {
      const entrega = this.service.cancelar(Number(req.params.id));
      return res.status(200).json(entrega);
    } catch (erro) {
      return next(erro);
    }
  }

  historico(req, res, next) {
    try {
      const historico = this.service.historico(Number(req.params.id));
      return res.status(200).json(historico);
    } catch (erro) {
      return next(erro);
    }
  }
}
