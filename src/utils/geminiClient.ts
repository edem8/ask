export async function sendMessage(text: string): Promise<string | null> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error("Failed to fetch response");

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error(error);
    return null;
  }
}
