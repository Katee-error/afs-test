'use client'
import { fetchWithAuth } from "@/hooks/fetchAuth";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { token, loading, error } = useAuth("frontend-user");

  const handleLoadCompany = async () => {
    if (!token) return;

    try {
      const company = await fetchWithAuth(token, "https://test-task-api.allfuneral.com/companies/12");
      console.log("Company info:", company);
    } catch (err: any) {
      console.error("Ошибка загрузки:", err.message);
    }
  };

  if (loading) return <p>Загрузка токена...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div style={{ padding: 32 }}>
      <button onClick={handleLoadCompany}>Загрузить компанию</button>
    </div>
  );
};

