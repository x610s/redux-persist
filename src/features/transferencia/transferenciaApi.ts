import { TransferenciaResponse, TrasnferenciaEdit } from './../../models/transferencia.model';
import axios from 'axios';


export const deleteTrans = async (id: number) => {
    return await axios.delete(`http://localhost:8000/api/transferencias/${id}`);
}

export const fetchTransfer = async (token : string) => {
    const response = await axios.get('http://localhost:8000/api/transferencias',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const transfer: TransferenciaResponse[] = response.data;
    return {
        transfer
    }
}

export const fetchEditTransfer = (trans: TrasnferenciaEdit) => {
    return axios.put('http://localhost:8000/api/transferencias', trans)
        .then(x => {
            const { status, data } = x
            const resp = data.data;
            return {
                resp,
                status
            }
        }).catch((error)=>{
            const { data } = error.response;
            const {status} = error.response.request;            
            const resp = data[0];
            return {
                resp,
                status
            }
        });

}