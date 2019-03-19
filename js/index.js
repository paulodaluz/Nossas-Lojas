"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const rotas_1 = require("./rotas");
//Conectando ao Express para fazer a validação mais pra frente
var expressValidator = require('express-validator');
//Conectando ao Swagger e guardando em uma váriavel
const swaggerDocument = require('../Documentacao/swagger.json');
//Criando uma conexão com o banco de dados
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    //Criando o express e importando a função
    //Usando o body parser
    //Usando o Swagger na url, abrindo o arquivo...
    //Validando as informações para criar a loja
    const app = express();
    app.use(bodyParser.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(expressValidator());
    //Registra todas as conexôes apartir de um forEatch
    rotas_1.AppRoutes.forEach(route => {
        app[route.method](route.path, (request, response, next) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });
    //porta onde está rodando a aplicação
    app.listen(3000);
    console.log();
    console.log("A API do express está funcionando na porta 3000");
    //Diz para a pessoa que a página não existe quando entra em uma pagina inexistente
    app.use((req, res) => {
        res.status(404).json({ errorCode: 404, msg: 'Pagina não encontrada!' });
    });
})).catch(error => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=index.js.map