const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/wallet`;

interface WalletDetailResult {
  success: boolean;
  data: any;
  error: string;
}

const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('agentic_session');
    if (session) {
      try {
        const token = JSON.parse(session).token;
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (e) {}
    }
  }
  
  return headers;
};
export async function getWalletDetail(): Promise<WalletDetailResult> {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await res.json();
    return { success: true, data: data.data, error: '' };
  } catch (error: any) {
    return { success: false, data: [], error: error.message || 'Network Error' };
  }
}
