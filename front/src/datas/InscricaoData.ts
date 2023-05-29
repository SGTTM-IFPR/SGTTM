import { UsuarioData } from "./UsuarioData";

export interface InscricaoData {
    id?: number;
    usuario_id?: number;
    usuario?: UsuarioData;
    torneio_id: number;
    condicao?: string;
    partidas_jogadas?: number;
    vitorias?: number;
    derrotas?: number;
}