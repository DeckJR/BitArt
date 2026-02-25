import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'pago';

class PagoService {
    getAllPago() {
        return axios.get(BASE_URL);
    }
    getPagoById(idPago) {
        return axios.get(BASE_URL + '/' + idPago);
    }
    getPagoBySubasta(idSubasta) {
        return axios.get(BASE_URL + '/' + 'getPagoBySubasta' + '/' + idSubasta);
    }
}
export default new PagoService();