<h1 align="center">Api Smart Ranking</h1>

<p align=center>
  Api para ajudar no gerenciamento de rankings de jogadores tênis, usando uma arquitetura de microservices
</p>

[![GitHub](https://badgen.net/badge/icon/github?icon=github&label)](https://github.com/isaiasiotti18)
[![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/)
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
[![Minimum node.js version](https://badgen.net/npm/node/express)](https://npmjs.com/package/express)
[![GitHub license](https://img.shields.io/github/license/isaiasiotti18/microservices-smartranking)](https://github.com/isaiasiotti18/microservices-smartranking/blob/master/LICENSE.md)

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.Js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [NestJs](https://www.nestjs.com/)
- [Cloud MongoDB](https://cloud.mongodb.com/)
- [Amazon Web Services](aws.amazon.com)
  - EC2
  - Cognito
  - S3 Bucket
- [AWS Bitnami](https://aws.bitnami.com/)
- RabbitMQ](https://www.rabbitmq.com/)
- [SAP Cloud Platform](https://www.sap.com/brazil/products/cloud-platform.html)
- [Gitlab para CI](https://www.gitlab.com)

### Features

- [x] Usuários
  - Criar novos usuários
  - Consultar
    - Todos os usuários
    - Por Id
  - Atualização
  - Exclusão
- [x] Categorias (Cada usuário possui sua categoris/nível)
  - Criação de novas categorias
  - Consultar
    - Todas as categorias
    - Por Id
  - Atualização
  - Exclusão
- [x] Desafios
  - Consultar todos os desafios
  - Consulta de desafios realizados
    - Por data
    - Por categoria
    - Atualização do Status do desafio
    - Exclusão
- [x] Partidas
  - Toda partida é criada dentro de desafios
- [x] Rankings
  - Processar partida
  - Consultar Rankings

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Primeiro faça um clone desse repositório
$ git clone <https://github.com/isaiasiotti18/microservices-smartranking>

# Acesse cada pasta do projeto
- api-gateway
- micro-admin-backend
- micro-desafios
- micro-notificacoes
- micro-rankings
  
# Rode o npm install para instalar todas as dependências necessárias
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:8080 - acesse <http://localhost:8080> 
```

### Aviso importante!
#### Será necessário algumas configurações:

#### Variáveis de ambiente, cada micro possui suas variaveis, porém são quase tudo iguais, só no api-gateway que possui mais
- **Api-gateway**
  - AWS_S3_BUCKET_NAME
  - AWS_REGION
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - COGNITO_USER_POOL_ID
  - COGNITO_CLIENT_ID
  - RABBITMQ_USER
  - RABBITMQ_PASSWORD
  - RABBITMQ_URL
- **Os demais microservices**
  - RABBITMQ_USER
  - RABBITMQ_PASSWORD
  - RABBITMQ_URL

#### Também será preciso configurar os serviços na Aws
  - IAM
  - EC2 (Criar a virtual machine com o Rabbitmq usando a Bitnami)
  - S3
  - Cognito
  
#### O Deploy da Api
  - SAP Cloud platform
  - CI com Gitlab

### Autor

Github - [isaiasiotti18](https://www.github.com/isaiasiotti)
Linkedin - [Isaias Santos](https://www.linkedin.com/in/isaiasiotti)

### Feito com <3 por mim, Entre em contato!

[MIT licensed](LICENSE).