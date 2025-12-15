export interface ApiResponse<T> {
  success: boolean;
  result?: T;
  error?: string;
  details?: string;
}

export interface DiagnosisRequest {
  image: File;
}

export interface MarketAnalysisRequest {
  query: string;
}

export interface GovernmentSchemeRequest {
  query: string;
}