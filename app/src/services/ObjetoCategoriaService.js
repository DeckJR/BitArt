import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'objeto';

class ObjetoCategoriaService {
    getAllObjetoCat() {
        return axios.get(BASE_URL);
    }
    //HACER EL POST Y UPDATE
}
export default new ObjetoCategoriaService();