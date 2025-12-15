import { ApiResponse, DiagnosisRequest, MarketAnalysisRequest, GovernmentSchemeRequest } from '../types/api';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async diagnoseCrop(image: File): Promise<ApiResponse<string>> {
    const formData = new FormData();
    formData.append('image', image);

    return this.makeRequest<string>('/diagnose', {
      method: 'POST',
      body: formData,
    });
  }

  async analyzeMarket(query: string): Promise<ApiResponse<string>> {
    return this.makeRequest<string>('/market-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  }

  async getGovernmentSchemes(query: string): Promise<ApiResponse<string>> {
    return this.makeRequest<string>('/government-schemes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  }

  async checkHealth(): Promise<ApiResponse<any>> {
    return this.makeRequest<any>('/health', {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();