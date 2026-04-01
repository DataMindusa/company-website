import { initNavbar } from "./navbar.js";

/**
 * Load HTML component into a target element
 */
export async function loadComponent(id, path) {
  const target = document.getElementById(id);

  if (!target) {
    console.warn(`⚠️ Element with id "${id}" not found.`);
    return;
  }

  try {
    const res = await fetch(path);

    if (!res.ok) {
      throw new Error(`Failed to fetch ${path}: ${res.status}`);
    }

    const html = await res.text();
    target.innerHTML = html;

    // Initialize component-specific scripts
    initializeComponent(id);

  } catch (error) {
    console.error(`❌ Error loading component (${id}):`, error);

    // Optional fallback UI
    target.innerHTML = `<p style="color:red;">Failed to load ${id}</p>`;
  }
}

/**
 * Initialize JS behavior after component loads
 */
function initializeComponent(id) {
  switch (id) {
    case "header":
      initNavbar();
      break;

    case "footer":
      initFooter();
      break;

    default:
      break;
  }
}

/**
 * Footer initialization (dynamic year)
 */
function initFooter() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Load all global components
 */
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "./components/header.html");
  loadComponent("footer", "./components/footer.html");
});