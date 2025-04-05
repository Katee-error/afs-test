
export const fetchWithAuth = async (
    token: string,
    url: string,
    options: RequestInit = {}
  ) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: token,
      "Content-Type": "application/json",
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Ошибка ${response.status}: ${message}`);
    }
  
    return await response.json();
  };
  