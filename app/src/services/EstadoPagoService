import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'estadopago';

class EstadoPagoService {
    getAllEstadoPago() {
        return axios.get(BASE_URL);
    }
    getEstadoPagoById(idEstadoPago) {
        return axios.get(BASE_URL + '/' + idEstadoPago);
    }

}


export default new EstadoPagoService();