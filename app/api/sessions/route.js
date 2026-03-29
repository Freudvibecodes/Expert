const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

async function supabase(method, path, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": method === "POST" ? "return=representation" : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const student = searchParams.get("student");
  const all = searchParams.get("all");
  const password = searchParams.get("password");

  if (all === "true") {
    if (password !== process.env.PROFESSOR_PASSWORD) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await supabase("GET", "sessions?order=date.desc&select=*");
    return Response.json(data);
  }

  if (student) {
    const encoded = encodeURIComponent(student);
    const data = await supabase("GET", `sessions?student_name=eq.${encoded}&order=date.desc&select=*`);
    return Response.json(data);
  }

  return Response.json({ error: "Missing parameters" }, { status: 400 });
}

export async function POST(req) {
  const body = await req.json();
  const { student_name, mode, modality, session_type, issue, transcript, review } = body;

  if (!student_name || !mode || !modality || !session_type) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const data = await supabase("POST", "sessions", {
    student_name,
    mode,
    modality,
    session_type,
    issue: issue || "",
    transcript: transcript || "",
    review: review || "",
  });

  return Response.json(data);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const student = searchParams.get("student");

  if (!id || !student) {
    return Response.json({ error: "Missing id or student" }, { status: 400 });
  }

  // Only allow deleting your own sessions
  const encoded = encodeURIComponent(student);
  await supabase("DELETE", `sessions?id=eq.${id}&student_name=eq.${encoded}`);
  return Response.json({ success: true });
}
