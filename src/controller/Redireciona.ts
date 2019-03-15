import { Request, Response } from "express";


export async function Redireciona(request: Request, response: Response) {
    response.redirect(301, '/api-docs')

}
