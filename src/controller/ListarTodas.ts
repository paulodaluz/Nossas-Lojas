import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";


export async function ListarTodas(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(ListaLojas);

    // load a post by a given post id
    const loja = await postRepository.find();

    const erroPadrao = [{
        "errorCode": "200",
        "msg": "Nenhuma loja cadastrada até o momento."
    }]
    //se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
    if (loja.length == 0) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }
    //Retorna as lojas para o usuário
    response.send(loja);
}