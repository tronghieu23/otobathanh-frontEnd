import axios from 'axios';

const API_URL = 'http://localhost:3000';


// Account APIs
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

// Product APIs
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

// Manager Account APIs
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

export const getAccountByIdAPI = async (accountId) => {
    try {
        const response = await fetch(`${API_URL}/api/accounts/${accountId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch account');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching account:', error);
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

export const deleteCommentAPI = async (commentId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/comments/${commentId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// Cart APIs
export const addToCartAPI = async (cartData) => {
  try {
    const response = await axios.post(`${API_URL}/api/cart`, {
      quantity: cartData.quantity,
      product_id: cartData.product_id,
      account_id: cartData.account_id
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const getCartItemsAPI = async (accountId) => {
  try {
    const response = await axios.get(`${API_URL}/api/cart/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const updateCartItemAPI = async (cartItemId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/api/cart/${cartItemId}`, {
      quantity: quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCartAPI = async (cartItemId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/cart/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Order APIs
export const createOrderAPI = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders`, {
      account_id: orderData.account_id,
      phone: orderData.phone,
      name: orderData.name,
      email: orderData.email,
      payment_method: orderData.payment_method,
      note: orderData.note
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrdersByAccountAPI = async (accountId) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/account/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatusAPI = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/api/orders/${orderId}`, {
      status: status
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const deleteOrderAPI = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

export const getOrderDetailsAPI = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/detail/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

export const addOrderDetailAPI = async (orderDetailData) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders/detail`, {
      order_id: orderDetailData.order_id,
      product_id: orderDetailData.product_id,
      quantity: orderDetailData.quantity,
      price: orderDetailData.price
    });
    return response.data;
  } catch (error) {
    console.error('Error adding order detail:', error);
    throw error;
  }
};

export const deleteOrderDetailAPI = async (detailId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/orders/detail/${detailId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order detail:', error);
    throw error;
  }
};

// Role APIs
export const getAllRolesAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const getRoleByIdAPI = async (roleId) => {
  try {
    const response = await axios.get(`${API_URL}/api/roles/${roleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching role:', error);
    throw error;
  }
};

export const createRoleAPI = async (roleData) => {
  try {
    const response = await axios.post(`${API_URL}/api/roles/create`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
};

export const updateRoleAPI = async (roleId, roleData) => {
  try {
    const response = await axios.put(`${API_URL}/api/roles/${roleId}`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};

export const deleteRoleAPI = async (roleId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/roles/${roleId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
};

export const assignRoleToAccountAPI = async (accountId, roleId) => {
  try {
    const response = await axios.post(`${API_URL}/api/roles/assign`, {
      accountId,
      roleId
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning role:', error);
    throw error;
  }
};

export const removeRoleFromAccountAPI = async (accountId, roleId) => {
  try {
    const response = await axios.post(`${API_URL}/api/roles/remove`, {
      accountId,
      roleId
    });
    return response.data;
  } catch (error) {
    console.error('Error removing role:', error);
    throw error;
  }
};

// Category APIs
export const getAllCategoriesAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryByIdAPI = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/api/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

export const createCategoryAPI = async (categoryData) => {
  try {
    const response = await axios.post(`${API_URL}/api/categories/create`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategoryAPI = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/api/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategoryAPI = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};


