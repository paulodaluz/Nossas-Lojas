import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";


export async function CriaLoja(request: Request, response: Response) {
    
    // get a post repository to perform operations with post
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    // create a real post object from post json object sent over http
    const loja = ListaLojasRepository.create(request.body);
    const erroPadrao = [{
        "errorCode": "400",
        "msg": "Erro ao criar a loja, verifique os dados e tente novamente"
    }]
    //Salva a loja recebida
    await ListaLojasRepository.save(loja);
    if (loja.length == 0) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }
    // retorna a loja criada ao usuário
    response.send(loja);
    console.log("Loja criada com sucesso");
}