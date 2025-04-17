import axios from 'axios';

const API_URL = 'http://localhost:3000';

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

export const createProductAPI = async (formData) => {
    const response = await axios.post(`${API_URL}/api/products/create`, formData);
    return response.data;
};

export const forgotPasswordAPI = async (email) => {
    const response = await axios.post(`${API_URL}/api/accounts/forgot-password`, {
        email
    });
    return response.data;
};

export const resetPasswordAPI = async (email, verificationCode, newPassword) => {
    const response = await axios.post(`${API_URL}/api/accounts/reset-password`, {
        email,
        verificationCode,
        newPassword
    });
    return response.data;
};

export const getAllProductsAPI = async () => {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
};

export const deleteProductAPI = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProductAPI = async (productId, formData) => {
    try {
        const response = await axios.put(`${API_URL}/api/products/${productId}`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductByIdAPI = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/api/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Account APIs
export const getAllAccountsAPI = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch accounts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
    }
};

export const createAccountAPI = async (accountData) => {
    try {
        const response = await fetch('http://localhost:3000/api/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(accountData)
        });
        if (!response.ok) {
            throw new Error('Failed to create account');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};

export const updateAccountAPI = async (accountId, accountData) => {
    try {
        const response = await fetch(`http://localhost:3000/api/accounts/${accountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(accountData)
            
        });
        if (!response.ok) {
            throw new Error('Failed to update account');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating account:', error);
        throw error;
    }
};

export const deleteAccountAPI = async (accountId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/accounts/${accountId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Failed to delete account');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
};

// News APIs
export const getAllNewsAPI = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/news`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getNewsByIdAPI = async (newsId) => {
    try {
        const response = await axios.get(`${API_URL}/api/news/${newsId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createNewsAPI = async (newsData) => {
    try {
        const response = await axios.post(`${API_URL}/api/news/create`, newsData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateNewsAPI = async (newsId, newsData) => {
    try {
        const response = await axios.put(`${API_URL}/api/news/${newsId}`, newsData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteNewsAPI = async (newsId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/news/${newsId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update the comment API functions
export const createCommentAPI = async (commentData) => {
  try {
    const response = await axios.post(`${API_URL}/api/comments/create`, {
      comment: commentData.comment,
      accountId: commentData.accountId,
      productId: commentData.productId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const getCommentsByProductIdAPI = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/api/comments/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};


