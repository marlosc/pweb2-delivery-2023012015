export class MotoristasController {
  constructor(service) {
    this.service = service;
  }

  criar(req, res, next) {
    try {
      const motorista = this.service.criar(req.body);
      return res.status(201).json(motorista);
    } catch (erro) {
      return next(erro);
    }
  }

  listar(req, res, next) {
    try {
      const motoristas = this.service.listar();
      return res.status(200).json(motoristas);
    } catch (erro) {
      return next(erro);
    }
  }

  buscarPorId(req, res, next) {
    try {
      const motorista = this.service.buscarPorId(Number(req.params.id));
      return res.status(200).json(motorista);
    } catch (erro) {
      return next(erro);
    }
  }
}
