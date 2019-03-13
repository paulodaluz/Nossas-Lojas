import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas"


export async function DeletaLoja(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    // load a post by a given post id
    const loja = await ListaLojasRepository.findOne(request.params.id);

    const erroPadrao = [{
        "errorCode": "400",
        "msg": "Erro na requisição, loja inexistente, verifique o ID e tente novamente."
    }]
    //Se loja não for encontrada irá retornar o erro padrão ao usuário
    if (!loja) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }
    //Deleta loja e retorna uma mensagem de sucesso ao usuário
    await ListaLojasRepository.delete({ id: request.params.id });
    response.send("Loja Deletada com Sucesso");
    
}
