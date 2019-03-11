var express = require('express');
var consign = require('consign');

var bodyParser = require('body-parser');

var expressValidator = require('express-validator');

module.exports = function () {

    var app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(expressValidator());

    consign()
        .include('controllers')
        .then('persistencia')
        .into(app); /// incluido o controler e a persistencia dentro do app
        // ta faznedo o app reconhecer todas as pastas

    return app
}


