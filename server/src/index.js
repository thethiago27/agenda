const express = require("express");
const bodyParser = require('body-parser');
const http = require("http");
const mongo = require("./database/mongodb");
const router = require("./routes/router");
const cors = require('cors')

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(router);

server.listen(8750, () => {
    console.log("Servidor rodando na porta 3000");
})