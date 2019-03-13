import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";


export async function CriaLoja(request: Request, response: Response) {
    
    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Criando uma entidade(tipo uma tabela no banco) com o que foi recebido no boddy
    const loja = ListaLojasRepository.create(request.body);
    const erroPadrao = [{
        "errorCode": "400",
        "msg": "Erro ao criar a loja, verifique os dados e tente novamente"
    }]
    //Salva a loja recebida
    await ListaLojasRepository.save(loja);

    if (loja.length == 0) {
        response.status(404).json(erroPadrao);
        response.end();
        return;
    }
    //Retorna a loja criada ao usuário
    response.send(loja);
    console.log("Loja criada com sucesso");
}