import { InscricaoData } from "./InscricaoData";

export interface PartidaData {
  id: number;
  etapa: string;
  data_partida: Date | null;
  numero_partida: number | null;
  grupo_id: number;
  inscricao_atleta1: InscricaoData;
  inscricao_atleta2: InscricaoData;
  pontos_atleta_1: number ;
  pontos_atleta_2: number ;
  vendedor: InscricaoData;
}