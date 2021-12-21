## Agenda.do

Conclusão do teste solicitado, para aprovação no processo seletivo.

## Tencnologias utilizadas

### Front-end

- [ ] [NextJs](https://nextjs.org/)
- [ ] [Typescript](https://www.typescriptlang.org/)
- [ ] [React](https://reactjs.org/)

### Back-end

- [ ] [NodeJs](https://nodejs.org/)
- [ ] [Express](https://expressjs.com/)
- [ ] [MongoDB](https://www.mongodb.com/)


## Instalação

Front End
```bash
    git clone 
    yarn install
    yarn build
    yarn start
```
Back End
```bash
    git clone 
    npm install
    npm start
```

MongoDB

Para configurar o banco de dados, é necessário instalar o mongoDB.
Acesse o arquivo `.env` e configure o banco de dados.

É necessario criar 2 collections: `contacts` e `users`.

## API REST

- [POST] /contact: Cadastro de contato
  Body da requisição:
```json
{
    "name": "Nome do contato",
    "email": "",
    "phone": "",
    "birthday": "",
    "city": "",
    "state": "",
    "neighborhood": "",
    "image": ""
}
```
- [GET] /contact: Lista de contatos
- [GET] /contact/:id: Busca de contato por id
- [PUT] /contact/:id: Atualização de contato
- [DELETE] /contact/:id: Exclusão de contato

