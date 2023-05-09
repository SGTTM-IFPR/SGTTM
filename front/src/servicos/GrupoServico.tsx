import axios from "axios";
import { GrupoData } from "../datas/GrupoData";


export const getGruposByTorneioId = async (id: number): Promise<GrupoData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `grupo/find-by-torneio/${id}`;
    const response = await axios.get<GrupoData[]>(`${baseURL}/${endpoint}`);
    return response.data;
}