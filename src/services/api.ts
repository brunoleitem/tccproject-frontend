import axios from 'axios';
import { parseCookies } from 'nookies';

let cookies = parseCookies();

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        Authorization: `Bearer ${cookies['tccproject.token']}`
    }
})

export default api