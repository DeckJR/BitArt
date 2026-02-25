import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'puja';

class PujaService {
    getAllPuja() {
        return axios.get(BASE_URL);
    }
    getPujaById(idPuja) {
        return axios.get(BASE_URL + '/' + idPuja);
    }
    getPujasBySubasta(idSubasta) {
        return axios.get(BASE_URL + '/' + 'getPujasBySubasta' + '/' + idSubasta);
    }
    getPujasByUsuario(idUsuario) {
        return axios.get(BASE_URL + '/' + 'getPujasByUsuario' + '/' + idUsuario);
    }
    ContarPujasByUsuario(idUsuario)
    {
        return axios.get(BASE_URL + '/' + 'ContarPujasByUsuario' + '/' + idUsuario)
    }
    ContarPujasBySubasta(idSubasta)
    {
        return axios.get(BASE_URL + '/' + 'ContarPujasBySubasta' + '/' + idSubasta)
    }
}
export default new PujaService();