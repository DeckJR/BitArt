import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'usuario';

class UsuarioService {
    getAllUsuario() {
        return axios.get(BASE_URL);
    }
    getUsuarioById(idUsuario) {
        return axios.get(BASE_URL + '/' + idUsuario);
    }
    createUsuario(Usuario) {
    return axios.post(BASE_URL, JSON.stringify(Usuario));
    }
    updateUsuario(Usuario) {
    return axios.put(BASE_URL, Usuario);
    }
}
export default new UsuarioService();