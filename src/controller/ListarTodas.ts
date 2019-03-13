import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";

/**
 * Loads all posts from the database.
 */
export async function ListarTodas(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(ListaLojas);

    // load a post by a given post id
    const loja = await postRepository.find();

    const erroPadrao = [{
        "errorCode": "400",
        "msg": "Nenhuma loja cadastrada até o momento."
    }]
    // if post was not found return 404 to the client
    if (loja.length == 0) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }
    // return loaded posts
    response.send(loja);
}