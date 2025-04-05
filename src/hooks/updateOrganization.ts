const API_URL = "https://test-task-api.allfuneral.com";
const TOKEN_KEY = "Authorization";

const getHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { [TOKEN_KEY]: token } : {}),
  };
};

export async function updateOrganization(orgId: string, body: any) {
  const response = await fetch(`${API_URL}/companies/${orgId}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Ошибка обновления");
  return response.json();
}

export async function deleteOrganization(orgId: string) {
  const response = await fetch(`${API_URL}/companies/${orgId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Ошибка удаления");
  return response.json();
}

export async function uploadImage(orgId: string, file: File) {
  const token = localStorage.getItem("authToken");
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/companies/${orgId}/image`, {
    method: "POST",
    headers: {
      ...(token ? { [TOKEN_KEY]: token } : {}),
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Ошибка загрузки изображения");
  return response.json();
}