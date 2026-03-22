import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'objeto';

class ObjetoService {
    getAllObjeto() {
        return axios.get(BASE_URL);
    }
    getObjetoById(idObjeto) {
        return axios.get(BASE_URL + '/' + idObjeto);
    }

    getObjetoByUsuario(idUsuario) {
        return axios.get(BASE_URL + '/' + 'getObjetoByUsuario' + '/' + idUsuario);
    }

    createObjeto(Objeto) {
    return axios.post(BASE_URL, JSON.stringify(Objeto));
    }
    
    updateObjeto(objeto) {
    console.log("Update URL:", `${BASE_URL}/${objeto.idObjeto}`); // para debug
    return axios.put(`${BASE_URL}/${objeto.idObjeto}`, objeto);
    }
}

export default new ObjetoService();