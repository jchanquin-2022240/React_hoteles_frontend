import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/hoteles/v1',
    timeout: 5000
})


export const eventPost = async(data) => {
    try {
        return await apiClient.post('/event', data)
    } catch (e) {
       return{error: true,
       e 
       }
    }
}


export const eventPut = async(id, data) => {
    try {
        return await apiClient.put(`/event/${id}`, data)
    } catch (e) {
       return{error: true,
       e 
       }
    }
}

export const eventDelete = async(id) => {
    try {
        return await apiClient.delete(`/event/${id}`)
    } catch (e) {
       return{error: true,
       e 
       }
    }
}

export const eventGet = async() => {
    try {
        return await apiClient.get('/event')
    } catch (e) {
       return{error: true,
       e 
       }
    }
}


export const searching = async() => {
    try {
        return await apiClient.get('/searching')
    } catch (e) {
       return{error: true,
       e 
       }
    }
}


export const resourcesAdd = async(data, id) => {
    try {
        return await apiClient.post(`/event/resourcesAdd/${id}`, data)
    } catch (e) {
       return{error: true,
       e 
       }
    }
}

export const deleteResource = async (eventId, data) => {
    try {
        return await apiClient.post( `/event/deleteResource/${eventId}`, data);
    } catch (e) {
        return { error: true, e };
    }
};

export const resourceGet = async() => {
    try {
        return await apiClient.get('/resource/package')
    } catch (e) {
       return{error: true,
       e 
       }
    }
}