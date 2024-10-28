## Projeto CRUD Back-End

Este é o back-end de um projeto CRUD (Create, Read, Update, Delete) desenvolvido em Node.js, Express e MongoDB. Ele fornece uma API para gerenciar informações sobre produtos. Abaixo estão as principais funcionalidades e instruções para usar e configurar o projeto.

# Funcionalidades
Instalação de Dependências:

Execute npm install para instalar todas as dependências necessárias.
Configuração do Banco de Dados:

Configure as variáveis de ambiente DB_USER e DB_PASS no arquivo .env com suas credenciais do MongoDB Atlas.
Execução:

Execute npm start para iniciar o servidor. O aplicativo estará acessível em http://localhost:3000 por padrão.
Endpoints
GET /: Rota inicial que retorna uma mensagem indicando que é a API do projeto.

POST /doc: Adiciona um novo produto ao banco de dados.

GET /items: Retorna todos os produtos no banco de dados.

PUT /items/:id: Atualiza as informações de um produto com base no ID.

DELETE /items/:id: Remove um produto com base no ID.

Configuração do MongoDB Atlas
Certifique-se de configurar corretamente a URI do MongoDB Atlas no arquivo index.js para estabelecer a conexão com o banco de dados.

Dependências Principais
Express: Framework web para Node.js.
Mongoose: ODM (Object Data Modeling) para MongoDB.
Cors: Middleware para permitir solicitações de diferentes origens.

## Repositório Frontend:
>https://github.com/jotaMch/CRUD-Front-REACT
