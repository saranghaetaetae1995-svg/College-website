function findCurrentUser() {
  const { getUsers, getSession } = window.SIETAuth;
  const session = getSession();
  if (!session) return null;

  const users = getUsers();
  return users.find((u) => u.rollNo === session.rollNo) || null;
}

function saveUsers(users) {
  const writer = window.SIETAuth.writeStorage;
  if (typeof writer !== "function") return false;
  return writer(window.SIETAuth.STORAGE_USERS, users);
}

function showProfileMessage(text, type) {
  const box = document.getElementById("profileMessage");
  if (!box) return;
  box.textContent = text;
  box.className = `message ${type}`;
}

function loadProfile() {
  const user = findCurrentUser();
  if (!user) return;

  document.getElementById("profileRoll").textContent = user.rollNo;
  document.getElementById("profileEmail").textContent = user.email;

  const p = user.profile || {};
  document.getElementById("fullName").value = p.fullName || "";
  document.getElementById("branch").value = p.branch || "";
  document.getElementById("yearOfStudy").value = p.year || "";
  document.getElementById("phone").value = p.phone || "";
  document.getElementById("about").value = p.about || "";
  document.getElementById("skills").value = p.skills || "";
}

function setupProfileForm() {
  const form = document.getElementById("profileForm");
  if (!form || !window.SIETAuth) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { getUsers, getSession } = window.SIETAuth;
    const session = getSession();
    if (!session) {
      showProfileMessage("Session expired. Login again.", "error");
      return;
    }

    const users = getUsers();
    const idx = users.findIndex((u) => u.rollNo === session.rollNo);
    if (idx < 0) {
      showProfileMessage("User not found.", "error");
      return;
    }

    users[idx].profile = {
      fullName: document.getElementById("fullName").value.trim(),
      branch: document.getElementById("branch").value.trim(),
      year: document.getElementById("yearOfStudy").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      about: document.getElementById("about").value.trim(),
      skills: document.getElementById("skills").value.trim()
    };

    const ok = saveUsers(users);
    if (!ok) {
      showProfileMessage("Unable to save profile in this browser. Please check storage settings.", "error");
      return;
    }

    showProfileMessage("Profile saved successfully.", "success");
  });
}

function initProfilePage() {
  loadProfile();
  setupProfileForm();
}

document.addEventListener("DOMContentLoaded", initProfilePage);
