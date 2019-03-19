"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controler_1 = require("./controller/Controler");
const Controler_2 = require("./controller/Controler");
//Todas as rotas da aplicação
exports.AppRoutes = [
    {
        path: "/criaLoja",
        method: "post",
        action: Controler_1.CriaLoja
    },
    {
        path: "/editaLoja/:id",
        method: "put",
        action: Controler_1.EditaLoja
    },
    {
        path: "/deletaLoja/:id",
        method: "delete",
        action: Controler_1.DeletaLoja
    },
    {
        path: "/buscaPorId/:id",
        method: "get",
        action: Controler_1.BuscaPorId
    },
    {
        path: "/buscaPorEstado/:estado",
        method: "get",
        action: Controler_2.BuscaPorEstado
    },
    {
        path: "/buscaPorCidades/:estado",
        method: "get",
        action: Controler_2.BuscaPorCidades
    },
    {
        path: "/listaLojas",
        method: "get",
        action: Controler_2.ListarTodas
    },
    {
        path: "/",
        method: "get",
        action: Controler_2.Redireciona
    }
];
//# sourceMappingURL=rotas.js.map