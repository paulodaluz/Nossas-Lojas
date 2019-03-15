import { CriaLoja, EditaLoja, DeletaLoja, BuscaPorId} from "./controller/Controler";
import { BuscaPorEstado, BuscaEmUmaCidade, BuscaEmDuasCidades, BuscaEmTresCidades } from "./controller/Controler";
import { ListarTodas, Redireciona } from "./controller/Controler";


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
        path: "/buscaPorId/:id",
        method: "get",
        action: BuscaPorId
    },
    {
        path: "/buscaPorEstado/:estado",
        method: "get",
        action: BuscaPorEstado
    },
    {
        path: "/buscaPorEstadoeCidade/:estado/:cidadeA",
        method: "get",
        action: BuscaEmUmaCidade
    },
    {
        path: "/buscaPorEstadoeCidade/:estado/:cidadeA/:cidadeB",
        method: "get",
        action: BuscaEmDuasCidades
    },
    {
        path: "/buscaPorEstadoeCidade/:estado/:cidadeA/:cidadeB/:cidadeC",
        method: "get",
        action: BuscaEmTresCidades
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