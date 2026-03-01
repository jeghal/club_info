document.addEventListener("DOMContentLoaded", () => {
  // 1. Bouton Impression
  const printBtn = document.querySelector(".print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      console.log("Impression Web");
    });
  }

  // 2. Animations au Scrolling
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".timeline-step").forEach((step, index) => {
    step.style.opacity = "0";
    step.style.transform = "translateY(20px)";
    step.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
    observer.observe(step);
  });

  // 3. Bouton Retour Serveur Central (si sur une sous-page)
  const isIndex =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";
  if (!isIndex) {
    const btn = document.createElement("a");
    btn.href = "index.html";
    btn.innerHTML =
      "🏠 <span style=\"font-size: 0.9rem; font-weight: 600; margin-left: 5px; font-family: 'Outfit', sans-serif;\">Accueil</span>";
    btn.style.cssText = `
            position: fixed; top: 20px; left: 20px; background: white; color: #1A1A24;
            text-decoration: none; padding: 8px 15px; border-radius: 30px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; align-items: center;
            z-index: 100; transition: all 0.3s ease;
        `;
    btn.onmouseover = () => {
      btn.style.transform = "translateY(-2px)";
      btn.style.color = "#E44D26";
    };
    btn.onmouseout = () => {
      btn.style.transform = "translateY(0)";
      btn.style.color = "#1A1A24";
    };
    document.body.appendChild(btn);
  }
});
