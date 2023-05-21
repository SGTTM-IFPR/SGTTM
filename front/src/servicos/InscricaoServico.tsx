import axios from "axios";
import { InscricaoData } from "../datas/InscricaoData";
import { TesteData } from "../datas/TesteData";

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

export const callApi = (baseURL: string, endpoint: string) => {
    const url = `${baseURL}/${endpoint}`;
    return axios.get<InscricaoData[]>(url);
}

export const createInscricao = async (inscricaoData: InscricaoData): Promise<InscricaoData> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = "inscricao/create";
    const response = await axios.post<any>(
        `${baseURL}/${endpoint}`,
        inscricaoData
    );
    return response.data;
}

export const getAllInscricoes = async (): Promise<InscricaoData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = "inscricao/find-all";
    const response = await callApi(baseURL, endpoint);
    return response.data;
}

export const deleteInscricao = async (id: number): Promise<string> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `inscricao/${id}`;
    const response = await axios.delete<string>(`${baseURL}/${endpoint}`);
    return response.data;
}

export const getInscricaoById = async (id: number): Promise<InscricaoData> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `inscricao/find-all/${id}`;
    const response = await axios.get<InscricaoData>(`${baseURL}/${endpoint}`);
    return response.data;
}

export const montarGrupos = async (id: number, formato: string, quantidade_classificados: number): Promise<string> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `inscricao/montar-grupos/${id}/${formato}/${quantidade_classificados}`;
    const response = await axios.get<string>(`${baseURL}/${endpoint}`);
    return response.data;
}

export const getInscricaoByTorneioId = async (id: number): Promise<InscricaoData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `inscricao/find-by-torneio/${id}`;
    const response = await axios.get<InscricaoData[]>(`${baseURL}/${endpoint}`);
    return response.data;
}

export const getInscricaoByGrupoId = async (id: number): Promise<InscricaoData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `inscricao/find-by-grupo/${id}`;
    const response = await axios.get<InscricaoData[]>(`${baseURL}/${endpoint}`);
    console.log(response.data)
    return response.data;
}

export const getNumeroClassificados = async (quantidade_inscritos: number): Promise<TesteData> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `inscricao/classificados/${quantidade_inscritos}`;
    const response = await axios.get<TesteData>(`${baseURL}/${endpoint}`);
    return response.data;
}