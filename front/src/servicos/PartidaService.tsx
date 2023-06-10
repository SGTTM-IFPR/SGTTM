import axios from "axios";
import { PartidaData } from "../datas/PartidaData";

axios.interceptors.request.use(
    config => {
        if (config.url?.includes('/login')) {
            return config
        }
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export const getAllPartidasByGrupoId = async (id: number): Promise<PartidaData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `partida/find-by-grupo/${id}`;
    const response = await axios.get<PartidaData[]>(`${baseURL}/${endpoint}`);
    return response.data;
}

export const updateAllPartidas = async (partidas: PartidaData[]) => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `partida/update-all`;
    const response = await axios.put<PartidaData[]>(`${baseURL}/${endpoint}`, partidas);
    return response.data;
}

export const getPartidaByEtapaAndTorneioId = async (etapa: string, torneioId: number): Promise<PartidaData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `partida/find-by-etapa-torneio/${etapa}/${torneioId}`;
    const response = await axios.get<PartidaData[]>(`${baseURL}/${endpoint}`);
    return response.data;
}

export const getAllPartidasByTorneioId = async (torneioId: number): Promise<PartidaData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `partida/find-by-torneio/${torneioId}`;
    const response = await axios.get<PartidaData[]>(`${baseURL}/${endpoint}`);
    return response.data;
}