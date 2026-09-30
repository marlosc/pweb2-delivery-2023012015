function criarErro(status, mensagem) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

export class MotoristasService {
  constructor(repository) {
    this.repository = repository;
  }

  criar(dados = {}) {
    const { nome, cpf, placaVeiculo } = dados;

    if (!nome || !cpf) {
      throw criarErro(400, 'nome e cpf são obrigatórios');
    }

    const existente = this.repository.buscarPorCpf(cpf);

    if (existente) {
      throw criarErro(409, 'já existe motorista com este CPF');
    }

    return this.repository.criar({
      nome,
      cpf,
      placaVeiculo: placaVeiculo || null,
      status: 'ATIVO'
    });
  }

  listar() {
    return this.repository.listarTodos();
  }

  buscarPorId(id) {
    const motorista = this.repository.buscarPorId(id);

    if (!motorista) {
      throw criarErro(404, 'motorista não encontrado');
    }

    return motorista;
  }
}
