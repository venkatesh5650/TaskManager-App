import axios from 'axios';

// Create axios instance for backend API
const API = axios.create({
  baseURL: 'https://usermanagement-backend-2-0paz.onrender.com/api', // Backend root URL
});

// Automatically attach JWT token to every request (if exists)
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----------- Auth APIs -----------
export const signup = (data) => API.post('/auth/signup', data);   // Register new user
export const login = (data) => API.post('/auth/login', data);     // Login & get JWT
export const getProfile = () => API.get('/auth/profile');         // Fetch logged-in user

// ----------- Task APIs -----------
export const getTasks = (query = '', status = '') =>
  API.get(`/tasks?q=${query}&status=${status}`); // Search + filter tasks

export const createTask = (data) => API.post('/tasks', data);     // Create task
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data); // Update task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);     // Delete task

export default API;
