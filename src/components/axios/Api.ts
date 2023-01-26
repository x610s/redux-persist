import  Cookies  from 'universal-cookie';
import axios, { AxiosInstance } from "axios";

export const getCookie = (Api: AxiosInstance) => {
    const Cookie = new Cookies();
    let token = Cookie.get("XSRF-TOKEN");
    if (token) {
        return new Promise(resolve => {
            resolve(token);
        });
    }
    return Api.get("/csrf-cookie");
}

export const Api: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api"
});
Api.defaults.withCredentials = true;