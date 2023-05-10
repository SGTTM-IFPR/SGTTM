import axios from "axios";
import { UsuarioData } from "../datas/UsuarioData";

export const callApi = (baseURL: string, endpoint: string) => {
  const url = `${baseURL}/${endpoint}`;
  return axios.get<UsuarioData[]>(url);
};

export const createUser = async (userData: UsuarioData): Promise<UsuarioData> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = "usuario/create";
  const response = await axios.post<any>(
    `${baseURL}/${endpoint}`,
    userData
  );
  return response.data;
};

export const getAllUsers = async (): Promise<UsuarioData[]> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = "usuario/find-all";
  const response = await callApi(baseURL, endpoint);
  return response.data;
};

export const getUserById = async (id: number): Promise<UsuarioData> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `usuario/${id}`;
  const response = await callApi(baseURL, endpoint);
  return response.data[0];
};

export const updateUser = async (
  id: number,
  userData: UsuarioData
): Promise<UsuarioData> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `usuario/${id}`;
  const response = await axios.put<UsuarioData>(
    `${baseURL}/${endpoint}`,
    userData
  );
  return response.data;
};

export const deleteUser = async (id: number): Promise<string> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `usuario/${id}`;
  const response = await axios.delete<string>(`${baseURL}/${endpoint}`);
  return response.data;
};

export const buscarIdPorCpf = async (cpf: string): Promise<number> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `usuario/find-by-cpf/${cpf}`;
  const response = await axios.get(`${baseURL}/${endpoint}`);
  return response.data.id;
}
