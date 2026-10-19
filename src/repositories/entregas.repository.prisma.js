export class EntregasRepositoryPrisma {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async listarTodos(filtros = {}) {
    const where = {};

    if (filtros.status) {
      where.status = filtros.status;
    }

    if (filtros.motoristaId !== undefined) {
      where.motoristaId = filtros.motoristaId;
    }

    return this.prisma.entrega.findMany({
      where,
      include: {
        historico: true
      }
    });
  }

  async buscarPorId(id) {
    return this.prisma.entrega.findUnique({
      where: { id },
      include: {
        historico: true
      }
    });
  }

  async criar(dados) {
    const { historico, ...entrega } = dados;

    return this.prisma.entrega.create({
      data: {
        ...entrega,
        historico: {
          create: historico
        }
      },
      include: {
        historico: true
      }
    });
  }

  async atualizar(id, dados) {
    const { historico, ...entrega } = dados;

    const data = {
      ...entrega
    };

    if (historico) {
      data.historico = {
        deleteMany: {},
        create: historico
      };
    }

    return this.prisma.entrega.update({
      where: { id },
      data,
      include: {
        historico: true
      }
    });
  }
}
