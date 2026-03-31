const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

async function supabase(method, path, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": method === "POST" ? "return=representation,resolution=merge-duplicates" : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function POST(req) {
  const { name } = await req.json();
  if (!name || !name.trim()) return Response.json({ error: "Missing name" }, { status: 400 });
  await supabase("POST", "students", {
    name: name.trim(),
    last_seen: new Date().toISOString(),
  });
  return Response.json({ success: true });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get("password");
  if (password !== process.env.PROFESSOR_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await supabase("GET", "students?order=last_seen.desc&select=*");
  return Response.json(data || []);
}
