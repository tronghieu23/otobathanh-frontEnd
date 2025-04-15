import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const loginAPI = async (email, password) => {
    const response = await axios.post(`${API_URL}/api/accounts/login`, {
        email,
        password
    });
    return response.data;
}

export const registerAPI = async (fullName, email, password, image) => {
    const response = await axios.post(`${API_URL}/api/accounts/create`, {
        fullName,
        email,
        password,
        image
      });
    return response.data;
}

export const verifyAccountAPI = async (email, verificationCode) => {
    const response = await axios.post(`${API_URL}/api/accounts/verify`, {
        email,
        code: verificationCode
      });
    return response.data;
}

