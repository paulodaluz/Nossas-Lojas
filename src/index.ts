import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as swaggerUi from 'swagger-ui-express';
import {AppRoutes} from "./rotas";

//Conectando ao Swagger e guardando em uma váriavel
const swaggerDocument = require('../Documentação/swagger.json');
// Criando uma conexão com o banco de dados
createConnection().then(async connection => {

    // create express e importando a função
    const app = express();
    app.use(bodyParser.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    //Registra todas as conexôes apartir de um forEatch
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    //porta onde está rodando
    app.listen(3000);

    console.log("API do express está funcionando na porta 3000");

}).catch(error => console.log("TypeORM connection error: ", error));
