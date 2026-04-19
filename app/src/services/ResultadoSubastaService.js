import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'resultadosubasta';

class ResultadoSubastaService {
    getAllResultadoSubasta() {
        return axios.get(BASE_URL);
    }
    getResultadoSubastaById(idResultadoSubasta) {
        return axios.get(BASE_URL + '/' + idResultadoSubasta);
    }
    getResultadoBySubasta(idSubasta){
        return axios.get(`${BASE_URL}/getResultadosBySubasta/${idSubasta}`);
    }
    createResultado (data) {
        return axios.post(`${BASE_URL}/resultadosubasta`, data);
    }
}
export default new ResultadoSubastaService();