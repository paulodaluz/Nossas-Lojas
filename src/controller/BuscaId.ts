import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas"
import { MensagemPadrao } from "../models/MensagemPadrao"

export async function BuscaId(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Procurando no banco de dados e guardando dentro da variavel
    const loja = await ListaLojasRepository.findOne(request.params.id);

     //Caso ocorra algum erro irá retornar o erro padrão para o usuário
    if (!loja) {
        response.status(200).json(new MensagemPadrao("204", "Nenhuma loja foi encontrada, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }

    //retorna a loja com o id correspondente
    response.send(loja);
}
