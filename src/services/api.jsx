import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/hoteles/v1',
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
