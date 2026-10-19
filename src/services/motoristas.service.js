function criarErro(status, mensagem) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

export class MotoristasService {
  constructor(motoristasRepository, entregasRepository) {
    this.repository = motoristasRepository;
    this.entregasRepository = entregasRepository;
  }

  async criar(dados = {}) {
    const { nome, cpf, placaVeiculo } = dados;

    if (!nome || !cpf) {
      throw criarErro(400, 'nome e cpf são obrigatórios');
    }

    const existente = await this.repository.buscarPorCpf(cpf);

    if (existente) {
      throw criarErro(409, 'já existe motorista com este CPF');
    }

    return await this.repository.criar({
      nome,
      cpf,
      placaVeiculo: placaVeiculo || null,
      status: 'ATIVO'
    });
  }

  async listar() {
    return await this.repository.listarTodos();
  }

  async buscarPorId(id) {
    const motorista = await this.repository.buscarPorId(id);

    if (!motorista) {
      throw criarErro(404, 'motorista não encontrado');
    }

    return motorista;
  }

  async listarEntregas(id, status) {
    await this.buscarPorId(id);

    const filtros = {
      motoristaId: id
    };

    if (status) {
      filtros.status = status;
    }

    return await this.entregasRepository.listarTodos(filtros);
  }
}
