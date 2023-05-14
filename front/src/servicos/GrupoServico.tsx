import axios, { AxiosHeaders } from "axios";
import { GrupoData } from "../datas/GrupoData";

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

export const getGruposByTorneioId = async (id: number): Promise<GrupoData[]> => {
    const baseURL = "http://localhost:5000/";
    const endpoint = `grupo/find-by-torneio/${id}`;
    const response = await axios.get<GrupoData[]>(`${baseURL}/${endpoint}`);
    return response.data;
}