# DBMS Quiz — Course 313302

A browser-based, five-minute quiz based on the five theory units in the MSBTE Database Management System (K Scheme) syllabus supplied with this project.

## Run the quiz

Open `index.html` in a modern browser. No package installation or internet connection is required. For more reliable browser storage, serve this folder over HTTP (for example, with any local static web server) and open its local URL.

Enter an enrolment number and name to start. Each attempt randomly draws 10 questions from the 500-question bank: exactly 4 Simple, 3 Intermediate, and 3 Complex questions. Questions and answer choices are shuffled. The five-minute timer submits automatically; submitting manually, switching or hiding the tab, or leaving focus on the browser window ends the attempt immediately.

## Results and marks

Attempt records are saved in the current browser's local storage. Download the current result or export all saved attempts as a UTF-8 CSV with a byte-order mark, which opens in Microsoft Excel. The export includes enrolment number, name, marks, percentage, start and submission times, and submission reason. Export records regularly and keep the downloaded file somewhere safe.

**Storage is local to one browser and device.** This project has no server or shared gradebook, so results do not automatically reach an instructor or appear on another device. Collect the exported CSV files to consolidate marks.

## Monitoring limitation

The quiz submits when the browser reports that its tab is hidden or the browser window loses focus. Browsers do not let a standalone web page reliably detect every operating-system-level screen switch, and client-side monitoring cannot prevent someone from bypassing or disabling it. Use an invigilated environment if stronger exam controls are required.

## Question bank

`questions.js` builds 500 individually identified question records from 100 syllabus-aligned question templates and five distinct application contexts. Each record belongs to one syllabus unit and one of the three difficulty levels; the assessment avoids repeating a template within the same attempt.
