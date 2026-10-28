
export class MotoristasController {
  constructor(service) {
    this.service = service;
  }

  async novo(req, res) {
    return res.render('motoristas/novo', {
      titulo: 'Novo motorista',
      erros: [],
      valores: {}
    });
  }

  async criar(req, res, next) {
    try {
      const { nome, cpf, placaVeiculo } = req.body;
      const erros = [];

      if (typeof nome !== 'string' || !nome.trim()) {
        erros.push({ msg: 'Nome é obrigatório.' });
      }

      if (typeof cpf !== 'string' || !cpf.trim()) {
        erros.push({ msg: 'CPF é obrigatório.' });
      }

      if (erros.length > 0) {
        return res.status(400).render('motoristas/novo', {
          titulo: 'Novo motorista',
          erros,
          valores: req.body
        });
      }

      await this.service.criar({
        nome: nome.trim(),
        cpf: cpf.trim(),
        placaVeiculo:
          typeof placaVeiculo === 'string'
            ? placaVeiculo.trim()
            : ''
      });

      req.flash(
        'sucesso',
        'Motorista cadastrado com sucesso!'
      );

      return res.redirect(303, '/motoristas');

    } catch (erro) {
      if (erro.status === 400 || erro.status === 409) {
        return res.status(400).render('motoristas/novo', {
          titulo: 'Novo motorista',
          erros: [{ msg: erro.message }],
          valores: req.body
        });
      }

      return next(erro);
    }
  }

  async listar(req, res, next) {
    try {
      const motoristas = await this.service.listar();

      return res.render('motoristas/index', {
        titulo: 'Motoristas',
        motoristas
      });

    } catch (erro) {
      return next(erro);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const motorista = await this.service.buscarPorId(
        Number(req.params.id)
      );

      return res.redirect(303, '/motoristas');

    } catch (erro) {
      return next(erro);
    }
  }

  async listarEntregas(req, res, next) {
    try {
      const id = Number(req.params.id);

      await this.service.listarEntregas(
        id,
        req.query.status
      );

      return res.redirect(303, '/entregas');

    } catch (erro) {
      return next(erro);
    }
  }
}
