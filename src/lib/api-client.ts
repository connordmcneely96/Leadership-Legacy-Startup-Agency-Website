/**
 * API Client for Leadership Suite
 * Handles all API requests to Cloudflare Workers backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'Request failed',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

// Documents API
export const documentsApi = {
  list: (params: { userId?: string; type?: string; sort?: string; filter?: string }) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    return fetchApi(`/documents?${query}`);
  },
  create: (data: { userId: string; type: string; title: string; content?: string; size?: number }) =>
    fetchApi('/documents', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ title: string; content: string; size: number; starred: number }>) =>
    fetchApi(`/documents/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi(`/documents/${id}`, { method: 'DELETE' }),
  star: (id: string) => fetchApi(`/documents/${id}/star`, { method: 'POST' }),
};

// Files API (Drive)
export const filesApi = {
  list: (params: { userId?: string; folder?: string }) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    return fetchApi(`/files?${query}`);
  },
  upload: (formData: FormData) =>
    fetchApi('/files/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type with boundary
    }),
  createFolder: (data: { userId: string; folderName: string; parentPath?: string }) =>
    fetchApi('/files/folder', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ filename: string; folderPath: string }>) =>
    fetchApi(`/files/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi(`/files/${id}`, { method: 'DELETE' }),
};

// Tasks API
export const tasksApi = {
  list: (params: { userId?: string; status?: string } = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    return fetchApi(`/tasks?${query}`);
  },
  create: (data: {
    userId: string;
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: number;
  }) => fetchApi('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  update: (
    id: string,
    data: Partial<{
      title: string;
      description: string;
      status: string;
      priority: string;
      dueDate: number;
      assigneeId: string;
    }>
  ) => fetchApi(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi(`/tasks/${id}`, { method: 'DELETE' }),
};

// Calendar API
export const calendarApi = {
  list: (params: { userId?: string; start?: string; end?: string } = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    return fetchApi(`/calendar/events?${query}`);
  },
  create: (data: {
    userId: string;
    title: string;
    startTime: number;
    endTime: number;
    description?: string;
    location?: string;
  }) => fetchApi('/calendar/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (
    id: string,
    data: Partial<{
      title: string;
      description: string;
      startTime: number;
      endTime: number;
      location: string;
    }>
  ) => fetchApi(`/calendar/events/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi(`/calendar/events/${id}`, { method: 'DELETE' }),
};

// Mail API
export const mailApi = {
  list: (params: { userId?: string; folder?: string } = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    return fetchApi(`/mail?${query}`);
  },
  send: (data: {
    userId: string;
    to: string[];
    subject: string;
    bodyHtml: string;
    bodyText?: string;
    cc?: string[];
  }) => fetchApi('/mail/send', { method: 'POST', body: JSON.stringify(data) }),
  saveDraft: (data: { userId: string; to?: string[]; subject: string; bodyHtml: string }) =>
    fetchApi('/mail/draft', { method: 'POST', body: JSON.stringify(data) }),
  toggleRead: (id: string) => fetchApi(`/mail/${id}`, { method: 'PATCH' }),
  delete: (id: string) => fetchApi(`/mail/${id}`, { method: 'DELETE' }),
};

// Meetings API
export const meetingsApi = {
  list: (params: { userId?: string } = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    return fetchApi(`/meetings?${query}`);
  },
  create: (data: {
    userId: string;
    title: string;
    scheduledAt: number;
    duration?: number;
    participants?: string[];
  }) => fetchApi('/meetings', { method: 'POST', body: JSON.stringify(data) }),
  join: (code: string) => fetchApi(`/meetings/join/${code}`),
  update: (
    id: string,
    data: Partial<{
      title: string;
      status: string;
      scheduledAt: number;
      duration: number;
      participants: string[];
    }>
  ) => fetchApi(`/meetings/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// Albums API
export const albumsApi = {
  list: (params: { userId?: string } = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    return fetchApi(`/albums?${query}`);
  },
  create: (data: { userId: string; name: string }) =>
    fetchApi('/albums', { method: 'POST', body: JSON.stringify(data) }),
  addPhoto: (albumId: string, fileId: string) =>
    fetchApi(`/albums/${albumId}/photos`, {
      method: 'POST',
      body: JSON.stringify({ fileId }),
    }),
  delete: (id: string) => fetchApi(`/albums/${id}`, { method: 'DELETE' }),
};

// Storage API
export const storageApi = {
  getQuota: (userId: string) => fetchApi(`/storage/quota?user_id=${userId}`),
};

// AI Assistant API
export const aiApi = {
  chat: (data: { conversationId: string; message: string; userId?: string }) =>
    fetchApi('/assistant/chat', { method: 'POST', body: JSON.stringify(data) }),
  history: (conversationId: string) => fetchApi(`/assistant/history?conversationId=${conversationId}`),
};
