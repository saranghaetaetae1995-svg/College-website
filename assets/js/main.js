const STORAGE_USERS = "siet_users";
const STORAGE_SESSION = "siet_session";

function readStorage(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined || raw === "") return fallbackValue;
    return JSON.parse(raw);
  } catch (err) {
    return fallbackValue;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
}

function getUsers() {
  const data = readStorage(STORAGE_USERS, []);
  return Array.isArray(data) ? data : [];
}

function getSession() {
  return readStorage(STORAGE_SESSION, null);
}

function setSession(session) {
  return writeStorage(STORAGE_SESSION, session);
}

function clearSession() {
  try {
    localStorage.removeItem(STORAGE_SESSION);
    return true;
  } catch (err) {
    return false;
  }
}

function toggleMenu() {
  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function markActivePage() {
  const page = document.body.dataset.page;
  if (!page) return;
  const active = document.querySelector(`.nav-links a[data-page='${page}']`);
  if (active) active.classList.add("active");
}

function wireAuthUI() {
  const session = getSession();
  const authLogin = document.querySelectorAll(".auth-login");
  const authProfile = document.querySelectorAll(".auth-profile");
  const authLogout = document.querySelectorAll(".auth-logout");
  const userBadge = document.getElementById("userBadge");

  if (session && session.rollNo) {
    authLogin.forEach((el) => (el.style.display = "none"));
    authProfile.forEach((el) => (el.style.display = "list-item"));
    authLogout.forEach((el) => (el.style.display = "list-item"));
    if (userBadge) userBadge.textContent = `Logged in: ${session.rollNo}`;
  } else {
    authLogin.forEach((el) => (el.style.display = "list-item"));
    authProfile.forEach((el) => (el.style.display = "none"));
    authLogout.forEach((el) => (el.style.display = "none"));
    if (userBadge) userBadge.textContent = "Guest Mode";
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearSession();
      window.location.href = "auth.html";
    });
  }
}

function guardProfilePage() {
  if (document.body.dataset.page !== "profile") return;
  const session = getSession();
  if (!session || !session.rollNo) {
    window.location.href = "auth.html";
  }
}

function guardAuthPageForLoggedInUser() {
  if (document.body.dataset.page !== "auth") return;
  const session = getSession();
  if (session && session.rollNo) {
    window.location.href = "profile.html";
  }
}

function initMain() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
  toggleMenu();
  markActivePage();
  wireAuthUI();
  guardProfilePage();
  guardAuthPageForLoggedInUser();
}

document.addEventListener("DOMContentLoaded", initMain);

window.SIETAuth = {
  STORAGE_USERS,
  STORAGE_SESSION,
  getUsers,
  getSession,
  setSession,
  readStorage,
  writeStorage
};
