import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'subasta';

class SubastaService {
    getAllSubasta() {
        return axios.get(BASE_URL);
    }
    getSubastaById(idSubasta) {
        return axios.get(BASE_URL + '/' + idSubasta);
    }
    getSubastaByObjeto(idObjeto) {
        return axios.get(BASE_URL + '/' + 'getSubastaByObjeto' + '/' + idObjeto);
    }
    contarSubastabyUsuario(idUsuario) {
        return axios.get(BASE_URL + '/' + 'contarSubastabyUsuario' + '/' + idUsuario);
    }
}
export default new SubastaService();