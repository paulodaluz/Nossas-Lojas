import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";


export async function ListarTodas(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const postRepository = getManager().getRepository(ListaLojas);

    //Encontra todas as lojas e guarda na variavel loja
    const loja = await postRepository.find();

    const erroPadrao = [{
        "errorCode": "200",
        "msg": "Nenhuma loja cadastrada até o momento."
    }]
    //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
    if (!loja.length) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }
    //Retorna as lojas para o usuário
    response.send(loja);
}