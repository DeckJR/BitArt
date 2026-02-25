import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'rol';

class RolService {
    getAllRol() {
        return axios.get(BASE_URL);
    }
    getRolById(idRol) {
        return axios.get(BASE_URL + '/' + idRol);
    }
    getRolUsuario(idUsuario) {
        return axios.get(BASE_URL + '/' + 'getRolUsuario' + '/' + idUsuario);
    }
}
export default new RolService();