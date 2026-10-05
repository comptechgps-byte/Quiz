(function () {
  "use strict";

  const STORAGE_KEY = "dbmsQuizAttemptsV1";
  const EXAM_SECONDS = 5 * 60;
  const REQUIRED_COUNTS = { Simple: 4, Intermediate: 3, Complex: 3 };
  const screens = {
    welcome: document.getElementById("welcome-screen"),
    exam: document.getElementById("exam-screen"),
    result: document.getElementById("result-screen")
  };
  const state = {
    active: false,
    candidate: null,
    questions: [],
    answers: [],
    currentIndex: 0,
    startedAt: "",
    deadline: 0,
    timerId: null,
    latestAttempt: null,
    attempts: [],
    storageAvailable: true
  };

  const form = document.getElementById("candidate-form");
  const formError = document.getElementById("form-error");
  const questionContainer = document.getElementById("question-container");
  const timer = document.getElementById("timer");
  const storageWarning = document.getElementById("storage-warning");

  function shuffle(items) {
    const shuffled = items.slice();
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function selectQuestions() {
    const bank = window.QUESTION_BANK;
    if (!Array.isArray(bank) || bank.length !== 500) {
      throw new Error("The question bank must contain exactly 500 questions.");
    }

    const chosen = [];
    const usedTemplates = new Set();
    Object.keys(REQUIRED_COUNTS).forEach(function (difficulty) {
      const candidates = shuffle(bank.filter(function (question) {
        return question.difficulty === difficulty;
      }));
      let needed = REQUIRED_COUNTS[difficulty];
      for (const candidate of candidates) {
        if (!usedTemplates.has(candidate.templateId)) {
          chosen.push(candidate);
          usedTemplates.add(candidate.templateId);
          needed -= 1;
          if (needed === 0) break;
        }
      }
      if (needed !== 0) {
        throw new Error("Not enough unique " + difficulty.toLowerCase() + " questions in the question bank.");
      }
    });

    return shuffle(chosen).map(function (question) {
      return Object.assign({}, question, {
        options: shuffle([question.answer].concat(question.distractors))
      });
    });
  }

  function showScreen(name) {
    Object.keys(screens).forEach(function (screenName) {
      screens[screenName].hidden = screenName !== name;
    });
    window.scrollTo(0, 0);
  }

  function startExam(candidate) {
    state.candidate = candidate;
    state.questions = selectQuestions();
    state.answers = new Array(state.questions.length).fill(null);
    state.currentIndex = 0;
    state.startedAt = new Date().toISOString();
    state.deadline = Date.now() + EXAM_SECONDS * 1000;
    state.active = true;
    showScreen("exam");
    renderQuestion();
    updateTimer();
    state.timerId = window.setInterval(updateTimer, 250);
  }

  function updateTimer() {
    if (!state.active) return;
    const secondsLeft = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    timer.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    timer.classList.toggle("is-low", secondsLeft <= 30);
    if (secondsLeft === 0) submitExam("Time limit reached");
  }

  function renderQuestion() {
    const question = state.questions[state.currentIndex];
    const questionSection = document.createElement("section");
    questionSection.className = "question";
    questionSection.setAttribute("aria-labelledby", "question-title");

    const meta = document.createElement("div");
    meta.className = "question-meta";
    [question.unit, question.difficulty].forEach(function (text, index) {
      const tag = document.createElement("span");
      tag.className = index === 1 ? "tag tag-difficulty" : "tag";
      tag.textContent = text;
      meta.appendChild(tag);
    });

    const title = document.createElement("h2");
    title.id = "question-title";
    title.textContent = question.question;
    questionSection.append(meta, title);

    const options = document.createElement("div");
    options.className = "options";
    question.options.forEach(function (option, optionIndex) {
      const label = document.createElement("label");
      label.className = "option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = option;
      input.checked = state.answers[state.currentIndex] === option;
      input.addEventListener("change", function () {
        state.answers[state.currentIndex] = option;
        updateProgress();
      });
      const text = document.createElement("span");
      text.textContent = String.fromCharCode(65 + optionIndex) + ". " + option;
      label.append(input, text);
      options.appendChild(label);
    });

    questionSection.appendChild(options);
    questionContainer.replaceChildren(questionSection);
    document.getElementById("previous-button").disabled = state.currentIndex === 0;
    document.getElementById("next-button").disabled = state.currentIndex === state.questions.length - 1;
    updateProgress();
  }

  function updateProgress() {
    const answered = state.answers.filter(function (answer) { return answer !== null; }).length;
    document.getElementById("progress-label").textContent = "Question " + (state.currentIndex + 1) + " of " + state.questions.length;
    document.getElementById("answered-label").textContent = answered + " answered";
    document.getElementById("progress-bar").style.width = ((state.currentIndex + 1) / state.questions.length * 100) + "%";
  }

  function submitExam(reason) {
    if (!state.active) return;
    state.active = false;
    window.clearInterval(state.timerId);
    const score = state.questions.reduce(function (total, question, index) {
      return total + (state.answers[index] === question.answer ? 1 : 0);
    }, 0);
    const submittedAt = new Date().toISOString();
    state.latestAttempt = {
      enrollmentNumber: state.candidate.enrollmentNumber,
      name: state.candidate.name,
      score: score,
      maxMarks: state.questions.length,
      percentage: Math.round(score / state.questions.length * 100),
      startedAt: state.startedAt,
      submittedAt: submittedAt,
      submissionReason: reason
    };
    state.attempts.push(state.latestAttempt);

    if (state.storageAvailable) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.attempts));
      } catch (error) {
        state.storageAvailable = false;
        storageWarning.textContent = "This browser could not save attempts on this device (" + error.message + "). Download the CSV now to keep this result.";
      }
    } else if (!storageWarning.textContent) {
      storageWarning.textContent = "Saved attempts could not be read from this browser. Download the CSV now to keep this result.";
    }
    renderResult(reason);
  }

  function renderResult(reason) {
    document.getElementById("result-heading").textContent = reason === "Submitted by candidate" ? "Assessment submitted" : "Assessment ended";
    document.getElementById("result-message").textContent = "Thank you, " + state.candidate.name + ". Your attempt has been recorded.";
    document.getElementById("score-value").textContent = state.latestAttempt.score + " / " + state.latestAttempt.maxMarks;
    document.getElementById("percentage-value").textContent = state.latestAttempt.percentage + "%";
    document.getElementById("result-reason").textContent = "Submission reason: " + reason + ". Enrolment number: " + state.candidate.enrollmentNumber + ".";
    storageWarning.hidden = state.storageAvailable;
    renderRecords();
    renderReview();
    showScreen("result");
  }

  function loadAttempts() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === null) {
        state.storageAvailable = true;
        return [];
      }
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) throw new Error("Saved attempt data is not a list.");
      state.storageAvailable = true;
      return parsed;
    } catch (error) {
      state.storageAvailable = false;
      storageWarning.textContent = "Saved attempts could not be read from this browser (" + error.message + "). You can still download the current result.";
      storageWarning.hidden = false;
      return [];
    }
  }

  function renderRecords() {
    const body = document.getElementById("records-body");
    body.replaceChildren();
    const attempts = state.attempts.slice().reverse();
    if (attempts.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 4;
      cell.textContent = "No saved attempts yet.";
      row.appendChild(cell);
      body.appendChild(row);
      return;
    }
    attempts.forEach(function (attempt) {
      const row = document.createElement("tr");
      [attempt.enrollmentNumber, attempt.name, attempt.score + " / " + attempt.maxMarks, formatDate(attempt.submittedAt)].forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      body.appendChild(row);
    });
  }

  function renderReview() {
    const review = document.getElementById("review-list");
    review.replaceChildren();
    state.questions.forEach(function (question, index) {
      const item = document.createElement("article");
      item.className = "review-item";
      const title = document.createElement("h3");
      title.textContent = (index + 1) + ". " + question.question;
      const submitted = document.createElement("p");
      submitted.className = state.answers[index] === question.answer ? "correct-answer" : "wrong-answer";
      submitted.textContent = "Your answer: " + (state.answers[index] || "Not answered");
      const correct = document.createElement("p");
      correct.textContent = "Correct answer: " + question.answer;
      const explanation = document.createElement("p");
      explanation.textContent = question.explanation;
      item.append(title, submitted, correct, explanation);
      review.appendChild(item);
    });
  }

  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  }

  function csvEscape(value) {
    let text = String(value === null || value === undefined ? "" : value);
    if (/^\s*[=+\-@]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }

  function downloadCsv(attempts, filename) {
    const headers = ["Enrolment Number", "Name", "Score", "Maximum Marks", "Percentage", "Started At", "Submitted At", "Submission Reason"];
    const rows = attempts.map(function (attempt) {
      return [
        attempt.enrollmentNumber, attempt.name, attempt.score, attempt.maxMarks,
        attempt.percentage + "%", attempt.startedAt, attempt.submittedAt,
        attempt.submissionReason
      ];
    });
    const csv = [headers].concat(rows).map(function (row) {
      return row.map(csvEscape).join(",");
    }).join("\r\n");
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const enrollmentNumber = document.getElementById("enrollment").value.trim();
    const name = document.getElementById("candidate-name").value.trim();
    if (!enrollmentNumber || !name) {
      formError.textContent = "Enter both your enrolment number and full name to continue.";
      formError.hidden = false;
      return;
    }
    formError.hidden = true;
    state.attempts = loadAttempts();
    startExam({ enrollmentNumber: enrollmentNumber, name: name });
  });

  document.getElementById("previous-button").addEventListener("click", function () {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  });
  document.getElementById("next-button").addEventListener("click", function () {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
    }
  });
  document.getElementById("submit-button").addEventListener("click", function () {
    submitExam("Submitted by candidate");
  });
  document.getElementById("download-results-button").addEventListener("click", function () {
    downloadCsv([state.latestAttempt], "dbms-quiz-result.csv");
  });
  document.getElementById("export-all-button").addEventListener("click", function () {
    downloadCsv(state.attempts, "dbms-quiz-all-results.csv");
  });

  document.addEventListener("visibilitychange", function () {
    if (state.active && document.visibilityState === "hidden") {
      submitExam("Browser tab switched or hidden");
    }
  });
  window.addEventListener("blur", function () {
    if (state.active) submitExam("Browser window lost focus");
  });
  window.addEventListener("pagehide", function () {
    if (state.active) submitExam("Page closed or navigated away");
  });
})();
