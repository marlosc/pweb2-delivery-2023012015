# Delivery Tracker

Projeto desenvolvido na disciplina de Programação Web II — IFAL/Maceió.

A API foi construída utilizando arquitetura em camadas, Repository Pattern, injeção de dependência e, atualmente, persistência com Prisma ORM e SQLite.

## Estrutura do projeto

```text
src/
├── controllers/
├── services/
├── repositories/
├── config/
├── routes/
└── utils/

prisma/
├── schema.prisma
└── migrations/
```

A organização principal segue:

```text
Routes
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Persistência
```

As regras de negócio permanecem na camada de Service.

---

## Atividade 05 — Entregas

Nesta etapa foi implementada a API de entregas utilizando arquitetura em camadas.

### Executando o projeto

```bash
npm install
npm start
```

A API será executada em:

```text
http://localhost:3000
```

Para executar o autograder, com o servidor em execução:

```bash
npm run check
```

### Rotas de entregas

Criar uma entrega:

```http
POST /api/entregas
```

Listar entregas:

```http
GET /api/entregas
```

Buscar uma entrega pelo ID:

```http
GET /api/entregas/:id
```

Avançar o status:

```http
PATCH /api/entregas/:id/avancar
```

Cancelar uma entrega:

```http
PATCH /api/entregas/:id/cancelar
```

Consultar o histórico:

```http
GET /api/entregas/:id/historico
```

Filtrar por status:

```http
GET /api/entregas?status=CRIADA
```

O ciclo de status utilizado é:

```text
CRIADA → EM_TRANSITO → ENTREGUE
```

Uma entrega também pode assumir o status `CANCELADA`.

---

## Atividade 06 — Motoristas, Repository e DI

Nesta etapa foram adicionados os motoristas, a atribuição de motorista às entregas e a composição das dependências com os repositories.

### Rotas de motoristas

Cadastrar motorista:

```http
POST /api/motoristas
```

Listar motoristas:

```http
GET /api/motoristas
```

Buscar motorista por ID:

```http
GET /api/motoristas/:id
```

Listar entregas de um motorista:

```http
GET /api/motoristas/:id/entregas
```

Filtrar entregas do motorista por status:

```http
GET /api/motoristas/:id/entregas?status=CRIADA
```

Atribuir motorista a uma entrega:

```http
PATCH /api/entregas/:id/atribuir
```

Corpo da requisição:

```json
{
  "motoristaId": 1
}
```

### Composição das dependências

```text
EntregasRepository
MotoristasRepository
        ↓
EntregasService
MotoristasService
        ↓
EntregasController
MotoristasController
```

A composição das dependências é realizada em `src/routes/index.js`.

Os Services recebem os repositories pelo construtor e não criam repositories diretamente.

---

## Atividade 07 — Persistência com Prisma e SQLite

Nesta etapa, a persistência em memória foi substituída por Prisma ORM com SQLite, mantendo o mesmo comportamento da API.

As regras de negócio continuam nos Services e os Controllers continuam responsáveis pela comunicação HTTP.

A principal mudança foi na camada de persistência:

```text
Antes:

Service
  ↓
Repository em memória
  ↓
Array

Agora:

Service
  ↓
Repository Prisma
  ↓
Prisma Client
  ↓
SQLite
```

### Configuração

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

O arquivo deve conter:

```env
DATABASE_URL="file:./dev.db"
```

### Instalação

```bash
npm install
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Aplique as migrations:

```bash
npx prisma migrate deploy
```

Para desenvolvimento e criação de novas migrations:

```bash
npx prisma migrate dev
```

### Executando

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

O health check pode ser acessado em:

```text
http://localhost:3000/api/health
```

### Autograder

Com o servidor em execução:

```bash
npm run check
```

A meta de conformidade da API é:

```text
122/122
```

### Prisma Studio

Para visualizar os dados armazenados no banco:

```bash
npx prisma studio
```

### Persistência

As entidades `Entrega`, `Motorista` e `Evento` são armazenadas em SQLite através do Prisma.

```text
Controller
    ↓
Service
    ↓
Repository Prisma
    ↓
Prisma Client
    ↓
SQLite
```

Os dados continuam armazenados mesmo após o servidor ser reiniciado.

O arquivo do banco (`dev.db`) e o arquivo `.env` não são versionados no Git.
