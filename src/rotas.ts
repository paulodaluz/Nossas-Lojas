import { CriaLoja, EditaLoja, DeletaLoja, BuscaPorId} from "./controller/Controler";
import { BuscaPorEstado, BuscaPorCidades, ListarTodas, Redireciona } from "./controller/Controler";


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
        path: "/buscaPorCidades/:estado",
        method: "post",
        action: BuscaPorCidades
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