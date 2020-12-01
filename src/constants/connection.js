import axios from "axios";

export const connection = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});
