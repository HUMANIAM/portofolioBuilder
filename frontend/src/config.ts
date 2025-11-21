export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Base URL without the /api suffix, useful for static assets like CV and images
export const API_BASE = API_URL.replace(/\/api$/, '');
