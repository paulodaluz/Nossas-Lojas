import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas";
import { MensagemPadrao } from "../models/MensagemPadrao";

export async function EditaLoja(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Encontra a loja e guarda ela na variavel loja
    const loja = await ListaLojasRepository.findOne(request.params.id);
    //Atualiza loja
    await ListaLojasRepository.update({ id: request.params.id }, request.body);

    //Se loja não for encontrada irá retornar o erro padrão ao usuário
    if (!loja) {
        response.status(404).json(new MensagemPadrao("400", "Não foi possivel editar a loja, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }

    //Retorna a loja atualizada para o usuário
    response.send(request.body);
    console.log("Loja atualizada com sucesso");
}
