import axios from 'axios';

export const api = axios.create({
   // recomendado digitar o ip local e porta, ex.: http://192.168.1.4:3333
   baseURL: import.meta.env.VITE_API_URL,
});
