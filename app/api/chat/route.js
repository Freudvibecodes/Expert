export async function POST(req) {
  try {
    const { messages, system } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: "No API key found", text: "" }, { status: 500 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: data, text: "" }, { status: response.status });
    }

    let text = data.content?.map((b) => b.text || "").join("") || "";
    // Strip any asterisk actions before returning
    text = text.replace(/\*[^*]+\*/g, "").replace(/\s+/g, " ").trim();

    return Response.json({ text });

  } catch (err) {
    return Response.json({ error: err.message, text: "" }, { status: 500 });
  }
}
