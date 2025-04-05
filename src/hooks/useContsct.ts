import { useState, useEffect } from "react";

export function useContact(token: string | null, contactId: string) {
  const [contactData, setContactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchContact() {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        };

        const response = await fetch(`https://test-task-api.allfuneral.com/contacts/${contactId}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`Ошибка получения контакта: ${response.status}`);
        }

        const data = await response.json();
        setContactData(data);
      } catch (err: any) {
        setError(err.message || "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, [token, contactId]);

  return { contactData, loading, error, setContactData };
}
