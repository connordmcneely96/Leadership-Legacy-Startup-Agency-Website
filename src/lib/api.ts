// API Integration for Cloudflare Workers
// Frontend utilities to interact with backend APIs

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// ================================
// Types
// ================================

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  serviceInterest?: string;
  budgetRange?: string;
  timeline?: string;
  referralSource?: string;
}

export interface NewsletterData {
  email: string;
  source?: string;
}

export interface AnalyticsEvent {
  eventType: string;
  pagePath: string;
  referrer?: string;
  metadata?: Record<string, any>;
  sessionId?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ================================
// API Client
// ================================

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Request failed',
        };
      }

      return {
        success: true,
        data,
        message: data.message,
      };
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Submit contact form
   */
  async submitContact(data: ContactFormData): Promise<ApiResponse> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Subscribe to newsletter
   */
  async subscribeNewsletter(data: NewsletterData): Promise<ApiResponse> {
    return this.request('/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Track analytics event
   */
  async trackEvent(data: AnalyticsEvent): Promise<ApiResponse> {
    return this.request('/analytics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health', {
      method: 'GET',
    });
  }
}

// ================================
// Export singleton instance
// ================================

export const api = new ApiClient();

// ================================
// React Hooks for API calls
// ================================

export { useContactForm } from './hooks/useContactForm';
export { useAnalytics } from './hooks/useAnalytics';
