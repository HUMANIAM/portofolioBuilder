const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('adminToken');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  
  return response.json();
}

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
  
  verify: async () => {
    return fetchAPI('/auth/verify');
  },
};

// Portfolio API
export const portfolioAPI = {
  getPortfolio: async () => {
    return fetchAPI('/portfolio');
  },
  
  updateSocialLinks: async (data: { github: string; linkedin: string; email: string }) => {
    return fetchAPI('/portfolio/social-links', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  updateAboutMe: async (data: { whatDrivesMe: string; background: string; experience: string }) => {
    return fetchAPI('/portfolio/about-me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  // Skills
  getSkills: async () => {
    return fetchAPI('/portfolio/skills');
  },
  
  addSkillCategory: async (data: { category: string; skills: string[] }) => {
    return fetchAPI('/portfolio/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateSkillCategory: async (id: string, data: { category: string; skills: string[] }) => {
    return fetchAPI(`/portfolio/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteSkillCategory: async (id: string) => {
    return fetchAPI(`/portfolio/skills/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Projects
  getProjects: async () => {
    return fetchAPI('/portfolio/projects');
  },
  
  addProject: async (data: any) => {
    return fetchAPI('/portfolio/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  updateProject: async (id: string, data: any) => {
    return fetchAPI(`/portfolio/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  deleteProject: async (id: string) => {
    return fetchAPI(`/portfolio/projects/${id}`, {
      method: 'DELETE',
    });
  },
  
  // CV
  uploadCV: async (file: File) => {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('cv', file);
    
    const response = await fetch(`${API_URL}/portfolio/cv`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'CV upload failed');
    }
    
    return response.json();
  },
  
  deleteCV: async () => {
    return fetchAPI('/portfolio/cv', {
      method: 'DELETE',
    });
  },
};
