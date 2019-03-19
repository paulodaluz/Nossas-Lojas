"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ListaLojas_1 = require("../entity/ListaLojas");
const MensagemPadrao_1 = require("../models/MensagemPadrao");
const Validacao_1 = require("../models/Validacao");
function CriaLoja(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //Cria uma conexão com o banco
        const ListaLojasRepository = typeorm_1.getManager().getRepository(ListaLojas_1.ListaLojas);
        //Pega a função validacao e os erros que ela retorna e guarda na variavel erros
        var errors = new Validacao_1.validacao().validaInformacoes(request);
        //Se tiver erros retorna eles para o usuário
        if (errors) {
            console.log("Erros de validação encontrados");
            response.status(400).json(errors);
            return;
        }
        ;
        //Criando uma entidade(tabela no banco) com o que foi recebido no boddy
        const loja = ListaLojasRepository.create(request.body);
        //Salva a loja recebida
        yield ListaLojasRepository.save(loja);
        //Retorna a loja criada ao usuário
        response.send(loja);
        console.log("Loja criada com sucesso");
    });
}
exports.CriaLoja = CriaLoja;
;
function EditaLoja(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //Cria uma conexão com o banco
        const ListaLojasRepository = typeorm_1.getManager().getRepository(ListaLojas_1.ListaLojas);
        //Pega a função validacao e os erros que ela retorna e guarda na variavel erros
        var errors = new Validacao_1.validacao().validaInformacoes(request);
        //Se tiver erros retorna eles para o usuário
        if (errors) {
            console.log("Erros de validação encontrados");
            response.status(400).json(errors);
            return;
        }
        ;
        //Encontra a loja e guarda ela na variavel loja
        const loja = yield ListaLojasRepository.findOne(request.params.id);
        //Atualiza loja
        yield ListaLojasRepository.update({ id: request.params.id }, request.body);
        //Se loja não for encontrada irá retornar o erro padrão ao usuário
        if (!loja) {
            response.status(404).json(new MensagemPadrao_1.MensagemPadrao("404", "Não foi possivel editar a loja, verifique os dados e tente novamente.").erroRetorno());
            response.end();
            return;
        }
        //Retorna a loja atualizada para o usuário
        response.send(request.body);
        console.log("Loja atualizada com sucesso");
    });
}
exports.EditaLoja = EditaLoja;
;
function DeletaLoja(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //Cria uma conexão com o banco
        const ListaLojasRepository = typeorm_1.getManager().getRepository(ListaLojas_1.ListaLojas);
        //Acha a loja no banco e guarda na variavel loja
        const loja = yield ListaLojasRepository.findOne(request.params.id);
        //Se loja não for encontrada irá retornar o erro padrão ao usuário
        if (!loja) {
            response.status(404).json(new MensagemPadrao_1.MensagemPadrao("404", "Não foi possivel deletar a loja, verifique os dados e tente novamente.").erroRetorno());
            response.end();
            return;
        }
        //Deleta loja e retorna uma mensagem de sucesso ao usuário
        yield ListaLojasRepository.delete({ id: request.params.id });
        response.send("Loja Deletada com Sucesso");
    });
}
exports.DeletaLoja = DeletaLoja;
;
function BuscaPorId(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //Cria uma conexão com o banco
        const ListaLojasRepository = typeorm_1.getManager().getRepository(ListaLojas_1.ListaLojas);
        //Procurando no banco de dados e guardando dentro da variavel
        const loja = yield ListaLojasRepository.findOne(request.params.id);
        //Caso ocorra algum erro irá retornar o erro padrão para o usuário
        if (!loja) {
            response.status(404).json(new MensagemPadrao_1.MensagemPadrao("404", "Nenhuma loja foi encontrada, verifique os dados e tente novamente.").erroRetorno());
            response.end();
            return;
        }
        //retorna a loja com o id correspondente
        response.send(loja);
    });
}
exports.BuscaPorId = BuscaPorId;
;
function BuscaPorEstado(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //Cria uma conexão com o banco
        const ListaLojasRepository = typeorm_1.getManager().getRepository(ListaLojas_1.ListaLojas);
        //Procurando no banco de dados e guardando dentro da variavel
        const loja = yield ListaLojasRepository.find({
            where: {
                estado: request.params.estado
            }
        });
        //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
        if (!loja.length) {
            response.status(404).json(new MensagemPadrao_1.MensagemPadrao("404", "Nenhuma loja foi encontrada, verifique os dados e tente novamente.").erroRetorno());
            response.end();
            return;
        }
        //Retorna as lojas do estado solicitado ao usuário
        response.send(loja);
    });
}
exports.BuscaPorEstado = BuscaPorEstado;
;
function BuscaPorCidades(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //Cria uma conexão com o banco
        const ListaLojasRepository = typeorm_1.getManager().getRepository(ListaLojas_1.ListaLojas);
        //Procurando no banco de dados e guardando dentro da variavel
        const loja = yield ListaLojasRepository.find({
            where: [
                //Pega o estado na URL e as cidades no Body
                { estado: request.params.estado, cidade: typeorm_1.In(request.body.cidades) }
            ]
        });
        //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
        if (!loja.length) {
            response.status(404).json(new MensagemPadrao_1.MensagemPadrao("404", "Nenhuma loja foi encontrada, verifique os dados e tente novamente.").erroRetorno());
            response.end();
            return;
        }
        // Retorna as lojas ao usuário
        response.send(loja);
    });
}
exports.BuscaPorCidades = BuscaPorCidades;
;
function ListarTodas(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //Cria uma conexão com o banco
        const postRepository = typeorm_1.getManager().getRepository(ListaLojas_1.ListaLojas);
        //Encontra todas as lojas e guarda na variavel loja
        const loja = yield postRepository.find();
        //Se nenhuma loja for encontrada irá retornar o erro padrão ao usuário
        if (!loja.length) {
            response.status(404).json(new MensagemPadrao_1.MensagemPadrao("404", "Nenhuma loja foi encontrada, verifique os dados e tente novamente."));
            response.end();
            return;
        }
        //Retorna as lojas para o usuário
        response.send(loja);
    });
}
exports.ListarTodas = ListarTodas;
;
function Redireciona(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        response.redirect(301, '/api-docs');
    });
}
exports.Redireciona = Redireciona;
;
//# sourceMappingURL=Controler.js.map