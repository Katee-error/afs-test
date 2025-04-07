'use client'
import { useEffect } from "react";
export function useContact(
  token: string | null,
  contactId: string,
  setContactData: (data: any) => void
) {
  useEffect(() => {
    if (!token) return;

    async function fetchContact() {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        };

        const response = await fetch(
          `https://test-task-api.allfuneral.com/contacts/${contactId}`,
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`Error receiving a contact: ${response.status}`);
        }

        const data = await response.json();
        setContactData(data);
      } catch (err: any) {
        console.error(err.message || "Unknown error");
      }
    }

    fetchContact();
  }, [token, contactId, setContactData]);
} 