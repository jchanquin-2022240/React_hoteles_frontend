import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/hoteles/v1',
    timeout: 2000
})

export const getHoteles = async () => {
    try {
        return await apiClient.get('/hotel/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const postHotel = async (data) => {
    try {
        return await apiClient.post('/hotel/', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}