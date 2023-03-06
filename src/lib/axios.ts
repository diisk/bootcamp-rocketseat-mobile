import axios from 'axios';


export const api = axios.create({
    baseURL:'http://18.216.184.131:3333'
});