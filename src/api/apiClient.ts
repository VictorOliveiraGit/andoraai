
const API_BASE_URL = "https://apiandora.onrender.com";

/**
 * Custom fetch wrapper for API requests
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Try to parse error message from response
      try {
        const errorData = await response.json();
        throw new Error(errorData.erro || errorData.mensagem || `API error: ${response.status}`);
      } catch (jsonError) {
        throw new Error(`API error: ${response.status}`);
      }
    }
    
    // For 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * Authentication API endpoints
 */
export const authApi = {
  login: async (login: string, senha: string) => {
    return apiRequest<{
      mensagem: string;
      usuario: {
        id: number;
        nome_completo: string;
        email: string;
      };
    }>("/login", {
      method: "POST",
      body: JSON.stringify({ login, senha }),
    });
  },
  
  loginWithGoogle: async (email: string, nome_completo: string, telefone?: string) => {
    return apiRequest<{
      mensagem: string;
      usuario: {
        id: number;
        nome_completo: string;
        email: string;
      };
    }>("/login/google", {
      method: "POST",
      body: JSON.stringify({ email, nome_completo, telefone }),
    });
  },
  
  register: async (userData: {
    login: string;
    senha: string;
    nome_completo: string;
    email: string;
    telefone: string;
  }) => {
    return apiRequest<{
      mensagem: string;
      id: number;
    }>("/usuarios", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
};

/**
 * Agenda API endpoints
 */
export interface ApiAppointment {
  data: string;
  hora_inicio: string;
  hora_termino: string;
  cliente: string;
  loja: string;
}

export const agendaApi = {
  getAppointments: async (loja?: string) => {
    const queryParams = loja ? `?loja=${loja}` : '';
    return apiRequest<ApiAppointment[]>(`/agenda${queryParams}`);
  },
};
