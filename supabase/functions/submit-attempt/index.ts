const allowedOrigins = new Set([
  "https://comptechgps-byte.github.io",
  "http://127.0.0.1:3000",
  "http://localhost:3000"
]);

const jsonHeaders = { "Content-Type": "application/json; charset=utf-8" };

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin") ?? "";
  if (!allowedOrigins.has(origin)) {
    return new Response("Origin not allowed", { status: 403 });
  }

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  if (!anonKey || !serviceRoleKey || !supabaseUrl) {
    return Response.json({ error: "Score storage is not configured." }, { status: 503, headers: { ...jsonHeaders, ...corsHeaders } });
  }
  if (request.headers.get("apikey") !== anonKey) {
    return Response.json({ error: "Unauthorized." }, { status: 401, headers: { ...jsonHeaders, ...corsHeaders } });
  }

  let attempt: Record<string, unknown>;
  try {
    attempt = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400, headers: { ...jsonHeaders, ...corsHeaders } });
  }

  const enrollmentNumber = typeof attempt.enrollmentNumber === "string" ? attempt.enrollmentNumber.trim() : "";
  const candidateName = typeof attempt.name === "string" ? attempt.name.trim() : "";
  const score = attempt.score;
  const maximumMarks = attempt.maxMarks;
  const percentage = attempt.percentage;
  const startedAt = typeof attempt.startedAt === "string" ? attempt.startedAt : "";
  const submittedAt = typeof attempt.submittedAt === "string" ? attempt.submittedAt : "";
  const submissionReason = typeof attempt.submissionReason === "string" ? attempt.submissionReason : "";

  if (
    enrollmentNumber.length < 1 || enrollmentNumber.length > 40 ||
    candidateName.length < 1 || candidateName.length > 100 ||
    !Number.isInteger(score) || Number(score) < 0 || Number(score) > 10 ||
    maximumMarks !== 10 || !Number.isInteger(percentage) ||
    Number(percentage) !== Math.round(Number(score) / 10 * 100) ||
    !Number.isFinite(Date.parse(startedAt)) || !Number.isFinite(Date.parse(submittedAt)) ||
    submissionReason.length > 100
  ) {
    return Response.json({ error: "Attempt data is incomplete or invalid." }, { status: 400, headers: { ...jsonHeaders, ...corsHeaders } });
  }

  const result = await fetch(`${supabaseUrl}/rest/v1/quiz_attempts`, {
    method: "POST",
    headers: {
      "apikey": serviceRoleKey,
      "Authorization": `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({
      enrollment_number: enrollmentNumber,
      candidate_name: candidateName,
      score,
      maximum_marks: maximumMarks,
      percentage,
      started_at: startedAt,
      submitted_at: submittedAt,
      submission_reason: submissionReason
    })
  });

  if (!result.ok) {
    console.error("Supabase insert failed:", result.status, await result.text());
    return Response.json({ error: "Could not save this score." }, { status: 502, headers: { ...jsonHeaders, ...corsHeaders } });
  }
  return Response.json({ saved: true }, { status: 201, headers: { ...jsonHeaders, ...corsHeaders } });
});