import { User } from '@/src/lib/types/User';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Making login request to:', `${baseUrl}/api/user/login`);
      
      const response = await fetch(`${baseUrl}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
        mode: 'cors'
      });
      
      console.log('Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      // Store the token when login is successful
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${baseUrl}/api/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      // Clear auth data
      localStorage.removeItem('token');
      
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await fetch(`${baseUrl}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to get user');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }
};

export default AuthService;