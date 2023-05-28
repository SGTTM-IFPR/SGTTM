import axios from "axios";
import { UsuarioData } from "../datas/UsuarioData";
import { get } from "react-hook-form";


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

export const getUserById = async (id: number): Promise<UsuarioData[]> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `usuario/${id}`;
  const response = await callApi(baseURL, endpoint);
  return response.data;
};

export const getUserByCpf = async (cpf: string): Promise<UsuarioData[]> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `usuario/find-by-cpf/${cpf}`;
  const response = await callApi(baseURL, endpoint);
  return response.data;
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

export const buscarIdPorNome = async (nome: string): Promise<number> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `usuario/find-by-nome/${nome}`;
  const response = await axios.get(`${baseURL}/${endpoint}`);
  return response.data.id;
}

export const recuperar_senha = async (email: string): Promise<string> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `usuario/recuperar-senha/${email}`;
  const response = await axios.post(`${baseURL}/${endpoint}`);
  return response.data;
}
