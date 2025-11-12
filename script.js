// ------------------ MAIN SCRIPT ------------------
function initApp() {
  // Delay slightly to ensure included HTML is loaded
  setTimeout(() => {

    // ------------------ CARD SLIDER ------------------
    const cards = document.querySelectorAll(".video-card");
    const dots = document.querySelectorAll(".dot");

    let current = 0;

    function updateActive(index) {
      cards.forEach(card => card.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));

      if (cards[index] && dots[index]) {
        cards[index].classList.add("active");
        dots[index].classList.add("active");
      }
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        current = index;
        updateActive(current);
      });
    });


    // ------------------ MOBILE MENU ------------------
    const menuToggle = document.querySelector(".menu-toggle");
    const overlay = document.querySelector(".menu-overlay");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && overlay && mobileMenu) {
      // ✅ Clone element to reset old listeners (important for cached reloads)
      const newToggle = menuToggle.cloneNode(true);
      menuToggle.parentNode.replaceChild(newToggle, menuToggle);

      // Toggle menu open/close
      function toggleMenu() {
        newToggle.classList.toggle("active");
        overlay.classList.toggle("active");
        mobileMenu.classList.toggle("active");
      }

      newToggle.addEventListener("click", toggleMenu, false);
      newToggle.addEventListener("touchstart", toggleMenu, false);

      // Close menu when overlay is clicked
      overlay.addEventListener("click", () => {
        newToggle.classList.remove("active");
        overlay.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    } else {
      console.warn("Navbar components not yet loaded (menu-toggle, overlay, or mobile-menu missing).");
    }


    // ------------------ SCROLL ANIMATIONS ------------------
    const fadeElements = document.querySelectorAll(".mvp-left-panel, .mvp-calendar, .mvp-time-panel");

    if (fadeElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
          }
        });
      }, { threshold: 0.2 });

      fadeElements.forEach(el => observer.observe(el));
    }

  }, 250); // wait 250ms to ensure include.js injected HTML
}

// ------------------ EVENT BINDING ------------------

// Run on first page load
document.addEventListener("DOMContentLoaded", initApp);

// Run again when page is restored from cache (e.g., reopening on mobile)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    initApp();
  }
});
