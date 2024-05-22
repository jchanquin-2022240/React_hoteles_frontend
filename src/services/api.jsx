import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/hoteles/v1',
    timeout: 2000
})

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem('user')
        if (userDetails) {
            const token = JSON.parse(userDetails || {}).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)

export const login = async (data) => {
    try {
        console.log({ data })
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try {
        console.log({ data })
        return await apiClient.post('/user/register', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const postHabitacion = async (data) => {
    try {
        return await apiClient.post('/habitaciones', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getHotels = async () => {
    try {
        const response = await apiClient.get('/hotel');
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};


export const getHotelsAvailable = async (searchQuery) => {
    try {
        const { nameHotel, installations, location, category } = searchQuery;
        const response = await apiClient.get('/hotels/available', {
            params: { nameHotel, installations, location, category }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting available hotels:', error);
        throw error;
    }
};

export const getHotelDetails = async (id) => {
    try {
        const response = await apiClient.get(`/hotel/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting hotel details:', error);
        throw error;
    }
};

export const createHotel = async (data) => {
    try {
        const response = await apiClient.post('/hotel/create', data);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
}

export const updateHotel = async (id, data) => {
    try {
        const response = await apiClient.put(`/hotel/update/${id}`, data);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};


export const deleteHotel = async (id) => {
    try {
        const response = await apiClient.delete(`/hotel/${id}`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const habitacionesByHotelId = async (id) => {
    try {
        const response = await apiClient.get(`/habitaciones/hotel/habitaciones/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching habitaciones:', e);
        return {
            error: true,
            message: e.message
        };
    }
};

