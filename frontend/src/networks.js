import axios from 'axios';

// const ip="http://134.209.150.89"
const ip ='http://' + window.location.hostname;
// const ip="http://192.168.31.117"
const BASE_URL = ip + ":5000";
console.log(BASE_URL)
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['access-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    sessionStorage.clear();
    window.location.href = '/';
  }
  return Promise.reject(error);
});

export const login = (data) => {
  return axiosInstance.post('/api/users/login', data);
};

export const getDashboardCount = () => {
  return axiosInstance.get('/api/dashboard/getdashboardcount');
};

export const getRevenueChart = (period) => {
  return axiosInstance.post('/api/dashboard/getrevenuechart', { period });
};

export const getLowStockMedicines = () => {
  return axiosInstance.get('/api/dashboard/getlowstockmedicines');
};

// Pharmacy API
export const addMedicine = (data) => {
  return axiosInstance.post('/api/medicines/addmedicine', data);
};

export const getMedicines = () => {
  return axiosInstance.get('/api/medicines/getmedicines');
};

export const updateMedicine = (data) => {
  return axiosInstance.post('/api/medicines/edit', data);
};

export const deleteMedicine = (data) => {
  return axiosInstance.post('/api/medicines/delete', { id: data });
};

// Billing API
export const addBillingRecord = (data) => {
  return axiosInstance.post('/api/billing/add', data);
};

export const getBillingRecords = () => {
  return axiosInstance.get('/api/billing/get');
};

export const updateBillingRecord = (data) => {
  return axiosInstance.post('/api/billing/edit', data);
};

export const deleteBillingRecord = (id) => {
  return axiosInstance.post('/api/billing/delete', { id });
};
