import { API_ENDPOINTS } from "@/app/api/config";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method?: RequestMethod;
  body?: any;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new ApiError(response.status, error.message);
  }
  return response.json();
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    credentials = "include",
  } = options;

  // Get token from localStorage
  const token = localStorage.getItem("token");

  const requestOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      ...headers,
    },
    credentials: "include",
    mode: "cors",
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, requestOptions);
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Network error occurred");
  }
}

// Types
export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRequestDto {
  email: string;
  password: string;
  name: string;
}

export interface UserResponseDto {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface UserRequestByIdDto {
  id: number;
}

export interface UserUpdateRequestDto {
  id: number;
  email?: string;
  name?: string;
  password?: string;
}

export interface JwtResponse {
  token: string;
}

// Auth API functions
export const authApi = {
  login: async (credentials: UserLoginDto) => {
    const response = await apiRequest<JwtResponse>(API_ENDPOINTS.auth.login, {
      method: "POST",
      body: credentials,
    });
    // Store token in localStorage after successful login
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  register: (userData: UserRequestDto) =>
    apiRequest<UserResponseDto>(API_ENDPOINTS.auth.register, {
      method: "POST",
      body: userData,
    }),
};

// User API functions
export const userApi = {
  getCurrentUser: () =>
    apiRequest<UserResponseDto>(API_ENDPOINTS.users.me, {
      method: "GET",
    }),

  getAllUsers: () =>
    apiRequest<UserResponseDto[]>(API_ENDPOINTS.users.getAll, {
      method: "GET",
    }),

  getUserById: (userId: UserRequestByIdDto) =>
    apiRequest<UserResponseDto>(API_ENDPOINTS.users.getById, {
      method: "POST",
      body: userId,
    }),

  updateUser: (userData: UserUpdateRequestDto) =>
    apiRequest<UserResponseDto>(API_ENDPOINTS.users.update, {
      method: "POST",
      body: userData,
    }),

  deleteUser: (userId: UserRequestByIdDto) =>
    apiRequest<UserResponseDto>(API_ENDPOINTS.users.delete, {
      method: "DELETE",
      body: userId,
    }),
};
