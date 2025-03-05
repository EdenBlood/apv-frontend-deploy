import axios from 'axios';

//* Creamos una url base para no estar escribiendo "${import.meta.env.VITE_BACKEND_URL}/api" Todo el tiempo.
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios;