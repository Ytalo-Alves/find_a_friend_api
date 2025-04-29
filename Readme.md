# Find a Friend API

API para conectar ONGs e pessoas interessadas em adotar pets. Permite cadastro e autenticação de ONGs, cadastro e busca de pets, além de busca de ONGs próximas.

## Tecnologias do projeto
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="24"/> Node.js
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="24"/> TypeScript
- ⚡ Fastify
- <img src="https://raw.githubusercontent.com/prisma/prisma/master/docs/static/favicon.png" width="24"/> Prisma ORM
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="24"/> PostgreSQL
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="24"/> Docker
- 🧪 Vitest (testes)

## Pré-requisitos
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/find_a_friend_api.git
   cd find_a_friend_api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Rodando o projeto
1. Suba o banco de dados com Docker Compose:
   ```bash
   docker-compose up -d
   ```
2. Configure as variáveis de ambiente conforme necessário (exemplo em `src/env/index.ts`).
3. Rode as migrations do banco:
   ```bash
   npx prisma migrate deploy
   ```
4. Inicie a aplicação:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3333` (ou porta configurada).

## Rodando os testes
```bash
npm run test
```

## Licença
Este projeto está sob a licença MIT.
