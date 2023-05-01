import axios,{ AxiosInstance } from "axios";
import { UserData } from "../datas/UserData";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export const authToken = async () => {
  const baseURL = "http://localhost:5000/";
  const endpoint = "auth/token";
  const token = sessionStorage.getItem("token");
  const body = {
    'token': token
  }
  const response = await axios.post<any>(
    `${baseURL}/${endpoint}`,
    body
  );
  return response.data;
};


export const callApi = (baseURL: string, endpoint: string) => {
  const url = `${baseURL}/${endpoint}`;
  return axios.get<UserData[]>(url);
};


export const createUser = async (userData: UserData): Promise<UserData> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = "users/";
  const response = await axios.post<any>(
    `${baseURL}/${endpoint}`,
    userData
  );
  return response.data;
};

export const getAllUsers = async (): Promise<UserData[]> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = "users";
  const auth = await authToken();
  const response = await callApi(baseURL, endpoint);
  return response.data;
};

export const getUserById = async (id: number): Promise<UserData> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `users/${id}`;
  const response = await callApi(baseURL, endpoint);
  return response.data[0];
};

export const updateUser = async (
  id: number,
  userData: UserData
): Promise<UserData> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `users/${id}`;
  const response = await axios.put<UserData>(
    `${baseURL}/${endpoint}`,
    userData
  );
  return response.data;
};

export const deleteUser = async (id: number): Promise<string> => {
  const baseURL = "http://localhost:5000/";
  const endpoint = `users/${id}`;
  const response = await axios.delete<string>(`${baseURL}/${endpoint}`);
  return response.data;
};
