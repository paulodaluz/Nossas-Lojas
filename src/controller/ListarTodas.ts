import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";

/**
 * Loads all posts from the database.
 */
export async function ListarTodas(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(ListaLojas);

    // load a post by a given post id
    const posts = await postRepository.find();

    // return loaded posts
    response.send(posts);
}