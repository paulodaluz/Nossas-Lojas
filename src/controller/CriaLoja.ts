import {Request, Response} from "express";
import {getManager} from "typeorm";
import { ListaLojas} from "../entity/ListaLojas";

/**
 * Saves given post.
 */
export async function CriaLoja(request: Request, response: Response) {
    console.log("oi");
    // get a post repository to perform operations with post
    const ListaLojasRepository = getManager().getRepository(ListaLojas);

    // create a real post object from post json object sent over http
    const newPost = ListaLojasRepository.create(request.body);

    // save received post
    await ListaLojasRepository.save(newPost);

    // return saved post back
    response.send(newPost);
}