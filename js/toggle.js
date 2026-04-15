const moon = document.getElementById("moon");
const sun = document.getElementById("sun");

// attempt to get local storage, fall back to system, default light
function getInitialTheme() {
  const saved = localStorage.getItem("local_theme");
  if (saved) return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
// apply dark mode theme, sync icons, and update local storage
function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.classList.toggle("dark", isDark);

  // sync icons
  moon.style.display = isDark ? "none" : "block";
  sun.style.display = isDark ? "block" : "none";

  moon.style.opacity = isDark ? "0" : "1";
  sun.style.opacity = isDark ? "1" : "0";

  localStorage.setItem("local_theme", theme);
}

// event listeners
moon.addEventListener("click", () => applyTheme("dark"));
sun.addEventListener("click", () => applyTheme("light"));

// initialize
applyTheme(getInitialTheme());