import axiosInstance from '../utils/axios';

const nouvelle_affaire = async (affaire) => {
    const response = await axiosInstance.post(`/api/affaires`, {...affaire})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
}

const get_affaires = async () => {
    const response = await axiosInstance.get(`/api/affaires`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};

const recuperer_statuts = async () => {
    await axiosInstance.get(`/api/status`)
        .then((response) => {

            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

const recuperer_clients = async () => {
    const response = await axiosInstance.get(`/api/clients`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};

const recuperer_salaries = async () => {
    const response = await axiosInstance.get(`/api/salaries`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};

const API = {
    nouvelle_affaire,
    recuperer_statuts,
    recuperer_clients,
    recuperer_salaries,
    get_affaires

};

export default API;

