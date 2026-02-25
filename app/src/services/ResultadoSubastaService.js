import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'resultadosubasta';

class ResultadoSubastaService {
    getAllResultadoSubasta() {
        return axios.get(BASE_URL);
    }
    getResultadoSubastaById(idResultadoSubasta) {
        return axios.get(BASE_URL + '/' + idResultadoSubasta);
    }
}
export default new ResultadoSubastaService();