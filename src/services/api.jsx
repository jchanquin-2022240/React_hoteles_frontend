import axios from 'axios';

const api = axios.create({

    baseURL: 'http://127.0.0.1:3000/hoteles/v1/hotel',
    timeout: 2000,
});


export const createHotel = async (data, token) => {
    try {
        const response = await api.post('/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addBedroom = async (idHotel, idBedroom, token) => {
    try {
        const response = await api.post(`/${idHotel}/bedroom`, { idBedroom }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeBedroom = async (idHotel, idBedroom, token) => {
    try {
        const response = await api.delete(`/${idHotel}/bedroom`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { idBedroom }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getHotels = async (token) => {
    try {
        const response = await api.get('/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getHotelsAvailable = async (token) => {
    try {
        const response = await api.get('/hotels', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateHotel = async (id, data, token) => {
    try {
        const response = await api.put(`/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteHotel = async (id, token) => {
    try {
        const response = await api.delete(`/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
