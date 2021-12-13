<h1 align="center">Api Smart Ranking</h1>

<p align=center>
  Api para ajudar no gerenciamento de rankings de jogadores tênis, usando uma arquitetura de microservices
</p>

[![GitHub](https://badgen.net/badge/icon/github?icon=github&label)](https://github.com/isaiasiotti18)
[![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/)
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
[![Minimum node.js version](https://badgen.net/npm/node/express)](https://npmjs.com/package/express)
[![GitHub license](https://img.shields.io/github/license/isaiasiotti18/microservices-smartranking)](https://github.com/isaiasiotti18/microservices-smartranking/blob/master/LICENSE.md)

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
<p>Será necessário algumas configurações: </p>
- Variáveis de ambiente
- Console 

