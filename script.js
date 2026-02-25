document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar scroll effect ---
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Hamburger menu ---
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const toggleMenu = (force) => {
    const isOpen =
      force !== undefined ? force : !hamburger.classList.contains("open");
    hamburger.classList.toggle("open", isOpen);
    mobileMenu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  hamburger.addEventListener("click", () => toggleMenu());
  // Close when a link inside mobile menu is clicked
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => toggleMenu(false));
  });
  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) toggleMenu(false);
  });

  // --- Back to top ---
  const backToTop = document.getElementById("back-to-top");
  const toggleBtt = () => {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  };
  toggleBtt(); // Set correct state on page load
  window.addEventListener("scroll", toggleBtt, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const activateLink = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach((sec) => {
      if (
        scrollY >= sec.offsetTop &&
        scrollY < sec.offsetTop + sec.offsetHeight
      ) {
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + sec.id);
        });
      }
    });
  };
  window.addEventListener("scroll", activateLink, { passive: true });

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("active");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05 }, // 5% visible is enough to trigger
  );
  revealEls.forEach((el) => {
    // If already in viewport on page load, reveal immediately
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("active");
    } else {
      observer.observe(el);
    }
  });

  // --- Activity Modals ---
  const overlay = document.getElementById("modal-overlay");
  const allModals = document.querySelectorAll(".modal");

  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    overlay.classList.add("active");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    overlay.classList.remove("active");
    allModals.forEach((m) => m.classList.remove("active"));
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".activity-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.modal));
  });
  document.querySelectorAll(".close-modal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeModal();
    });
  });
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
