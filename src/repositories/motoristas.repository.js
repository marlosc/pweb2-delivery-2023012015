/**
 * Contrato do repository de motoristas.
 *
 * Métodos esperados:
 * - listarTodos() -> Motorista[]
 * - buscarPorId(id) -> Motorista | null
 * - buscarPorCpf(cpf) -> Motorista | null
 * - criar(dados) -> Motorista
 *
 * O Service deve utilizar apenas estes métodos.
 */
export class MotoristasRepository {
  constructor(database) {
    this.database = database;
  }

  listarTodos() {
    return this.database.motoristas;
  }

  buscarPorId(id) {
    return this.database.motoristas.find(
      (motorista) => motorista.id === id
    ) || null;
  }

  buscarPorCpf(cpf) {
    return this.database.motoristas.find(
      (motorista) => motorista.cpf === cpf
    ) || null;
  }

  criar(dados) {
    const motorista = {
      id: this.database.proximoIdMotorista++,
      ...dados
    };

    this.database.motoristas.push(motorista);

    return motorista;
  }
}
