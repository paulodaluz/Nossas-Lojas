import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas"


export async function EditaLoja(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Encontra a loja e guarda ela na variavel loja
    const loja = await ListaLojasRepository.findOne(request.params.id);
    //Atualiza loja
    await ListaLojasRepository.update({ id: request.params.id }, request.body);

    const erroPadrao = [{
        "errorCode": "400",
        "msg": "Erro na requisição, loja inexistente, verifique os dados e tente novamente."
    }]
    //Se loja não for encontrada irá retornar o erro padrão ao usuário
    if (!loja) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }

    //Retorna a loja atualizada para o usuário
    response.send(request.body);
    console.log("Loja atualizada com sucesso");
}
