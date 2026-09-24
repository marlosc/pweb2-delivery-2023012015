export class EntregasRepository {
  constructor(database) {
    this.database = database;
  }

  criar(dados) {
    const entrega = {
      id: this.database.proximoIdEntrega++,
      ...dados
    };

    this.database.entregas.push(entrega);
    return entrega;
  }

  listar() {
    return this.database.entregas;
  }

  buscarPorId(id) {
    return this.database.entregas.find((entrega) => entrega.id === id) || null;
  }

  atualizar(entregaAtualizada) {
    const indice = this.database.entregas.findIndex(
      (entrega) => entrega.id === entregaAtualizada.id
    );

    if (indice === -1) {
      return null;
    }

    this.database.entregas[indice] = entregaAtualizada;
    return entregaAtualizada;
  }
}
