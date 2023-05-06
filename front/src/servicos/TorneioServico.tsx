import axios from "axios";
import { TorneioData } from "../datas/TorneioData";

export const callApi = (baseURL: string, endpoint: string) => {
  const url = `${baseURL}/${endpoint}`;
  return axios.get<TorneioData[]>(url);
};

export const createTournament = async (tournamentData: TorneioData): Promise<TorneioData> => {
  console.log(tournamentData);
  const baseURL = "http://localhost:5000/";
  const endpoint = "torneio/create";
  const response = await axios.post<any>(
    `${baseURL}/${endpoint}`,
    tournamentData
  );
  return response.data;
};

export const getAllTournaments = async (): Promise<TorneioData[]> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = "torneio/find-all";
  const response = await callApi(baseURL, endpoint);
  return response.data;
};

export const getTournamentById = async (id: number): Promise<TorneioData> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `torneio/${id}`;
  const response = await callApi(baseURL, endpoint);
  return response.data[0];
};

export const updateTournament = async (
  id: number,
  tournamentData: TorneioData
): Promise<TorneioData> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `torneio/${id}`;
  const response = await axios.put<TorneioData>(
    `${baseURL}/${endpoint}`,
    tournamentData
  );
  return response.data;
};

export const deleteTournament = async (id: number): Promise<string> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `torneio/${id}`;
  const response = await axios.delete<string>(`${baseURL}/${endpoint}`);
  return response.data;
};