import axiosInstance from '../utils/axios';

const nouvelle_affaire = async (affaire) => {
    console.log("affaire on envoie: ", affaire);
    const response = await axiosInstance.post(`/api/affaires`, {...affaire});
    console.log("response : ", response);
    return response
}

const status = async () => {
    const response = await axiosInstance.get(`/api/status`);
    return response.data;
}


const API = {
    nouvelle_affaire,

};

export default API;

