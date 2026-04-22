const API_URL = 'http://localhost:5001/api/wallet';

interface WalletDetailResult {
  success: boolean;
  data: any;
  error: string;
}

const getHeaders = () => {
  const session = localStorage.getItem('agentic_session');
  const token = session ? JSON.parse(session).token : '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}
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
