import axios from 'axios';

const API_BASE_URL = 'https://autobizz-425913.uc.r.appspot.com/';

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get authorization token
export const getAuthorize = async () => {
  try {
    const response = await apiClient.post('/getAuthorize', {
      tokenType: 'frontEndTest',
    });
    return response.data;
  } catch (error) {
    console.error('Authorization error:', error);
    throw error;
  }
};

// Get sales data
export const getSales = async (params = {}) => {
  try {
    const {
      startDate = '',
      endDate = '',
      priceMin = '',
      email = '',
      phone = '',
      sortBy = 'date',
      sortOrder = 'asc',
      after = '',
      before = '',
      token,
    } = params;

    const queryParams = new URLSearchParams({
      startDate,
      endDate,
      priceMin: priceMin.toString(),
      email,
      phone,
      sortBy,
      sortOrder,
      after,
      before,
    });

    const response = await apiClient.get(`/sales?${queryParams.toString()}`, {
      headers: {
        'X-AUTOBIZZ-TOKEN': token,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Sales data error:', error);
    throw error;
  }
};

