import { Request } from "express";
import { } from "express-validator";

export class validacao {

    validaInformacoes(request: Request) {

    request.assert("nome_loja", "Nome da loja é obrigatório.").notEmpty();
    request.assert("endereco", "Endereço da loja é obrigatório.").notEmpty().isLength({ min: 5 });
    request.assert("celular", "Telefone/Celular da loja é obrigatório e deve ter no minimo 10 caracteres e no máximo 12.").notEmpty().isLength({ min: 10, max: 12 });
    request.assert("cnpj", "CNPJ da loja é obrigatório e deve conter 18 caracteres, incluindo (´.´ e ´-´).").notEmpty().isLength({ min: 18, max: 18 });
    request.assert("horarioDeTrabalho", "Horário de trabalho é obrigatório").notEmpty();
    request.assert("cidade", "Cidade é obrigatória.").notEmpty().isLength({ min: 3 });
    request.assert("estado", "Estado é obrigatório e deve ter 2 caracteres").notEmpty().isLength({ min: 1, max: 2 });

    var erros = request.validationErrors();

    if(erros) {
        return erros;
    }

    return null
    }
}