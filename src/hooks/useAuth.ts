'use client'
import { useEffect, useState } from "react";

export const useAuth = (username: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(`https://test-task-api.allfuneral.com/auth?user=${username}`);
        if (!response.ok) throw new Error("Ошибка авторизации");

        const authHeader = response.headers.get("Authorization");
        if (!authHeader) throw new Error("Токен не найден");

        setToken(authHeader); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getToken();
  }, [username]);

  return { token, loading, error };
};
