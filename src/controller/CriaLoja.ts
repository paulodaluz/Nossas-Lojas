import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";


export async function CriaLoja(request: Request, response: Response) {
    
    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Criando uma entidade(tabela no banco) com o que foi recebido no boddy
    const loja = ListaLojasRepository.create(request.body);

    //Salva a loja recebida
    await ListaLojasRepository.save(loja);

    //Retorna a loja criada ao usuário
    response.send(loja);
    console.log("Loja criada com sucesso");
    
}