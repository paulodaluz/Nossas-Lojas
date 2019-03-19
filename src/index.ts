import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as swaggerUi from 'swagger-ui-express';
import {AppRoutes} from "./rotas";


//Conectando ao Express para fazer a validação mais pra frente
var expressValidator = require('express-validator');

//Conectando ao Swagger e guardando em uma váriavel
const swaggerDocument = require('../Documentacao/swagger.json');

//Criando uma conexão com o banco de dados
createConnection().then(async connection => {

    //Criando o express e importando a função
    //Usando o body parser
    //Usando o Swagger na url, abrindo o arquivo...
    //Validando as informações para criar a loja
    const app = express();
    app.use(bodyParser.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(expressValidator());
    
    //Registra todas as conexôes apartir de um forEatch
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
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

}).catch(error => console.log("TypeORM connection error: ", error));
