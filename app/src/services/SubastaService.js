import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'subasta';

class UserService {
    getAllUsuario() {
        return axios.get(BASE_URL);
    }
    getUsuarioById(idSubasta) {
        return axios.get(BASE_URL + '/' + idSubasta);
    }
}
export default new UserService();