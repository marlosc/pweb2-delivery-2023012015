function criarErro(status, mensagem) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

export class EntregasService {
  constructor(repository) {
    this.repository = repository;
  }

  criar(dados = {}) {
    const { descricao, origem, destino } = dados;

    if (!descricao || !origem || !destino) {
      throw criarErro(400, 'descricao, origem e destino são obrigatórios');
    }

    if (origem === destino) {
      throw criarErro(400, 'origem e destino devem ser diferentes');
    }

    const duplicada = this.repository.listar().some((entrega) => {
      const ativa = entrega.status !== 'ENTREGUE' && entrega.status !== 'CANCELADA';

      return (
        ativa &&
        entrega.descricao === descricao &&
        entrega.origem === origem &&
        entrega.destino === destino
      );
    });

    if (duplicada) {
      throw criarErro(409, 'já existe uma entrega ativa com os mesmos dados');
    }

    return this.repository.criar({
      descricao,
      origem,
      destino,
      status: 'CRIADA',
      motoristaId: null,
      historico: [
        {
          data: new Date().toISOString(),
          descricao: 'Entrega criada'
        }
      ]
    });
  }

  listar(status) {
    const entregas = this.repository.listar();

    if (!status) {
      return entregas;
    }

    return entregas.filter((entrega) => entrega.status === status);
  }

  buscarPorId(id) {
    const entrega = this.repository.buscarPorId(id);

    if (!entrega) {
      throw criarErro(404, 'entrega não encontrada');
    }

    return entrega;
  }

  avancar(id) {
    const entrega = this.buscarPorId(id);
    let novoStatus;

    if (entrega.status === 'CRIADA') {
      novoStatus = 'EM_TRANSITO';
    } else if (entrega.status === 'EM_TRANSITO') {
      novoStatus = 'ENTREGUE';
    } else {
      throw criarErro(422, 'não é possível avançar o status desta entrega');
    }

    const atualizada = {
      ...entrega,
      status: novoStatus,
      historico: [
        ...entrega.historico,
        {
          data: new Date().toISOString(),
          descricao: `Status alterado para ${novoStatus}`
        }
      ]
    };

    return this.repository.atualizar(atualizada);
  }

  cancelar(id) {
    const entrega = this.buscarPorId(id);

    if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
      throw criarErro(422, 'não é possível cancelar esta entrega');
    }

    const atualizada = {
      ...entrega,
      status: 'CANCELADA',
      historico: [
        ...entrega.historico,
        {
          data: new Date().toISOString(),
          descricao: 'Entrega cancelada'
        }
      ]
    };

    return this.repository.atualizar(atualizada);
  }

  historico(id) {
    return this.buscarPorId(id).historico;
  }
}
