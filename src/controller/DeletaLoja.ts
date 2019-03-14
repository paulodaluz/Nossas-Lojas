import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas";
import { MensagemPadrao } from "../models/MensagemPadrao";


export async function DeletaLoja(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Acha a loja no banco e guarda na variavel loja
    const loja = await ListaLojasRepository.findOne(request.params.id);

    //Se loja não for encontrada irá retornar o erro padrão ao usuário
    if (!loja) {
        response.status(404).json(new MensagemPadrao("400", "Não foi possivel deletar a loja, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }
    //Deleta loja e retorna uma mensagem de sucesso ao usuário
    await ListaLojasRepository.delete({ id: request.params.id });
    response.send("Loja Deletada com Sucesso");
    
}
