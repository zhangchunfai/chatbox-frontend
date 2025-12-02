console.log("API URL:", process.env.REACT_APP_API_URL);
const apiUrl = process.env.REACT_APP_API_URL;
export async function sendMessage(message) {
  const response = await fetch(`${apiUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }), // 改这里
  });
  const data = await response.json();
  return data;
}
