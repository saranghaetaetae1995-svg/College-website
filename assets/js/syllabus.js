const semesterDefs = [
  { key: "1-1", label: "I Year I Semester" },
  { key: "1-2", label: "I Year II Semester" },
  { key: "2-1", label: "II Year I Semester" },
  { key: "2-2", label: "II Year II Semester" },
  { key: "3-1", label: "III Year I Semester" },
  { key: "3-2", label: "III Year II Semester" },
  { key: "4-1", label: "IV Year I Semester" },
  { key: "4-2", label: "IV Year II Semester" }
];

const syllabusData = {
  "1-1": [
    { serial: "1", code: "MA101BS", subject: "Matrices and Calculus", credits: "4" },
    { serial: "2", code: "CH102BS", subject: "Engineering Chemistry", credits: "3" },
    { serial: "3", code: "EN103HS", subject: "English for Skill Enhancement", credits: "3" },
    { serial: "4", code: "EC104ES", subject: "Electronic Devices and Circuits", credits: "3" },
    { serial: "5", code: "CS105ES", subject: "Programming for Problem Solving", credits: "3" },
    { serial: "6", code: "CH106BS", subject: "Engineering Chemistry Lab", credits: "1" },
    { serial: "7", code: "CS107ES", subject: "Programming for Problem Solving Lab", credits: "1" },
    { serial: "8", code: "EN108HS", subject: "English Language and Communication Skills Lab", credits: "1" },
    { serial: "9", code: "ME109ES", subject: "Engineering Workshop", credits: "1" }
  ],
  "1-2": [
    { serial: "1", code: "MA201BS", subject: "Ordinary Differential Equations and Vector Calculus", credits: "3" },
    { serial: "2", code: "PH202BS", subject: "Advanced Engineering Physics", credits: "3" },
    { serial: "3", code: "ME203ES", subject: "Engineering Drawing and Computer Aided Drafting", credits: "3" },
    { serial: "4", code: "EE204ES", subject: "Basic Electrical Engineering", credits: "3" },
    { serial: "5", code: "CS205ES", subject: "Data Structures", credits: "3" },
    { serial: "6", code: "PH206BS", subject: "Advanced Engineering Physics Lab", credits: "1" },
    { serial: "7", code: "CS207ES", subject: "Data Structures Lab", credits: "1" },
    { serial: "8", code: "CS208ES", subject: "Python Programming Lab", credits: "1" },
    { serial: "9", code: "EE209ES", subject: "Basic Electrical Engineering Lab", credits: "1" },
    { serial: "10", code: "CS210ES", subject: "IT Workshop", credits: "1" }
  ],
  "2-1": [
    { serial: "1", code: "CS301PC", subject: "Discrete Mathematics", credits: "3" },
    { serial: "2", code: "CS302PC", subject: "Computer Organization and Architecture", credits: "3" },
    { serial: "3", code: "CS303PC", subject: "Object Oriented Programming through java", credits: "3" },
    { serial: "4", code: "CS304PC", subject: "Software Engineering", credits: "3" },
    { serial: "5", code: "CS305PC", subject: "Database Management Systems", credits: "3" },
    { serial: "6", code: "MS306HS", subject: "Innovation and Entrepreneurship", credits: "2" },
    { serial: "7", code: "CS307PC", subject: "Object Oriented Programming through java Lab", credits: "1" },
    { serial: "8", code: "CS308PC", subject: "Software Engineering Lab", credits: "1" },
    { serial: "9", code: "CS309PC", subject: "Database Management Systems Lab", credits: "1" },
    { serial: "10", code: "CS310SD", subject: "Node Js/React JS/ Django", credits: "1" },
    { serial: "11", code: "VA300ES", subject: "Environmental Science", credits: "1" }
  ],
  "2-2": [
    { serial: "1", code: "MA401PC", subject: "Computer oriented Statistical Methods", credits: "3" },
    { serial: "2", code: "CS402PC", subject: "Operating Systems", credits: "3" },
    { serial: "3", code: "CS403PC", subject: "Algorithm design and Analysis", credits: "3" },
    { serial: "4", code: "CS404PC", subject: "Computer Networks", credits: "3" },
    { serial: "5", code: "CS405PC", subject: "Machine Learning", credits: "3" },
    { serial: "6", code: "MA406PC", subject: "Computational Mathematics Lab", credits: "1" },
    { serial: "7", code: "CS407PC", subject: "Operating Systems Lab", credits: "1" },
    { serial: "8", code: "CS408PC", subject: "Computer Networks Lab", credits: "1" },
    { serial: "9", code: "CS409PC", subject: "Machine Learning Lab", credits: "1" },
    { serial: "10", code: "CS410SD", subject: "Data Visualization- R/ Python/ Power BI", credits: "1" }
  ],
  "3-1": [
    { serial: "1", code: "CS501PC", subject: "Automata Theory and Compiler Design", credits: "3" },
    { serial: "2", code: "CS502PC", subject: "Artificial Intelligence", credits: "3" },
    { serial: "3", code: "CS503PC", subject: "DevOps", credits: "3" },
    { serial: "4", code: "", subject: "Professional Elective-I", credits: "3" },
    { serial: "5", code: "", subject: "Open Elective-I", credits: "2" },
    { serial: "6", code: "CS504PC", subject: "Compiler Design Lab", credits: "1" },
    { serial: "7", code: "CS505PC", subject: "Artificial Intelligence with Python Lab", credits: "1" },
    { serial: "8", code: "CS506PC", subject: "DevOps Lab", credits: "1" },
    { serial: "9", code: "CS507PC", subject: "Field-Based Research Project", credits: "2" },
    { serial: "10", code: "CS508SD", subject: "UI Design - Flutter/ Android Studio", credits: "1" },
    { serial: "11", code: "VA500HS", subject: "Indian Knowledge System", credits: "1" }
  ],
  "3-2": [
    { serial: "1", code: "CS601PC", subject: "Cryptography and Networks Security", credits: "3" },
    { serial: "2", code: "CS602PC", subject: "Deep Learning", credits: "3" },
    { serial: "3", code: "MS603HS", subject: "Business Economics and Financial Analysis", credits: "3" },
    { serial: "4", code: "", subject: "Professional Elective-II", credits: "3" },
    { serial: "5", code: "", subject: "Open Elective - II", credits: "2" },
    { serial: "6", code: "CS604PC", subject: "Cryptography and Networks Security Lab", credits: "1" },
    { serial: "7", code: "CS605PC", subject: "Deep Learning Lab", credits: "1" },
    { serial: "8", code: "CS606PC", subject: "Advanced Data Structures using Python Lab", credits: "1" },
    { serial: "9", code: "EN607HS", subject: "Advanced English Communication Skills Laboratory", credits: "1" },
    { serial: "10", code: "CS608SD", subject: "Prompt Engineering", credits: "1" },
    { serial: "11", code: "VA600HS", subject: "Gender Sensitization Lab*/ Human Values and Professional Ethics*", credits: "1" }
  ],
  "4-1": [
    { serial: "1", code: "CS701PC", subject: "Natural Language Processing", credits: "3" },
    { serial: "2", code: "CS702PC", subject: "Cyber Security", credits: "3" },
    { serial: "3", code: "MS703HS", subject: "Fundamentals of Management", credits: "3" },
    { serial: "4", code: "", subject: "Professional Elective-III", credits: "3" },
    { serial: "5", code: "", subject: "Professional Elective - IV", credits: "3" },
    { serial: "6", code: "", subject: "Open Elective - III", credits: "2" },
    { serial: "7", code: "CS704PC", subject: "Natural Language Processing Lab", credits: "1" },
    { serial: "8", code: "CS705PC", subject: "Cyber Security Lab", credits: "1" },
    { serial: "9", code: "CS706PC", subject: "Industry Oriented Mini Project/ Internship", credits: "2" }
  ],
  "4-2": [
    { serial: "1", code: "", subject: "Professional Elective - V", credits: "3" },
    { serial: "2", code: "", subject: "Professional Elective - VI", credits: "3" },
    { serial: "3", code: "CS801PC", subject: "Project Work", credits: "14" }
  ]
};

const syllabusDetails = window.SIET_SYLLABUS_DETAILS || {};
const PDF_NOISE_PATTERN = /R25\s*CSE\s*Syllabus\s*JNTUH\s*Hyderabad/gi;

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanPdfNoise(text) {
  return String(text || "")
    .replace(PDF_NOISE_PATTERN, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function toNumberedHtml(text) {
  const clean = cleanPdfNoise(text);
  if (!clean) return "<p>Not available.</p>";
  const parts = clean.split(/\s(?=\d+\.\s)/).map((p) => p.trim()).filter(Boolean);
  const numbered = parts.filter((p) => /^\d+\./.test(p));
  if (numbered.length >= 2) {
    return `<ol>${numbered.map((p) => `<li>${escapeHtml(p.replace(/^\d+\.\s*/, ""))}</li>`).join("")}</ol>`;
  }
  return `<p>${escapeHtml(clean)}</p>`;
}

function renderSubjectDetail(row, detailExists) {
  const card = document.getElementById("subjectDetail");
  if (!card) return;

  if (!detailExists) {
    card.innerHTML = `
      <h3>${escapeHtml(row.subject)}</h3>
      <p><strong>Course Code:</strong> ${escapeHtml(row.code || "Not listed")}</p>
      <p><strong>Credits:</strong> ${escapeHtml(row.credits)}</p>
      <p class="subtitle">Detailed syllabus is not available for this row (commonly elective basket entries).</p>
    `;
    return;
  }

  card.innerHTML = `
    <h3>${escapeHtml(row.subject)}</h3>
    <p><strong>Course Code:</strong> ${escapeHtml(row.code || "Not listed")}</p>
    <p><strong>Credits:</strong> ${escapeHtml(row.credits)}</p>
    <p class="subtitle">Click <strong>View</strong> to open in-page popup with Unit I to Unit V syllabus.</p>
  `;
}

function getUnitByRoman(detail, roman) {
  if (!detail || !Array.isArray(detail.units)) return null;
  return detail.units.find((u) => String(u.unit || "").toUpperCase() === roman) || null;
}

function openSyllabusModal(row) {
  const code = (row.code || "").toUpperCase().trim();
  const detail = code ? syllabusDetails[code] : null;
  const modal = document.getElementById("syllabusModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalBody = document.getElementById("modalBody");
  if (!modal || !modalTitle || !modalMeta || !modalBody) return;

  renderSubjectDetail(row, Boolean(detail));
  modalTitle.textContent = detail ? cleanPdfNoise(detail.title || row.subject) : cleanPdfNoise(row.subject);
  modalMeta.textContent = `Course Code: ${code || "Not listed"} | Credits: ${row.credits}`;

  if (!detail) {
    modalBody.innerHTML = `<p>Detailed syllabus is not available for this subject entry (common for elective baskets without specific course code).</p>`;
  } else {
    const romans = ["I", "II", "III", "IV", "V"];
    const unitsHtml = romans.map((roman) => {
      const u = getUnitByRoman(detail, roman);
      if (!u) {
        return `
          <article class="unit-block">
            <h4>Unit ${roman}</h4>
            <p>Not available in available syllabus content.</p>
          </article>
        `;
      }
      return `
        <article class="unit-block">
          <h4>Unit ${roman}${u.title ? ` - ${escapeHtml(cleanPdfNoise(u.title))}` : ""}</h4>
          <p>${escapeHtml(cleanPdfNoise((u.content || "").trim()) || "Not available.")}</p>
        </article>
      `;
    }).join("");

    modalBody.innerHTML = `
      <h3>Objectives</h3>
      ${toNumberedHtml(detail.objectives)}
      <h3>Course Outcomes</h3>
      ${toNumberedHtml(detail.outcomes)}
      <h3>Unit-wise Syllabus (I to V)</h3>
      <div class="units-grid">${unitsHtml}</div>
    `;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSyllabusModal() {
  const modal = document.getElementById("syllabusModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function wireModalControls() {
  const modal = document.getElementById("syllabusModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeSyllabusModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSyllabusModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeSyllabusModal();
    }
  });
}

function renderTable(rows) {
  const body = document.getElementById("syllabusTableBody");
  if (!body) return;

  if (!rows || !rows.length) {
    body.innerHTML = '<tr><td colspan="5" class="loading">No rows available for this semester.</td></tr>';
    return;
  }

  body.innerHTML = "";
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(row.serial)}</td>
      <td>${escapeHtml(row.code || "-")}</td>
      <td>${escapeHtml(row.subject)}</td>
      <td>${escapeHtml(row.credits)}</td>
      <td><button type="button" class="btn btn-secondary view-syllabus-btn">View</button></td>
    `;
    const btn = tr.querySelector(".view-syllabus-btn");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openSyllabusModal(row);
      });
    }

    tr.addEventListener("click", () => {
      const hasDetail = Boolean(row.code && syllabusDetails[(row.code || "").toUpperCase()]);
      renderSubjectDetail(row, hasDetail);
    });
    body.appendChild(tr);
  });
}

function renderSemesterButtons() {
  const wrap = document.getElementById("semesterButtons");
  if (!wrap) return;

  wrap.innerHTML = "";
  semesterDefs.forEach((sem, idx) => {
    if (!syllabusData[sem.key]) return;

    const btn = document.createElement("button");
    btn.className = `sem-btn ${idx === 0 ? "active" : ""}`;
    btn.type = "button";
    btn.dataset.sem = sem.key;
    btn.textContent = sem.label;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".sem-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderTable(syllabusData[sem.key]);
    });

    wrap.appendChild(btn);
  });
}

function initSyllabus() {
  wireModalControls();
  renderSemesterButtons();
  renderTable(syllabusData["1-1"] || []);
}

document.addEventListener("DOMContentLoaded", initSyllabus);
