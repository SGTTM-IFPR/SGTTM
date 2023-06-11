import { InscricaoData } from "./InscricaoData";

export interface PartidaData {
  id: number;
  etapa: string;
  data_partida: Date | null;
  numero_partida: number | null;
  grupo_id: number;
  inscricao_atleta1: InscricaoData;
  inscricao_atleta2: InscricaoData;
  partida_origem_atleta1: number;
  partida_origem_atleta2: number;
  id_proxima_partida: number;
  pontos_atleta_1: number;
  pontos_atleta_2: number;
  vencedor_id: number;
  concluida: number;
  round: number;
}