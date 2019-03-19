"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MensagemPadrao {
    constructor(codidoErro, mensagemToUser) {
        this.mensagem = [{
                "errorCode": "400",
                "Mensagem": "Erro na requisição, verifique os dados e tente novamente"
            }];
        this.mensagem = [{
                "errorCode": codidoErro,
                "Mensagem": mensagemToUser
            }];
    }
    ;
    erroRetorno() {
        return this.mensagem;
    }
    ;
}
exports.MensagemPadrao = MensagemPadrao;
//# sourceMappingURL=MensagemPadrao.js.map