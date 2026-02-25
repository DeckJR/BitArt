import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'rol';

class UserService {
    getAllUsuario() {
        return axios.get(BASE_URL);
    }
    getUsuarioById(idRol) {
        return axios.get(BASE_URL + '/' + idRol);
    }
}
export default new UserService();