const API_URL = "https://test-task-api.allfuneral.com";
const TOKEN_KEY = "Authorization";

const getHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { [TOKEN_KEY]: token } : {}),
  };
};

export async function initAuth(user = "test-user") {
  try {
    const response = await fetch(`${API_URL}/auth?user=${user}`);
    if (!response.ok) throw new Error("Authorization error");
    const token = response.headers.get("Authorization");
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Authorization successful");
    } else {
      throw new Error("Token not received.");
    }
  } catch (error) {
    console.error("Authorization error:", error);
  }
}

export async function updateOrganization(orgId: string, body: any) {
  console.log("PATCH body:", JSON.stringify(body, null, 2));
  const response = await fetch(`${API_URL}/companies/${orgId}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) {
    console.error("PATCH error:", response.status, text);
    throw new Error("Update error");
  }
  return JSON.parse(text);
}

export async function deleteOrganization(orgId: string) {
  const response = await fetch(`${API_URL}/companies/${orgId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  
  if (!response.ok) {
    let errorData: any = {};
    try {
      const text = await response.text();
      errorData = text ? JSON.parse(text) : {};
    } catch (err) {
    }
    console.error("DELETE error:", response.status, errorData);
    throw new Error(errorData.error || "Organization deletion error");
  }
  
  try {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    return {};
  }
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
  if (!response.ok) throw new Error("Image loading error");
  return response.json();
}
