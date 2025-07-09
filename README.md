# NLW Agents

Projeto desenvolvido durante o evento NLW da [Rocketseat](https://rocketseat.com.br/), com foco em backend Node.js, Fastify e banco de dados PostgreSQL utilizando Drizzle ORM.

## Tecnologias & Bibliotecas

- **Node.js** 22
- **Fastify**: Framework web rápido para Node.js
- **Zod**: Validação de esquemas e tipos
- **drizzle-orm**: ORM moderno para TypeScript/Node.js
- **drizzle-seed**: Seed de dados para Drizzle ORM
- **drizzle-kit**: Migrations e gerenciamento de schema
- **postgres**: Cliente PostgreSQL para Node.js
- **@fastify/cors**: Middleware CORS para Fastify
- **biome**: Linter e formatter
- **typescript**: Tipagem estática

## Padrões de Projeto

- **Modularização**: Separação clara entre rotas HTTP, conexão com banco, schemas e seeds.
- **Type-safe**: Uso extensivo de TypeScript e Zod para validação e tipagem.
- **Migrations versionadas**: Gerenciamento de schema via Drizzle Kit.
- **Variáveis de ambiente**: Configuração centralizada em `.env` e validada via Zod.

## Estrutura de Pastas

```
src/
  env.ts                # Validação das variáveis de ambiente
  server.ts             # Inicialização do servidor Fastify
  db/
    connection.ts       # Conexão com banco de dados
    seed.ts             # Seed de dados fake
    migrations/         # Migrations SQL e metadados
    schema/             # Schemas do banco (Drizzle)
  http/
    routes/             # Rotas HTTP (ex: get-rooms)
```

## Setup do Projeto

1. **Clone o repositório e instale as dependências:**

   ```sh
   npm install
   ```

2. **Configure o arquivo `.env`:**

   - Use o exemplo em `.env.example` e ajuste as variáveis conforme seu ambiente.

3. **Configure o banco de dados:**

   - Crie um banco PostgreSQL e configure a variável `DATABASE_URL` no `.env`.
   - Execute a extensão `vector` se necessário:
     ```sh
     psql <docker/setup_db.sql
     ```

4. **Rode as migrations (Drizzle Kit):**

   ```sh
   npx drizzle-kit push
   ```

5. **Popule o banco com dados fake:**

   ```sh
   npm run db:seed
   ```

6. **Inicie o servidor:**

   ```sh
   npm run dev
   ```

7. **Testes rápidos via HTTP:**
   - Use o arquivo [`client.http`](client.http) para testar rotas no VSCode ou REST Client.

## Scripts Úteis

- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run db:seed` — Popula o banco com dados fake
- `npm run format` — Formata o código com Biome
- `npm run check` — Lint do código

---

Desenvolvido durante o NLW da
