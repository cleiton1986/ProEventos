import { Lote } from "./Lote";
import { Palestrante } from "./Palestrante";
import { RedeSocial } from "./RedeSocial";

export interface Evento {
     id: number;
     local: string;
     dataEvento?: Date;
     tema: string
     qtdPessoas: number;
     lote: string;
     imagemUrl: string;
     telefone: string;
     email: string;
     lotes: Lote[];
     redesSociais: RedeSocial[];
     palestranteEventos: Palestrante[];

}
