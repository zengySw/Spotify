const BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : "";

export async function getTracks() {
  const response = await fetch(`${BASE_URL}/tracks`);

  if (!response.ok) {
    throw new Error(`Не удалось загрузить треки: ${response.status}`);
  }

  return response.json();
}
