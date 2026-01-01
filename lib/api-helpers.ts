/**
 * API Helper Functions
 * 
 * Utility functions for making API calls to the backend
 */

/**
 * Get the current user ID from localStorage
 * TODO: Replace with NextAuth session when implemented
 */
export function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('pennywise_user');
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return user.id || user.email; // Use id if available, fallback to email
  } catch {
    return null;
  }
}

/**
 * Make an authenticated API request
 */
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const userId = getUserId();
  
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-user-id': userId,
    ...options.headers,
  };

  return fetch(endpoint, {
    ...options,
    headers,
  });
}

/**
 * Handle API response and parse JSON
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

