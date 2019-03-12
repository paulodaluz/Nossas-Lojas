import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ListaLojas {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome_loja: string;

    @Column()
    endereco: string;

    @Column()
    celular: string;

    @Column()
    cnpj: string;

    @Column()
    horarioDeTrabalho: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

}