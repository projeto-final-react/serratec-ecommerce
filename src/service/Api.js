import axios from "axios";
import utilStorage from '../utils/storage';

const api = axios.create({
    baseURL: 'https://serratec-ecomerce.herokuapp.com'
})

api.interceptors.request.use((config) => {
    // Aqui tenho que pegar o token do storage e enviar na requisição.
    let token = utilStorage.obterTokenNaStorage();

    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});


export default api;
