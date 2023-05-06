import axios from "axios";
import { InscricaoData } from "../datas/InscricaoData";

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