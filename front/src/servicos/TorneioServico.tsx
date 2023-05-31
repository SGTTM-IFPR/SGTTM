import axios from "axios";
import { TorneioData } from "../datas/TorneioData";

const baseURL = "http://localhost:5000/";

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

export const createTournament = async (tournamentData: TorneioData): Promise<TorneioData> => {
  const endpoint = "torneio/create";
  const response = await axios.post<any>(
    `${baseURL}/${endpoint}`,
    tournamentData
  );
  return response.data;
};

export const getAllTournaments = async (): Promise<TorneioData[]> => {
  const endpoint = "torneio/find-all";
  const url = `${baseURL}/${endpoint}`;
  const response = await axios.get<TorneioData[]>(url);
  return response.data;
};

export const getTorneioById = async (id: number): Promise<TorneioData> => {
  const endpoint = `torneio/${id}`;
  const url = `${baseURL}/${endpoint}`;
  const response = await axios.get<TorneioData>(url);
  return response.data;
};

export const updateTournament = async (
  id: number,
  tournamentData: TorneioData
): Promise<TorneioData> => {
  const endpoint = `torneio/${id}`;
  const response = await axios.put<TorneioData>(
    `${baseURL}/${endpoint}`,
    tournamentData
  );

  return response.data;
};

export const nextFaseTournament = async (
  id: number
): Promise<TorneioData> => {
  const endpoint = `torneio/next-fase/${id}`;
  const response = await axios.post<TorneioData>(
    `${baseURL}/${endpoint}`,
  );

  return response.data;
};

export const deleteTournament = async (id: number): Promise<string> => {
  ;
  const endpoint = `torneio/${id}`;
  const response = await axios.delete<string>(`${baseURL}/${endpoint}`);
  return response.data;
};