import { CriaLoja } from "./controller/CriaLoja";
import { EditaLoja } from "./controller/EditarLoja";
import { DeletaLoja } from "./controller/DeletaLoja";
import { BuscaId } from "./controller/BuscaId";
import { BuscaEstado } from "./controller/BuscaEstado";
import { ListarTodas } from "./controller/ListarTodas";
import { BuscaEmUmaCidade } from "./controller/BuscaEmUmaCidade";
import { BuscaEmDuasCidades } from "./controller/BuscaEmDuasCidades";
import { BuscaEmTresCidades } from "./controller/BuscaEmTresCidades";
import { Redireciona } from "./controller/Redireciona"

//Todas as rotas da aplicação
export const AppRoutes = [
    {
        path: "/criaLoja",
        method: "post",
        action: CriaLoja
    },
    {
        path: "/editaLoja/:id",
        method: "put",
        action: EditaLoja
    },
    {
        path: "/deletaLoja/:id",
        method: "delete",
        action: DeletaLoja
    },
    {
        path: "/buscaId/:id",
        method: "get",
        action: BuscaId
    },
    {
        path: "/buscaEstadoeCidade/:estado/:cidadeA",
        method: "get",
        action: BuscaEmUmaCidade
    },
    {
        path: "/buscaEstadoeCidade/:estado/:cidadeA/:cidadeB",
        method: "get",
        action: BuscaEmDuasCidades
    },
    {
        path: "/buscaEstadoeCidade/:estado/:cidadeA/:cidadeB/:cidadeC",
        method: "get",
        action: BuscaEmTresCidades
    },
    {
        path: "/buscaEstado/:estado",
        method: "get",
        action: BuscaEstado
    },
    {
        path: "/listaLojas",
        method: "get",
        action: ListarTodas
    },
    {
        path: "/",
        method: "get",
        action: Redireciona
    }

];