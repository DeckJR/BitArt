import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'objeto';

class ObjetoService {
    getAllObjeto() {
        return axios.get(BASE_URL);
    }
    getObjetoById(idObjeto) {
        return axios.get(BASE_URL + '/' + idObjeto);
    }
    createObjeto(Objeto) {
    return axios.post(BASE_URL, JSON.stringify(Objeto));
    }
}
export default new ObjetoService();