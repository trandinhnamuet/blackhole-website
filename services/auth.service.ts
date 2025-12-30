const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

const ACCESS_TOKEN_KEY = 'blackhole_access_token';

class AuthService {
  private accessToken: string | null = null;
  private isRefreshing: boolean = false;
  private refreshSubscribers: Array<(token: string) => void> = [];
  private onLogoutCallback: (() => void) | null = null;

  constructor() {
    // Restore access token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    }
  }

  // Set callback to be called when auto-logout happens
  setOnLogoutCallback(callback: () => void): void {
    this.onLogoutCallback = callback;
  }

  // Helper to queue requests while refreshing token
  private subscribeTokenRefresh(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  private onRefreshed(token: string): void {
    this.refreshSubscribers.forEach(callback => callback(token));
    this.refreshSubscribers = [];
  }

  private onRefreshFailed(): void {
    this.refreshSubscribers = [];
  }

  // Authenticated fetch wrapper with automatic token refresh on 401
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Add access token to headers
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${this.accessToken}`,
    };

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    // If 401, try to refresh token and retry once
    if (response.status === 401 && !this.isRefreshing) {
      this.isRefreshing = true;

      try {
        const newToken = await this.refresh();
        this.isRefreshing = false;
        this.onRefreshed(newToken);

        // Retry the original request with new token
        const newHeaders = {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        };

        response = await fetch(url, {
          ...options,
          headers: newHeaders,
          credentials: 'include',
        });

        return response;
      } catch (refreshError) {
        this.isRefreshing = false;
        this.onRefreshFailed();
        
        // Clear tokens and trigger logout
        this.accessToken = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
        
        // Call logout callback if set
        if (this.onLogoutCallback) {
          this.onLogoutCallback();
        }

        throw new Error('Session expired. Please login again.');
      }
    }

    // If already refreshing, queue this request
    if (response.status === 401 && this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.subscribeTokenRefresh(async (newToken: string) => {
          try {
            const newHeaders = {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            };

            const retryResponse = await fetch(url, {
              ...options,
              headers: newHeaders,
              credentials: 'include',
            });

            resolve(retryResponse);
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    return response;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important: send cookies
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Login failed');
    }

    const data: LoginResponse = await response.json();
    this.accessToken = data.accessToken;
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    }
    return data;
  }

  async register(email: string, password: string, name: string): Promise<{ message: string; user: User }> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    return data;
  }

  async refresh(): Promise<string> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      this.accessToken = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    this.accessToken = data.accessToken;
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    }
    return data.accessToken;
  }

  async logout(): Promise<void> {
    try {
      await this.authenticatedFetch(`${API_URL}/auth/logout`, {
        method: 'POST',
      });
    } finally {
      this.accessToken = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    }
  }

  async logoutAll(): Promise<void> {
    try {
      await this.authenticatedFetch(`${API_URL}/auth/logout-all`, {
        method: 'POST',
      });
    } finally {
      this.accessToken = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    }
  }

  async getCurrentUser(): Promise<User | null> {
    console.log('[GET CURRENT USER] Starting...');
    console.log('[GET CURRENT USER] Current access token:', this.accessToken?.substring(0, 50) + '...');
    
    // If no access token, try to refresh from cookie first
    if (!this.accessToken) {
      console.log('[GET CURRENT USER] No access token, attempting refresh...');
      try {
        await this.refresh();
        console.log('[GET CURRENT USER] Refresh successful, new token:', this.accessToken?.substring(0, 50) + '...');
        // After refresh, access token should be set
        if (!this.accessToken) {
          console.log('[GET CURRENT USER] Still no access token after refresh');
          return null;
        }
      } catch (error) {
        // No valid refresh token cookie
        console.log('[GET CURRENT USER] Refresh failed:', error);
        return null;
      }
    }

    try {
      console.log('[GET CURRENT USER] Calling /auth/me with token:', this.accessToken?.substring(0, 50) + '...');
      // Make direct fetch call with current access token
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        credentials: 'include',
      });

      console.log('[GET CURRENT USER] Response status:', response.status);

      if (!response.ok) {
        // If 401, token might be expired, try refresh once
        if (response.status === 401) {
          console.log('[GET CURRENT USER] Got 401, attempting refresh...');
          try {
            await this.refresh();
            console.log('[GET CURRENT USER] Refresh successful, retrying /auth/me...');
            // Retry with new token
            const retryResponse = await fetch(`${API_URL}/auth/me`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.accessToken}`,
              },
              credentials: 'include',
            });

            console.log('[GET CURRENT USER] Retry response status:', retryResponse.status);

            if (!retryResponse.ok) {
              console.log('[GET CURRENT USER] Retry failed');
              return null;
            }

            const retryData = await retryResponse.json();
            console.log('[GET CURRENT USER] Success! User:', retryData.user.email);
            return retryData.user;
          } catch (refreshError) {
            console.log('[GET CURRENT USER] Refresh error:', refreshError);
            this.accessToken = null;
            if (typeof window !== 'undefined') {
              localStorage.removeItem(ACCESS_TOKEN_KEY);
            }
            return null;
          }
        }
        throw new Error('Failed to get current user');
      }

      const data = await response.json();
      console.log('[GET CURRENT USER] Success! User:', data.user.email);
      return data.user;
    } catch (error) {
      console.log('[GET CURRENT USER] Error:', error);
      return null;
    }
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  }

  clearAccessToken(): void {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return this.accessToken !== null;
  }
}

export const authService = new AuthService();
