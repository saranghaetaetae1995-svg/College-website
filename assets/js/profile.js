function findCurrentUser() {
  const { getUsers, getSession } = window.SIETAuth;
  const session = getSession();
  if (!session) return null;

  const users = getUsers();
  return users.find((u) => u.rollNo === session.rollNo) || null;
}

function saveUsers(users) {
  localStorage.setItem(window.SIETAuth.STORAGE_USERS, JSON.stringify(users));
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

  const photoPreview = document.getElementById("photoPreview");
  if (p.photo) {
    photoPreview.src = p.photo;
    photoPreview.style.display = "block";
  }
}

function setupPhotoUpload() {
  const input = document.getElementById("photo");
  const preview = document.getElementById("photoPreview");

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

function setupProfileForm() {
  const form = document.getElementById("profileForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { getUsers } = window.SIETAuth;
    const session = window.SIETAuth.getSession();
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

    const preview = document.getElementById("photoPreview");
    users[idx].profile = {
      fullName: document.getElementById("fullName").value.trim(),
      branch: document.getElementById("branch").value.trim(),
      year: document.getElementById("yearOfStudy").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      about: document.getElementById("about").value.trim(),
      skills: document.getElementById("skills").value.trim(),
      photo: preview.src && preview.style.display !== "none" ? preview.src : ""
    };

    saveUsers(users);
    showProfileMessage("Profile saved successfully.", "success");
  });
}

function initProfilePage() {
  setupPhotoUpload();
  loadProfile();
  setupProfileForm();
}

document.addEventListener("DOMContentLoaded", initProfilePage);
