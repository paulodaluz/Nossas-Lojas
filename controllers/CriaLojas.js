
module.exports = function (app) {

    const erroPadrao = [{
        "errorCode": "400",
        "msg": ""
    }]



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
            erroPadrao[0].msg = errors[0].msg
            res.status(400).json(erroPadrao);
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

        lojaDao.altera(loja, function (erro, result) {
            if (erro) {
                erroPadrao[0].msg = "Erro no servidor";
                res.status(500).json(erroPadrao);
                return;
            }
            if (result.affectedRows > 0) {
                console.log('Loja alterada');
                res.status(204).send(loja);
            } else {
                console.log("Loja não encontrada")
                erroPadrao[0].msg = "Loja não encontrada, confira seus dados e tente novamente";
                erroPadrao[0].errorCode = 400
                res.status(400).json(erroPadrao);
            }    
        });

    });


    app.delete('/deletaLoja/:id', function (req, res) {
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.deleta(id, function (erro , result) {
            if (erro) {
                erroPadrao[0].msg = "Erro no servidor"
                erroPadrao[0].errorCode = 500
                res.status(500).json(erroPadrao);
                return;
            }
            if (result.affectedRows > 0) {
                console.log('Loja deletada');
                res.status(204).send();
            } else {
                console.log("Loja não encontrada")
                erroPadrao[0].msg = "Loja não encontrada, confira seus dados e tente novamente";
                res.status(400).json(erroPadrao);
            }

        });

    });


    app.get('/buscaId/:id', function (req, res) {
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.buscaPorId(id, function (erro , resultado) {
            if (erro) {
                erroPadrao[0].msg = "Erro no servidor";
                erroPadrao[0].errorCode = 500
                res.status(500).json(erroPadrao);
                return;
            }
            if (resultado.length > 0) {
                console.log("Loja com o id " + id + "foi mostrada ao usuário");
                res.json(resultado);

            } else {

                console.log("Loja não encontrada")
                erroPadrao[0].msg = "Loja não encontrada, confira seus dados e tente novamente";
                res.status(400).json(erroPadrao);
            }
        });
    });


    app.get('/buscaEstadoeCidade/:estado/:cidadeA', function (req, res) {
        
        var estado = req.params.estado;
        var cidadeA = req.params.cidadeA;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.buscaEstadoEUmaCidade(estado, cidadeA, function (erro, resultado) {
            if (erro) {
                erroPadrao[0].msg = "Erro no servidor";
                erroPadrao[0].errorCode = 500;
                res.status(500).json(erroPadrao);
                return;
            }
            if (resultado.length > 0) {
                console.log("Lojas do estado de " + estado + " e da cidade de " + cidadeA);
                res.json(resultado);

            } else {

                console.log("Lojas não encontradas")
                erroPadrao[0].msg = "Lojas não encontradas, confira seus dados e tente novamente";
                res.status(400).json(erroPadrao);
            }
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
                erroPadrao[0].msg = "Erro no servidor";
                erroPadrao[0].errorCode = 500;
                res.status(500).json(erroPadrao);
                return;
            }

            if (resultado.length > 0) {
                console.log("Lojas do estado de " + estado + " das cidades de " + cidadeA + "," + cidadeB);
                res.json(resultado);

            } else {

                console.log("Lojas não encontradas")
                erroPadrao[0].msg = "Lojas não encontradas, confira seus dados e tente novamente";
                res.status(400).json(erroPadrao);
            }
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
                erroPadrao[0].msg = "Erro no servidor";
                erroPadrao[0].errorCode = 500;
                res.status(500).json(erroPadrao);
                return;
            }
            if (resultado.length > 0) {
                console.log("Lojas do estado de " + estado + " das cidades de " + cidadeA + "," + cidadeB + "," + cidadeC);
                res.json(resultado);
            } else {

                console.log("Lojas não encontradas")
                erroPadrao[0].msg = "Lojas não encontradas, confira seus dados e tente novamente";
                res.status(400).json(erroPadrao);
            }
        });
    });


    app.get('/buscaEstado/:estado', function (req, res) {
        var estado = req.params.estado;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.BuscaEstado(estado, function (erro, resultado) {
            if (erro) {
                erroPadrao[0].msg = "Erro no servidor";
                erroPadrao[0].errorCode = 500;
                res.status(500).json(erroPadrao);
                return;

            } if (resultado.length > 0) {
                console.log("Lojas do estado de " + estado);
                res.json(resultado);
            } else {
                console.log("Lojas não encontradas")
                erroPadrao[0].msg = "Lojas não encontradas, confira seus dados e tente novamente";
                res.status(400).json(erroPadrao);
            }
        });
    });


    app.get('/listaLojas', function (req, res) {

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.listaTodos(function (erro, resultado) {
            if (erro) {
                Console.log("Erro no servidor");
                erroPadrao[0].msg = "Erro no servidor";
                erroPadrao[0].errorCode = 500;
                res.status(500).json(erroPadrao);
                return;
            } 
            if (resultado.length > 0) {
            console.log("Todas as lojas foram listadas");
            res.json(resultado);
            } else {
                console.log("Lojas encontradas");
                erroPadrao[0].msg = "Nenhuma loja foi criada até o momento";
                erroPadrao[0].errorCode = 200;
                res.status(200).json(erroPadrao);
            }
        });
    });
}
