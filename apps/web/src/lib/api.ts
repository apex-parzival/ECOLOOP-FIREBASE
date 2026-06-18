import axios from 'axios';

const getBaseURL = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (configuredUrl) {
    let url = configuredUrl;
    // Ensure it ends with /api but not with a trailing slash after it
    if (!url.endsWith('/api') && !url.endsWith('/api/')) {
      url = url.replace(/\/+$/, '') + '/api';
    }
    return url.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return `${protocol}//${hostname}:4000/api`;
    }
    return `${window.location.origin.replace(/\/+$/, '')}/api`;
  }

  let url = 'http://localhost:4000/api';
  // Ensure it ends with /api but not with a trailing slash after it
  if (!url.endsWith('/api') && !url.endsWith('/api/')) {
    url = url.replace(/\/+$/, '') + '/api';
  }
  return url.replace(/\/+$/, ''); // Remove any trailing slashes
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Interceptor to attach JWT token to all requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ecoloop_token');
    const isPublicRoute = 
      config.url?.includes('/auth/register') ||
      config.url?.includes('/auth/login') ||
      config.url?.includes('/auth/refresh');
    if (token && config.headers && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error?.config?.url || '';
    const isAuthRoute = url.includes('/auth/');
    if (error?.response?.status === 401 && !isAuthRoute) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ecoloop_token');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
