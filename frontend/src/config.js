import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addInquiry = (data) => API.post('/inquiries/add', data);
export const getInquiries = () => API.get('/inquiries/get');
export const updateInquiryStatus = (id, status) => API.put(`/inquiries/update/${id}`, { status });

export default API;