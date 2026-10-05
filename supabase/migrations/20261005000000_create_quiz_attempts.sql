create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  enrollment_number text not null check (char_length(enrollment_number) between 1 and 40),
  candidate_name text not null check (char_length(candidate_name) between 1 and 100),
  score integer not null check (score between 0 and 10),
  maximum_marks integer not null check (maximum_marks = 10),
  percentage integer not null check (percentage between 0 and 100),
  started_at timestamptz not null,
  submitted_at timestamptz not null,
  submission_reason text not null check (char_length(submission_reason) <= 100),
  created_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;
revoke all on public.quiz_attempts from anon, authenticated;
grant insert, select on public.quiz_attempts to service_role;