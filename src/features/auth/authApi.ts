import { AuthLogin } from './../../models/auth.model';
import axios  from 'axios'
import { Api, getCookie } from '../../components/axios/Api';

export const fetchLogin = async (data: AuthLogin) => {
   const cok =  await getCookie(Api);
   console.log(cok);
    return axios.post('http://localhost:8000/api/login', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

}

