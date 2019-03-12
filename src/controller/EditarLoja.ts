import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas"


export async function EditaLoja(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    // load a post by a given post id
    const loja = await ListaLojasRepository.update({id: request.params.id}, request.body);

    // if post was not found return 404 to the client
    if (!loja) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded post
    response.send(request.body);
}
