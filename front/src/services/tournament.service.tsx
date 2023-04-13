import axios from "axios";
import { TournamentData } from "../datas/TournamentData";

export const callApi = (baseURL: string, endpoint: string) => {
    const url = `${baseURL}/${endpoint}`;
    return axios.get<TournamentData[]>(url);
};

export const createTournament = async (tournamentData: TournamentData): Promise<TournamentData> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = "tournaments/";
    const response = await axios.post<any>(
      `${baseURL}/${endpoint}`,
      tournamentData
    );
    return response.data;
};

export const getAllTournaments = async (): Promise<TournamentData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = "tournaments";
    const response = await callApi(baseURL, endpoint);
    return response.data;
};

export const getTournamentById = async (id: number): Promise<TournamentData> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `tournaments/${id}`;
    const response = await callApi(baseURL, endpoint);
    return response.data[0];
};

export const updateTournament = async (
    id: number,
    tournamentData: TournamentData
  ): Promise<TournamentData> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `tournaments/${id}`;
    const response = await axios.put<TournamentData>(
      `${baseURL}/${endpoint}`,
      tournamentData
    );
    return response.data;
};

export const deleteTournament = async (id: number): Promise<string> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `tournaments/${id}`;
    const response = await axios.delete<string>(`${baseURL}/${endpoint}`);
    return response.data;
};