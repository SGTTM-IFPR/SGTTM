import { UsuarioData } from "./UsuarioData";

export class InscricaoData {
    id?: number;
    usuario_id?: number;
    usuario?: UsuarioData;
    torneio_id?: number;
    condicao?: string;
    partidas_jogadas: number = 0;
    vitorias: number = 0;
    derrotas: number = 0;
}