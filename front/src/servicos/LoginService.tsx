import axios from "axios";


export const login = async (email: string, password: string) => {
    const response = await axios.post('http://127.0.0.1:5000/autenticacao/login', {
        'email':email,
        'password':password
    });
    return response;
}
