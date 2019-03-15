import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";
import { MensagemPadrao } from "../models/MensagemPadrao";

export async function ListarTodas(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const postRepository = getManager().getRepository(ListaLojas);

    //Encontra todas as lojas e guarda na variavel loja
    const loja = await postRepository.find();

    //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
    if (!loja.length) {
        response.status(204).json(new MensagemPadrao("204", "Nenhuma loja foi encontrada, verifique os dados e tente novamente."));
        response.end();
        return;
    }
    //Retorna as lojas para o usuário
    response.send(loja);
}