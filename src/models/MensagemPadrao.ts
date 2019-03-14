export class MensagemPadrao {

    mensagem = [{
        "errorCode": "400",
        "Mensagem": "Erro na requisição, verifique os dados e tente novamente"
    }];


    constructor(codidoErro: string, mensagemToUser: string){
        this.mensagem = [{
            "errorCode": codidoErro,
            "Mensagem": mensagemToUser
        }]
        
    };
       
    erroRetorno(){
        return this.mensagem
    };
}
 