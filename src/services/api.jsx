import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/hoteles/v1',
    timeout: 2000
})

export const getReservaciones = async () => {
    try {
        return await apiClient.get('/reservacion/')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const postReservacion = async (data) => {
    try {
        return await apiClient.post('/reservacion', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}
