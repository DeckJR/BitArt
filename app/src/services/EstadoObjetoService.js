import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'estadoobjeto';

class EstadoObjetoService {
    getAllEstadoObjeto() {
        return axios.get(BASE_URL);
    }
    getEstadoObjetoById(idEstadoObjeto) {
        return axios.get(BASE_URL + '/' + idEstadoObjeto);
    }

}


export default new EstadoObjetoService();