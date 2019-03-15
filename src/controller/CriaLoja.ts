import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";
import { } from "express-validator"
import { validacao } from "../models/Validacao"

export async function CriaLoja(request: Request, response: Response) {
    
    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Pega a função validacao e os erros que ela retorna e guarda na variavel erros
    var errors = new validacao().validaInformacoes(request);

    //Se tiver erros retorna eles para o usuário
    if (errors) {
        console.log("Erros de validação encontrados");
        response.status(400).json(errors);
        return;
    };

    //Criando uma entidade(tabela no banco) com o que foi recebido no boddy
    const loja = ListaLojasRepository.create(request.body);

    //Salva a loja recebida
    await ListaLojasRepository.save(loja);

    //Retorna a loja criada ao usuário
    response.send(loja);
    console.log("Loja criada com sucesso");
    
}