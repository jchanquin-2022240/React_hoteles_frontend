import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/hoteles/v1',
    timeout: 2000
})

export const getHabitaciones = async () => {
    try {
        return await apiClient.get('/habitacion/')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const postHabitacion = async (data) => {
    try {
        return await apiClient.post('/habitacion', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}