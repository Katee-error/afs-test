import { useEffect } from "react";
export function useOrganization(
  token: string | null,
  organizationId: string,
  setOrgData: (data: any) => void
) {
  useEffect(() => {
    if (!token) return;

    async function fetchOrganization() {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        };

        const response = await fetch(
          `https://test-task-api.allfuneral.com/companies/${organizationId}`,
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`Organization retrieval error: ${response.status}`);
        }

        const data = await response.json();
        setOrgData(data);
      } catch (err: any) {
        console.error(err.message || "Unknown error");
      }
    }

    fetchOrganization();
  }, [token, organizationId, setOrgData]);
}