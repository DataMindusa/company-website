let menuOpen = false;
let initialized = false;

export function initNavbar() {
  if (initialized) return;
  initialized = true;

  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");
  const navbar = document.querySelector(".navbar");

  const dropdown = document.getElementById("productsDropdown");
  const dropdownToggle = document.getElementById("productsToggle");

  if (!toggle || !menu || !navbar) return;

  /* =========================================
     🔘 TOGGLE MOBILE MENU
  ========================================= */
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();

    menuOpen = !menuOpen;
    menu.classList.toggle("open", menuOpen);
    toggle.setAttribute("aria-expanded", String(menuOpen));
  });

  /* =========================================
     🔗 CLOSE MENU ON LINK CLICK
  ========================================= */
  const links = menu.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu(menu, toggle);
    });
  });

  /* =========================================
     🔽 PRODUCTS DROPDOWN (SMART CLICK)
  ========================================= */
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
      const isOpen = dropdown.classList.contains("active");

      if (!isOpen) {
        // FIRST CLICK → open dropdown
        e.preventDefault();

        dropdown.classList.add("active");
        dropdownToggle.setAttribute("aria-expanded", "true");
      }
      // SECOND CLICK → allow navigation (no preventDefault)
    });
  }

  /* =========================================
     🖱 GLOBAL CLICK HANDLER
  ========================================= */
  document.addEventListener("click", (e) => {
    // CLOSE MOBILE MENU
    if (
      menuOpen &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu(menu, toggle);
    }

    // CLOSE DROPDOWN
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove("active");

      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* =========================================
     📱 WINDOW RESIZE HANDLER
  ========================================= */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMenu(menu, toggle);

      if (dropdown) {
        dropdown.classList.remove("active");
      }

      if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* =========================================
     🔥 NAVBAR SCROLL EFFECT
  ========================================= */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* =========================================
   🔧 HELPER: CLOSE MENU
========================================= */
function closeMenu(menu, toggle) {
  menuOpen = false;
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}