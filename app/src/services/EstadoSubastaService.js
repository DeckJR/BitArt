import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'estadosubasta';

class EstadoSubastaService {
    getAllEstadoSubasta() {
        return axios.get(BASE_URL);
    }
    getEstadoSubastaById(idEstadoSubasta) {
        return axios.get(BASE_URL + '/' + idEstadoSubasta);
    }

}


export default new EstadoSubastaService();