
# Cosmos - REST API (backend)

<a href="https://docs.nestjs.com/first-steps">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"/>
  </a>

<a href="https://swagger.io/">
    <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white"/>
  </a>

<a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
  </a>

<a href="https://docs.docker.com/">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  </a>

Este é o backend do projeto Cosmos, construído com Node.js, TypeScript e o framework NestJS. O banco de dados é gerenciado com PostgreSQL, e o projeto utiliza Prisma como ORM.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Executando a Aplicação](#executando-a-aplicação)
- [Formatação e Linting de Código](#formatação-e-linting-de-código)
- [Hooks do Git](#hooks-do-git)
- [Documentação da API](#documentação-da-api)
- [Contribuindo](#contribuindo)

## Pré-requisitos

Antes de clonar o repositório, certifique-se de ter o seguinte instalado em sua máquina:

- Node.js (v18.x ou superior)
- npm (v9.x ou superior) ou Yarn (v1.x ou superior)
- PostgreSQL (v13.x ou superior)
- Docker
- Git

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://tools.ages.pucrs.br/cosmos/cosmos-backend.git
   ```

2. **Instale as dependências:**

   Usando npm:

   ```bash
   npm install
   ```

   Ou usando Yarn:

   ```bash
   yarn install
   ```

## Configuração do Ambiente

1. **Crie um arquivo `.env` no diretório raiz** e adicione as seguintes variáveis de ambiente:

   ```bash
   # .env
   DATABASE_URL="postgresql://<usuario>:<senha>@<host>:<porta>/<banco_de_dados>?schema=public"
   ```

   Substitua os placeholders (`<usuario>`, `<senha>`, `<host>`, `<porta>`, e `<banco_de_dados>`) com as credenciais reais do seu banco de dados.

   Quando executar o backend com o docker-compose o host será: ```postgres```

2. **Exemplo de arquivo `.env`:**

   ```bash
   # .env
   DATABASE_URL="postgresql://postgres:cosmos@localhost:5432/cosmos_db?schema=public"
   ```

## Configuração do Banco de Dados

1. **Crie o banco de dados PostgreSQL:**

   Se você ainda não criou o banco de dados, siga estes passos:
   
   - Abra o pgAdmin ou use a linha de comando para criar um novo banco de dados chamado `cosmos_db` (ou o nome de sua preferência).

2. **Execute as migrações do banco de dados:**

   Isto criará as tabelas necessárias no seu banco de dados:

   ```bash
   npx prisma migrate dev
   ```

3. **(Opcional) Popular o banco de dados:**

   Se você tiver dados de seed disponíveis, execute o seguinte comando:

   ```bash
   npx prisma db seed
   ```

## Executando a Aplicação

1. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run start:dev
   ```

   Ou se você estiver usando Yarn:

   ```bash
   yarn start:dev
   ```

   O servidor será iniciado em `http://localhost:3000`.

## Formatação e Linting de Código

1. **Prettier** é utilizado para formatação de código. Você pode formatar seu código executando:

   ```bash
   npm run format
   ```

2. **ESLint** é utilizado para verificar o código TypeScript. Para rodar o ESLint:

   ```bash
   npm run lint
   ```

## Hooks do Git

O Husky está configurado para garantir a qualidade do código antes dos commits:

- **Hook de Pre-commit:** Executa o `lint-staged` para formatar e verificar os arquivos que serão commitados.
  
   Certifique-se de que o Husky está devidamente instalado executando:

   ```bash
   npm run prepare
   ```

## Documentação da API

A documentação da API é gerada automaticamente com o Swagger e está disponível em:

```
http://localhost:3000/api
```

