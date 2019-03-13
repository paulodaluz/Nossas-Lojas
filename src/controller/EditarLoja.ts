import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas"


export async function EditaLoja(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    // load a post by a given post id
    const loja = await ListaLojasRepository.findOne(request.params.id);
    await ListaLojasRepository.update({ id: request.params.id }, request.body);

    const erroPadrao = [{
        "errorCode": "400",
        "msg": "Erro na requisição, loja inexistente, verifique os dados e tente novamente."
    }]
    // if post was not found return 404 to the client
    if (!loja) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }

    // return loaded post
    response.send(request.body);
    console.log("Loja atualizada com sucesso");
}
