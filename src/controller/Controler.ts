import { Request, Response } from "express";
import { getManager, In } from "typeorm";
import { ListaLojas } from "../entity/ListaLojas";
import { } from "express-validator";
import { MensagemPadrao } from "../models/MensagemPadrao";
import { validacao } from "../models/Validacao";


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

};


export async function EditaLoja(request: Request, response: Response) {

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

    //Encontra a loja e guarda ela na variavel loja
    const loja = await ListaLojasRepository.findOne(request.params.id);
    //Atualiza loja
    await ListaLojasRepository.update({ id: request.params.id }, request.body);

    //Se loja não for encontrada irá retornar o erro padrão ao usuário
    if (!loja) {
        response.status(404).json(new MensagemPadrao("404", "Não foi possivel editar a loja, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }

    //Retorna a loja atualizada para o usuário
    response.send(request.body);
    console.log("Loja atualizada com sucesso");
};


export async function DeletaLoja(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Acha a loja no banco e guarda na variavel loja
    const loja = await ListaLojasRepository.findOne(request.params.id);

    //Se loja não for encontrada irá retornar o erro padrão ao usuário
    if (!loja) {
        response.status(404).json(new MensagemPadrao("404", "Não foi possivel deletar a loja, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }
    //Deleta loja e retorna uma mensagem de sucesso ao usuário
    await ListaLojasRepository.delete({ id: request.params.id });
    response.send("Loja Deletada com Sucesso");

};


export async function BuscaPorId(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Procurando no banco de dados e guardando dentro da variavel
    const loja = await ListaLojasRepository.findOne(request.params.id);

    //Caso ocorra algum erro irá retornar o erro padrão para o usuário
    if (!loja) {
        response.status(404).json(new MensagemPadrao("404", "Nenhuma loja foi encontrada, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }

    //retorna a loja com o id correspondente
    response.send(loja);
};


export async function BuscaPorEstado(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Procurando no banco de dados e guardando dentro da variavel
    const loja = await ListaLojasRepository.find({
        where: {
            estado: request.params.estado
        }
    });

    //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
    if (!loja.length) {
        response.status(404).json(new MensagemPadrao("404", "Nenhuma loja foi encontrada, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }

    //Retorna as lojas do estado solicitado ao usuário
    response.send(loja);
};


export async function BuscaPorCidades(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    //Procurando no banco de dados e guardando dentro da variavel
    const loja = await ListaLojasRepository.find({
        where: [
            //Pega o estado na URL e as cidades no Body
            {estado: request.params.estado, cidade: In(request.body.cidades) }
        ]
    });

    //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
    if (!loja.length) {
        response.status(404).json(new MensagemPadrao("404", "Nenhuma loja foi encontrada, verifique os dados e tente novamente.").erroRetorno());
        response.end();
        return;
    }

    // Retorna as lojas ao usuário
    response.send(loja);
};


export async function ListarTodas(request: Request, response: Response) {

    //Cria uma conexão com o banco
    const postRepository = getManager().getRepository(ListaLojas);

    //Encontra todas as lojas e guarda na variavel loja
    const loja = await postRepository.find();

    //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
    if (!loja.length) {
        response.status(404).json(new MensagemPadrao("404", "Nenhuma loja foi encontrada, verifique os dados e tente novamente."));
        response.end();
        return;
    }
    //Retorna as lojas para o usuário
    response.send(loja);
};


export async function Redireciona(request: Request, response: Response) {
    response.redirect(301, '/api-docs')

};