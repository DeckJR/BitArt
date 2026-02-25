import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'condicion';

class CondicionService {
    getAllCondicion() {
        return axios.get(BASE_URL);
    }
    getCondicionById(idcondicion) {
        return axios.get(BASE_URL + '/' + idcondicion);
    }

}


export default new CondicionService();