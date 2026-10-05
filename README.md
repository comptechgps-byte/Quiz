# DBMS Quiz — Course 313302

A browser-based, five-minute quiz based on the five theory units in the MSBTE Database Management System (K Scheme) syllabus supplied with this project.

## Run locally

Open a Windows PowerShell terminal in this folder and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

Open the local URL printed by the server (normally `http://127.0.0.1:3000`). Keep the server window running during the quiz. Press Ctrl+C in that window to stop it. Opening `index.html` directly will not save scores to the project CSV.

Enter an enrolment number and name to start. Each attempt randomly draws 10 questions from the 500-question bank: exactly 4 Simple, 3 Intermediate, and 3 Complex questions. Questions and answer choices are shuffled. The five-minute timer submits automatically; submitting manually, switching or hiding the tab, or leaving focus on the browser window ends the attempt immediately.

## Results and marks

When run locally, each submitted attempt is appended to `quiz-scores.csv` in the project folder. The file is created on the first submission. The result page also offers CSV downloads for the current attempt or attempts from the current browser session.

## Host with a shared gradebook

The GitHub Pages workflow hosts the quiz, and a Supabase Edge Function stores attempts in a shared Postgres table. GitHub Pages cannot run the local PowerShell server; the hosted build sends submissions to Supabase instead. The public quiz does not contain the Supabase service-role key.

1. Create a Supabase project.
2. In the Supabase SQL Editor, run `supabase/migrations/20261005000000_create_quiz_attempts.sql`.
3. In the GitHub repository settings, add these Actions repository variables:
	- `SUPABASE_FUNCTION_URL`: `https://<project-ref>.supabase.co/functions/v1/submit-attempt`
	- `SUPABASE_ANON_KEY`: the project's publishable/anon key.
4. Add these Actions repository secrets:
	- `SUPABASE_ACCESS_TOKEN`: a Supabase personal access token.
	- `SUPABASE_PROJECT_REF`: the project reference.
5. In GitHub, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. This one-time setting must be enabled manually; GitHub does not allow this workflow token to create the Pages site.
6. Push to `main`. The Pages workflow deploys the site and the Supabase workflow deploys the score function. The hosted URL is `https://comptechgps-byte.github.io/Quiz/`.

Submitted scores are visible in the Supabase dashboard; public users have no database read policy. The quiz currently calculates marks in the browser, so the function validates and stores submitted scores but cannot prove they reflect honest answers. Do not use this setup as a high-stakes or tamper-resistant exam without moving exam selection and grading to trusted server-side code.

**Privacy:** the database contains candidate names and enrolment numbers. Restrict Supabase dashboard access to trusted staff and follow your institution's data-retention requirements.

## Monitoring limitation

The quiz submits when the browser reports that its tab is hidden or the browser window loses focus. Browsers do not let a standalone web page reliably detect every operating-system-level screen switch, and client-side monitoring cannot prevent someone from bypassing or disabling it. Use an invigilated environment if stronger exam controls are required.

## Question bank

`questions.js` builds 500 individually identified question records from 100 syllabus-aligned question templates and five distinct application contexts. Each record belongs to one syllabus unit and one of the three difficulty levels; the assessment avoids repeating a template within the same attempt.
