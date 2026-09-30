/**
 * Contrato esperado para o repository de entregas:
 *
 * listarTodos(filtros?) -> Entrega[]
 * buscarPorId(id) -> Entrega | null
 * criar(dados) -> Entrega
 * atualizar(id, dados) -> Entrega | null
 */
export class EntregasRepository {
  constructor(database) {
    this.database = database;
  }

  listarTodos(filtros = {}) {
    let entregas = this.database.entregas;

    if (filtros.status) {
      entregas = entregas.filter(
        (entrega) => entrega.status === filtros.status
      );
    }

    if (filtros.motoristaId !== undefined) {
      entregas = entregas.filter(
        (entrega) => entrega.motoristaId === filtros.motoristaId
      );
    }

    return entregas;
  }

  buscarPorId(id) {
    return this.database.entregas.find(
      (entrega) => entrega.id === id
    ) || null;
  }

  criar(dados) {
    const entrega = {
      id: this.database.proximoIdEntrega++,
      ...dados
    };

    this.database.entregas.push(entrega);
    return entrega;
  }

  atualizar(id, dados) {
    const indice = this.database.entregas.findIndex(
      (entrega) => entrega.id === id
    );

    if (indice === -1) {
      return null;
    }

    const atualizada = {
      ...this.database.entregas[indice],
      ...dados
    };

    this.database.entregas[indice] = atualizada;
    return atualizada;
  }
}
