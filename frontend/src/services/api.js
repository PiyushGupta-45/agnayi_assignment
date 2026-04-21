import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const loginUser = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const fetchLeads = async (params = {}) => {
  const { data } = await api.get('/leads', { params });
  return data;
};

export const fetchLead = async (id) => {
  const { data } = await api.get(`/leads/${id}`);
  return data;
};

export const createLead = async (payload) => {
  const { data } = await api.post('/leads', payload);
  return data;
};

export const updateLead = async (id, payload) => {
  const { data } = await api.put(`/leads/${id}`, payload);
  return data;
};

export const deleteLeadById = async (id) => {
  const { data } = await api.delete(`/leads/${id}`);
  return data;
};

export default api;
