import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'imagen';

class ImageService {
    createImagen(formData){
        return axios.post(BASE_URL,formData,{
            headers:{
                'Content-Type':'multipart/form-data;',
                'Accept':'multipart/form-data'
            }
        })
    }
    
    getAllImagen() {
        return axios.get(BASE_URL);
    }
    getImagenById(idObjeto) {
        return axios.get(BASE_URL + '/' + idObjeto);
    }
}
export default new ImageService()