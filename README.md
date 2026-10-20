## Atividade 07 — Persistência com Prisma e SQLite

Nesta etapa, a persistência em memória foi substituída por Prisma ORM com SQLite, mantendo o mesmo comportamento da API.

### Configuração

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

O arquivo deve conter:

```env
DATABASE_URL="file:./dev.db"
```

### Instalação e banco de dados

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

Para ambiente de desenvolvimento e criação de novas migrations:

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

Para executar o autograder:

```bash
npm run check
```

Para visualizar os dados do banco:

```bash
npx prisma studio
```

### Persistência

As entidades `Entrega`, `Motorista` e `Evento` são armazenadas em SQLite através do Prisma.

A camada de Service continua responsável pelas regras de negócio, enquanto os repositories Prisma são responsáveis pelo acesso ao banco.

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

Os dados permanecem armazenados mesmo após o servidor ser reiniciado.
