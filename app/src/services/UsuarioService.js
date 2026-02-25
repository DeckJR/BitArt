import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'usuario';

class UserService {
    getAllUsuario() {
        return axios.get(BASE_URL);
    }
    getUsuarioById(idUsuario) {
        return axios.get(BASE_URL + '/' + idUsuario);
    }
}
export default new UserService();