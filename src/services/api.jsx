import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/hoteles/v1',
    timeout: 2000
})

export const getHabitaciones = async () => {
    try {
        return await apiClient.get('/habitaciones/')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const deleteHabitacion = async (id) => {
    try {
        return await apiClient.delete(`/habitaciones/${id}`);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const postHabitacion = async (data) => {
    try {
        return await apiClient.post('/habitaciones', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const putHabitacion = async (id, data) => {
    try {
        return await apiClient.put(`/habitaciones/${id}`, data);
    } catch (e) {
        return { error: true, e };
    }
};