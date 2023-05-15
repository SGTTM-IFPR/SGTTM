import axios from "axios";

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

export const login = async (email: string, password: string) => {
  const response = await axios.post('http://127.0.0.1:5000/autenticacao/login', {
    'email': email,
    'password': password
  });
  return response;
}

export const recuperar_senha = async (email: string) => {
  const response = await axios.post('http://127.0.0.1:5000/autenticacao/recuperar_senha', {
    'email': email
  });
  return response;
}
