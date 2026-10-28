
export class EntregasController {
  constructor(service, motoristasService) {
    this.service = service;
    this.motoristasService = motoristasService;
  }

  async nova(req, res) {
    return res.render('entregas/nova', {
      titulo: 'Nova entrega',
      erros: [],
      valores: {}
    });
  }

  async criar(req, res, next) {
    try {
      const { descricao, origem, destino } = req.body;

      const erros = [];

      if (!descricao?.trim()) {
        erros.push({ msg: 'Descrição é obrigatória.' });
      }

      if (!origem?.trim()) {
        erros.push({ msg: 'Origem é obrigatória.' });
      }

      if (!destino?.trim()) {
        erros.push({ msg: 'Destino é obrigatório.' });
      }

      if (
        origem?.trim() &&
        destino?.trim() &&
        origem.trim() === destino.trim()
      ) {
        erros.push({
          msg: 'Origem e destino devem ser diferentes.'
        });
      }

      if (erros.length > 0) {
        return res.status(400).render('entregas/nova', {
          titulo: 'Nova entrega',
          erros,
          valores: req.body
        });
      }

      await this.service.criar({
        descricao: descricao.trim(),
        origem: origem.trim(),
        destino: destino.trim()
      });

      req.flash('sucesso', 'Entrega cadastrada com sucesso!');
      return res.redirect(303, '/entregas');

    } catch (erro) {
      if (erro.status === 400 || erro.status === 409) {
        return res.status(400).render('entregas/nova', {
          titulo: 'Nova entrega',
          erros: [{ msg: erro.message }],
          valores: req.body
        });
      }

      return next(erro);
    }
  }

  async listar(req, res, next) {
    try {
      const statusSelecionado = req.query.status || '';

      const entregas = await this.service.listar(
        statusSelecionado || undefined
      );

      return res.render('entregas/index', {
        titulo: 'Entregas',
        entregas,
        statusSelecionado
      });

    } catch (erro) {
      return next(erro);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const id = Number(req.params.id);

      const entrega = await this.service.buscarPorId(id);
      const motoristas = await this.motoristasService.listar();

      return res.render('entregas/detalhes', {
        titulo: `Entrega #${entrega.id}`,
        entrega,
        motoristas
      });

    } catch (erro) {
      return next(erro);
    }
  }

  async avancar(req, res, next) {
    const id = Number(req.params.id);

    try {
      await this.service.avancar(id);

      req.flash('sucesso', 'Status da entrega atualizado!');
      return res.redirect(303, `/entregas/${id}`);

    } catch (erro) {
      if (erro.status === 422 || erro.status === 404) {
        req.flash('erro', erro.message);
        return res.redirect(303, '/entregas');
      }

      return next(erro);
    }
  }

  async cancelar(req, res, next) {
    const id = Number(req.params.id);

    try {
      await this.service.cancelar(id);

      req.flash('sucesso', 'Entrega cancelada com sucesso!');
      return res.redirect(303, `/entregas/${id}`);

    } catch (erro) {
      if (erro.status === 422 || erro.status === 404) {
        req.flash('erro', erro.message);
        return res.redirect(303, '/entregas');
      }

      return next(erro);
    }
  }

  async atribuir(req, res, next) {
    const id = Number(req.params.id);
    const motoristaId = Number(req.body.motoristaId);

    try {
      await this.service.atribuir(id, motoristaId);

      req.flash('sucesso', 'Motorista atribuído com sucesso!');
      return res.redirect(303, `/entregas/${id}`);

    } catch (erro) {
      if (
        erro.status === 400 ||
        erro.status === 404 ||
        erro.status === 422
      ) {
        req.flash('erro', erro.message);
        return res.redirect(303, `/entregas/${id}`);
      }

      return next(erro);
    }
  }

  async historico(req, res, next) {
    try {
      const id = Number(req.params.id);
      const entrega = await this.service.buscarPorId(id);
      const motoristas = await this.motoristasService.listar();

      return res.render('entregas/detalhes', {
        titulo: `Histórico da entrega #${id}`,
        entrega,
        motoristas
      });

    } catch (erro) {
      return next(erro);
    }
  }
}
