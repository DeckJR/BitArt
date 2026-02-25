import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'categoria';

class CategoriaService {
    getAllCategoria() {
        return axios.get(BASE_URL);
    }
    getCategoriaById(idCategoria) {
        return axios.get(BASE_URL + '/' + idCategoria);
    }

    getCategoriaObjeto(idObjeto){
        return axios.get(BASE_URL +'/getCategoriaObjeto/'+idObjeto )
    }
}


export default new CategoriaService();