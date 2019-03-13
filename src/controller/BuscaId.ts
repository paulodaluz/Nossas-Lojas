import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas"


export async function BuscaId(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Procurando no banco de dados e guardando dentro da variavel
    const loja = await ListaLojasRepository.findOne(request.params.id);

    const erroPadrao = [{
        "errorCode": "400",
        "msg": "Erro na requisição, loja inexistente, verifique os dados e tente novamente."
    }]
     //Caso ocorra algum erro irá retornar o erro padrão para o usuário
    if (!loja) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }

    //retorna a loja com o id correspondente
    response.send(loja);
}
