# API de Gerenciamento de Tarefas (To-Do List)

**Trabalho Final da Disciplina de Automação de Testes na Camada de Serviço (API)**

API de gerenciamento de tarefas com **REST** e **GraphQL**, desenvolvida com **Node.js + Express**, utilizando **Apollo Server** e **JWT** para autenticação, e documentada com **Swagger**.

--- 

Inclui testes automatizados com **Mocha, Chai, Supertest e Sinon**.
## Pré-requisitos

- Node.js >= 18
- npm
- Git
## 1. Clonar o repositório

Para clonar o repositório:
```
git clone https://github.com/Sponkiado/api-trabalho-final.git
```

## 2. Instalar dependências

Acesse a pasta:
```
cd api-trabalho-final
```
Execute o comando abaixo para instalar todas as dependências do projeto:
```
npm install
```
Dependências principais:
- express
- swagger-ui-express
- swagger-jsdoc
- jsonwebtoken
- apollo-server-express
- graphql

Dependências de desenvolvimento:
- mocha
- chai
- supertest
- sinon
## 3. Rodar a API localmente

Para iniciar a API:
```
node server.js
```
A API estará disponível em:

- Swagger: http://localhost:4000/api-docs
- GraphQL Playground: http://localhost:4000/graphql

No Swagger, você pode testar os endpoints **register**, **login** e **tarefas**.  
Para rotas de tarefas, é necessário **informar o token JWT** retornado pelo login no botão "Authorize".
## 4. Rodar os testes

Os testes automatizados estão organizados em **External** (integração) e **Controller** (unitários).

### Testes External (Integração)
- Cobrem endpoints **REST** e **GraphQL**  
- Rodam usando **Supertest, Mocha e Chai**  

### Testes Controller
- Unitários usando **Sinon**  

Você pode rodar todos os testes, apenas os External ou apenas os Controller, conforme desejar.

### Executar todos os testes
```
npm run test
```
### Executar apenas testes External (REST)
```
npm run test.external
```
### Executar apenas testes Controller
```
npm run test.controller
```
