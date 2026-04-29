function showMessage(text, type) {
  const box = document.getElementById("authMessage");
  if (!box) return;
  box.textContent = text;
  box.className = `message ${type}`;
}

function switchTab(mode) {
  const loginCard = document.getElementById("loginCard");
  const signupCard = document.getElementById("signupCard");
  const loginBtn = document.getElementById("showLogin");
  const signupBtn = document.getElementById("showSignup");

  if (mode === "login") {
    loginCard.style.display = "block";
    signupCard.style.display = "none";
    loginBtn.classList.add("tab-active");
    signupBtn.classList.remove("tab-active");
  } else {
    loginCard.style.display = "none";
    signupCard.style.display = "block";
    signupBtn.classList.add("tab-active");
    loginBtn.classList.remove("tab-active");
  }
}

function setupAuthForms() {
  if (!window.SIETAuth) {
    showMessage("Auth module not initialized. Refresh the page once.", "error");
    return;
  }

  const { getUsers, setSession, STORAGE_USERS, writeStorage } = window.SIETAuth;

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  if (!loginForm || !signupForm) {
    showMessage("Auth form elements are missing.", "error");
    return;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rollNo = document.getElementById("loginRoll").value.trim().toUpperCase();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();
    const user = users.find((u) => u.rollNo === rollNo && u.password === password);

    if (!user) {
      showMessage("Invalid roll number or password.", "error");
      return;
    }

    const ok = setSession({ rollNo: user.rollNo, email: user.email });
    if (!ok) {
      showMessage("Unable to save login session in this browser.", "error");
      return;
    }
    showMessage("Login successful. Redirecting to profile...", "success");
    setTimeout(() => {
      window.location.href = "/profile";
    }, 600);
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const rollNo = document.getElementById("signupRoll").value.trim().toUpperCase();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      return;
    }

    const users = getUsers();
    const exists = users.some((u) => u.rollNo === rollNo || u.email === email);
    if (exists) {
      showMessage("Student already exists with same roll number or email.", "error");
      return;
    }

    users.push({
      rollNo,
      email,
      password,
      profile: {
        fullName: "",
        branch: "",
        year: "",
        phone: "",
        about: "",
        skills: "",
        photo: ""
      }
    });

    const ok = writeStorage ? writeStorage(STORAGE_USERS, users) : false;
    if (!ok) {
      showMessage("Unable to save signup data. Enable browser storage and try again.", "error");
      return;
    }
    showMessage("Account created. Please login.", "success");
    signupForm.reset();
    switchTab("login");
  });
}

function initAuthPage() {
  const showLogin = document.getElementById("showLogin");
  const showSignup = document.getElementById("showSignup");

  showLogin.addEventListener("click", () => switchTab("login"));
  showSignup.addEventListener("click", () => switchTab("signup"));

  switchTab("login");
  setupAuthForms();
}

document.addEventListener("DOMContentLoaded", initAuthPage);

