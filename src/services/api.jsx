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
        return{
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try {
        console.log({data})
        return await apiClient.post('/user/register', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

// export const getHabitaciones = async () => {
//     try {
//         return await apiClient.get('/habitaciones/')
//     } catch (e) {
//         return{
//             error: true,
//             e
//         }
//     }
// }

export const postHabitacion = async (data) => {
    console.log("estoy mandando data",data)
    try {
        return await apiClient.post('/habitaciones', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const habitacionesByHotelId = async (id) => {
    try {
        const response = await apiClient.get(`/habitaciones/hotel/${id}`);
        return response.data; // Devuelve los datos de la respuesta
    } catch (e) {
        console.error('Error fetching habitaciones:', e);
        return {
            error: true,
            message: e.message
        };
    }
};

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

export const putHabitacion = async (id, data) => {
    try {
        return await apiClient.put(`/habitaciones/${id}`, data);
    } catch (e) {
        return { error: true, e };
    }
};



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

export const reservacionesByHabitacionId = async (id) => {
    try {
        const response = await apiClient.get(`/reservacion/habitacion/${id}`);
        return response.data; // Devuelve los datos de la respuesta
    } catch (e) {
        console.error('Error fetching habitaciones:', e);
        return {
            error: true,
            message: e.message
        };
    }
};


/* new things */

export const deleteReservacion = async (id) => {
    try {
        return await apiClient.delete(`/reservacion/${id}`);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateReservacion = async (id, data) => {
    try {
        return await apiClient.put(`/reservacion/${id}`, data);
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
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};


export const getHotelsAvailable = async (searchQuery) => {
    try {
        const { nameHotel, installations, location, category } = searchQuery;
        const response = await apiClient.get('/hotel', {
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
        const response = await apiClient.get(`/hotel/${ id }`);
        return response.data;
    } catch (error) {
        console.error('Error getting hotel details:', error);
        throw error;
    }
};

export const createHotel = async (data) => {
    try {
        console.log("estoy enviando",{ data });
        const response = await apiClient.post('/hotel', data);
        return response.data;
    } catch (error) {
        return {
            error: true,
            error
        };
    }
}

export const updateHotel = async (id, data) => {
    try {
        const response = await apiClient.put(`/hotel/${ id }`, data);
        return response.data;
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};


export const deleteHotel = async (id) => {
    try {
        const response = await apiClient.delete(`/hotel/${ id }`);
        return response.data;
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};

