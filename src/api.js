const apiUrl = process.env.REACT_APP_API_URL;

export async function sendMessage(message) {
  const response = await fetch(`${apiUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });
  const data = await response.json();
  return data;
}
