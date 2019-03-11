import { CriaLojaModel } from "../models/CriaLojaModel";

module.exports = function (app) {
    app.post("/criaLoja", function (req, res) {
        var loja = req.body;
        console.log('processando aguarde...');

        req.assert("nome_loja", "Nome da loja é obrigatório.").notEmpty();
        req.assert("endereco", "Endereço da loja é obrigatório.").notEmpty();
        req.assert("celular", "Telefone/Celular da loja é obrigatório e deve ser um decimal.").notEmpty().len(10,12);
        req.assert("cnpj", "CNPJ da loja é obrigatório.").notEmpty().len(18);
        req.assert("horarioDeTrabalho", "Horário de trabalho é obrigatório").notEmpty();
        req.assert("cidade", "Cidade é obrigatória.").notEmpty();
        req.assert("estado", "Estado é obrigatório e deve ter 2 caracteres").notEmpty().len(2, 2);

        var errors = req.validationErrors();

        if (errors) {
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }
        console.log('criando loja...');



        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection); 

        lojaDao.salva(loja, function (exception, result) {
            console.log('Loja criada: ' + result);

            res.status(201).json(loja);
        })
    })


    app.put('/editaLoja/:id', function (req, res) {

        var loja = req.body;
        var id = req.params.id;

        loja.id = id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.altera(loja, function (erro) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log('Loja alterada');
            res.send(loja);
        });

    });


    app.delete('/deletaLoja/:id', function (req, res) {
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.deleta(id, function (erro , result) {
            if (erro) {
                console.log("Erro ao deletar a loja, tente novamente mais tarde")
                res.status(500).send(erro);
                return;
            }
            if (result.affectedRows > 0) {
                console.log('Loja deletada');
                res.status(204).send();
            } else {
                console.log("Loja não encontrada, confira seus dados e tente novamente")
                res.status(400).send();
            }

        });

    });


    app.get('/buscaId/:id', function (req, res) {
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.buscaPorId(id, function (erro , resultado) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log("Loja com o id" + id);
            res.json(resultado);
        });
    });


    app.get('/buscaEstadoeCidade/:estado/:cidadeA', function (req, res) {
        
        var estado = req.params.estado;
        var cidadeA = req.params.cidadeA;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.buscaEstadoEUmaCidade(estado, cidadeA, function (erro, resultado) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log("Lojas do estado de " + estado + " e da cidade de " + cidadeA);
            res.json(resultado);
        });
    });


    app.get('/buscaEstadoeCidade/:estado/:cidadeA/:cidadeB', function (req, res) {

        var estado = req.params.estado;
        var cidadeA = req.params.cidadeA;
        var cidadeB = req.params.cidadeB;


        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.buscaEstadoEDuasCidades(estado, cidadeA, cidadeB, function (erro, resultado) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log("Lojas do estado de " + estado + " das cidades de " + cidadeA + "," + cidadeB);
            res.json(resultado);
        });
    });


    app.get('/buscaEstadoeCidade/:estado/:cidadeA/:cidadeB/:cidadeC', function (req, res) {

        var estado = req.params.estado;
        var cidadeA = req.params.cidadeA;
        var cidadeB = req.params.cidadeB;
        var cidadeC = req.params.cidadeC;


        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.buscaEstadoETresCidades(estado, cidadeA, cidadeB, cidadeC, function (erro, resultado) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log("Lojas do estado de " + estado + " das cidades de " + cidadeA + "," + cidadeB + "," + cidadeC);
            res.json(resultado);
        });
    });


    app.get('/buscaEstado/:estado', function (req, res) {
        var estado = req.params.estado;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.BuscaEstado(estado, function (erro, resultado) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log("Lojas do estado de " + estado);
            res.json(resultado);
        });
    });


    app.get('/listaLojas', function (req, res) {

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.listaTodos(function (erro, resultado) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log("Todas as lojas foram listadas");
            res.json(resultado);
        });
    });
}
