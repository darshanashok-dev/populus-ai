import { Query } from "@tanstack/react-query";

const API_BASE_URL = 'https://1h3aojrj64.execute-api.us-east-1.amazonaws.com/prod'

export interface SearchRequest {
  query: string;
  sessionId?: string;
}

export interface SummarizeRequest {
  content: string;
  sessionId?: string;
}

export interface WriteRequest {
  topic: string;
  outline?: string;
  sessionId?: string;
}

export const api = {
  searchPapers: async (request: SearchRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },

  summarizePaper: async (request: SummarizeRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Summarization failed');
    return response.json();
  },

  writePaper: async (request: WriteRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/write`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Query),
    });
    if (!response.ok) throw new Error('Paper generation failed');
    return response.json();
  },
};