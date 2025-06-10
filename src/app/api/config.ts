export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
  },
  // User endpoints
  users: {
    me: `${API_BASE_URL}/api/users/me`,
    getAll: `${API_BASE_URL}/api/users/getAllUsers`,
    getById: `${API_BASE_URL}/api/users/getById`,
    update: `${API_BASE_URL}/api/users/update`,
    delete: `${API_BASE_URL}/api/users/delete`,
  },
  // Add more endpoints as needed
} as const;
