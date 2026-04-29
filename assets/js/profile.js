let pendingPhotoData = "";

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

function showProfilePopup(text) {
  const popup = document.getElementById("profilePopup");
  const popupText = document.getElementById("profilePopupText");
  if (!popup || !popupText) return;
  popupText.textContent = text;
  popup.classList.add("show");
}

function closeProfilePopup() {
  const popup = document.getElementById("profilePopup");
  if (!popup) return;
  popup.classList.remove("show");
}

function setupProfilePopup() {
  const closeBtn = document.getElementById("profilePopupClose");
  if (!closeBtn) return;
  closeBtn.addEventListener("click", closeProfilePopup);
}

function getInitials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "SI";
  return parts.slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join("");
}

function getFormValues() {
  return {
    fullName: document.getElementById("fullName").value.trim(),
    branch: document.getElementById("branch").value.trim(),
    year: document.getElementById("yearOfStudy").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    about: document.getElementById("about").value.trim(),
    skills: document.getElementById("skills").value.trim()
  };
}

function isProfileComplete(profile) {
  const required = ["fullName", "branch", "year", "phone", "about", "skills"];
  return required.every((key) => Boolean((profile[key] || "").trim()));
}

function fillForm(profile) {
  document.getElementById("fullName").value = profile.fullName || "";
  document.getElementById("branch").value = profile.branch || "";
  document.getElementById("yearOfStudy").value = profile.year || "";
  document.getElementById("phone").value = profile.phone || "";
  document.getElementById("about").value = profile.about || "";
  document.getElementById("skills").value = profile.skills || "";

  pendingPhotoData = profile.photo || "";
  const preview = document.getElementById("profilePhotoPreview");
  if (preview) {
    if (pendingPhotoData) {
      preview.src = pendingPhotoData;
      preview.style.display = "block";
    } else {
      preview.src = "";
      preview.style.display = "none";
    }
  }
}

function setEditMode(isEditMode) {
  const formWrap = document.getElementById("profileFormWrap");
  const cardShell = document.getElementById("profileCardShell");
  const saveBtn = document.getElementById("saveProfileBtn");

  if (!formWrap || !cardShell || !saveBtn) return;

  if (isEditMode) {
    formWrap.style.display = "block";
    cardShell.style.display = "none";
    saveBtn.textContent = "Save Profile";
  } else {
    formWrap.style.display = "none";
    cardShell.style.display = "grid";
  }
}

function renderProfileCard(user) {
  const card = document.getElementById("profileIdCard");
  if (!card) return;

  const p = user.profile || {};
  const photoBlock = p.photo
    ? `<img src="${escapeHtml(p.photo)}" alt="Student Photo" class="id-photo-img" />`
    : `<div class="id-photo-fallback">${escapeHtml(getInitials(p.fullName))}</div>`;

  card.innerHTML = `
    <div class="id-header">
      <img src="assets/images/sl.png" alt="SIET Logo" />
      <div>
        <h3>Sreyas Institute of Engineering and Technology</h3>
        <p>Student Identity Profile</p>
      </div>
    </div>

    <div class="id-student-top">
      <div class="id-student-name-wrap">
        <h4>${escapeHtml(p.fullName)}</h4>
        <span class="id-name-tag">Student</span>
      </div>
      <div class="id-photo-box">${photoBlock}</div>
    </div>

    <div class="id-grid">
      <p><strong>Roll No:</strong> ${escapeHtml(user.rollNo)}</p>
      <p><strong>Year:</strong> ${escapeHtml(p.year)}</p>
      <p><strong>Branch:</strong> ${escapeHtml(p.branch)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(p.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
    </div>

    <div class="id-section">
      <p><strong>About:</strong> ${escapeHtml(p.about)}</p>
    </div>
    <div class="id-section">
      <p><strong>Skills:</strong> ${escapeHtml(p.skills)}</p>
    </div>

    <div class="id-footer">
      9-39, Sy.No.107, Thattiannaram Village, GSI, Bandlaguda, Nagole, Hyderabad, Telangana, 500068
    </div>
  `;
}

async function fileToCompressedDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxSide = 360;
        let { width, height } = img;
        const scale = Math.min(1, maxSide / Math.max(width, height));
        width = Math.max(1, Math.round(width * scale));
        height = Math.max(1, Math.round(height * scale));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => reject(new Error("Invalid image file."));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function setupPhotoInput() {
  const input = document.getElementById("profilePhoto");
  const preview = document.getElementById("profilePhotoPreview");
  if (!input || !preview) return;

  input.addEventListener("change", async () => {
    const file = input.files && input.files[0];
    if (!file) return;

    try {
      pendingPhotoData = await fileToCompressedDataUrl(file);
      preview.src = pendingPhotoData;
      preview.style.display = "block";
      showProfileMessage("Photo selected successfully.", "success");
    } catch (err) {
      pendingPhotoData = "";
      preview.src = "";
      preview.style.display = "none";
      showProfileMessage("Unable to process selected photo.", "error");
    }
  });
}

function loadProfile() {
  const user = findCurrentUser();
  if (!user) return;

  document.getElementById("profileRoll").textContent = user.rollNo;
  document.getElementById("profileEmail").textContent = user.email;

  const profile = user.profile || {};
  fillForm(profile);

  if (isProfileComplete(profile)) {
    renderProfileCard({ ...user, profile });
    setEditMode(false);
  } else {
    setEditMode(true);
  }
}

function setupEditButton() {
  const editBtn = document.getElementById("editProfileBtn");
  if (!editBtn) return;

  editBtn.addEventListener("click", () => {
    const user = findCurrentUser();
    if (!user) return;
    fillForm(user.profile || {});
    setEditMode(true);
    showProfileMessage("Edit your details and click Save Profile.", "success");
  });
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

    const profile = getFormValues();
    if (!isProfileComplete(profile)) {
      showProfileMessage("Please fill all fields to create your profile card.", "error");
      return;
    }

    profile.photo = pendingPhotoData || users[idx].profile?.photo || "";
    users[idx].profile = profile;

    const ok = saveUsers(users);
    if (!ok) {
      showProfileMessage("Unable to save profile in this browser. Please check storage settings.", "error");
      return;
    }

    renderProfileCard(users[idx]);
    setEditMode(false);
    showProfileMessage("Profile card created successfully.", "success");
    showProfilePopup("Profile card created successfully.");
  });
}

function initProfilePage() {
  setupProfilePopup();
  setupPhotoInput();
  setupEditButton();
  loadProfile();
  setupProfileForm();
}

document.addEventListener("DOMContentLoaded", initProfilePage);
