import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";
import { } from "express-validator"


export async function CriaLoja(request: Request, response: Response) {
    
    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    request.assert("nome_loja", "Nome da loja é obrigatório.").notEmpty();
    request.assert("endereco", "Endereço da loja é obrigatório.").notEmpty().isLength({ min: 5 });
    request.assert("celular", "Telefone/Celular da loja é obrigatório e deve ter no minimo 10 caracteres e no máximo 12.").notEmpty().isLength({ min: 10, max: 12 });
    request.assert("cnpj", "CNPJ da loja é obrigatório e deve conter 18 caracteres, incluindo (´.´ e ´-´).").notEmpty().isLength({ min: 18, max: 18 });
    request.assert("horarioDeTrabalho", "Horário de trabalho é obrigatório").notEmpty();
    request.assert("cidade", "Cidade é obrigatória.").notEmpty().isLength({ min: 3});
    request.assert("estado", "Estado é obrigatório e deve ter 2 caracteres").notEmpty().isLength({ min: 2, max: 2 });

    var errors = request.validationErrors();

    if (errors) {
        console.log("Erros de validação encontrados");
        response.status(400).json(errors);
        return;
    }

    //Criando uma entidade(tabela no banco) com o que foi recebido no boddy
    const loja = ListaLojasRepository.create(request.body);

    //Salva a loja recebida
    await ListaLojasRepository.save(loja);

    //Retorna a loja criada ao usuário
    response.send(loja);
    console.log("Loja criada com sucesso");
    
}