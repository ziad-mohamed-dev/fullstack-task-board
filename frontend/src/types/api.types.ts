export interface SignUpData {
  username: string;
  password: string;
}

export interface SignInData {
  username: string;
  password: string;
}

export interface BoardDataApi {
  name: string;
  description: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: {
    _id: string;
    username: string;
  };
  board?: {
    _id: string;
    name: string;
    description: string;
    tasks: Array<{
      _id: string;
      name: string;
      status: string;
      icon: string;
      description: string;
    }>;
  };
}

export interface ValidationError {
  error: string;
  field?: string;
}

export interface RateLimitError {
  error: string;
  retryAfter?: number;
}
