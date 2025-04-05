import { useState, useEffect } from "react";

export function useOrganization(token: string | null, organizationId: string) {
  const [orgData, setOrgData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchOrganization() {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        };

        const response = await fetch(`https://test-task-api.allfuneral.com/companies/${organizationId}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`Ошибка получения организации: ${response.status}`);
        }

        const data = await response.json();
        setOrgData(data);
      } catch (err: any) {
        setError(err.message || "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    }

    fetchOrganization();
  }, [token, organizationId]);

  return { orgData, loading, error, setOrgData };
}
