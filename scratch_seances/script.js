document.addEventListener("DOMContentLoaded", () => {
  // 1. Bouton d'impression (déjà géré en HTML, mais on peut ajouter un effet sonore ou autre si besoin)
  const printBtn = document.querySelector(".print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", (e) => {
      // L'attribut onclick="window.print()" fait déjà le travail,
      // mais ce listener permet d'ajouter des comportements futurs.
      console.log("Préparation de l'impression...");
    });
  }

  // 2. Animations au défilement (Scroll) pour les éléments dans la timeline
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Appliquer l'observateur aux étapes de la timeline
  const timelineSteps = document.querySelectorAll(".timeline-step");
  timelineSteps.forEach((step, index) => {
    // Préparer l'état initial pour l'animation
    step.style.opacity = "0";
    step.style.transform = "translateY(20px)";
    step.style.transition = `all 0.5s ease-out ${index * 0.1}s`;

    observer.observe(step);
  });

  // 3. (Optionnel) Ajouter un bouton "Retour à l'accueil" s'il n'existe pas
  // Uniquement sur les pages de séance (pas sur index.html)
  const isIndexPage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";
  if (!isIndexPage) {
    const backBtn = document.createElement("a");
    backBtn.href = "index.html";
    backBtn.innerHTML =
      "🏠 <span style=\"font-size: 0.9rem; font-weight: 600; margin-left: 5px; font-family: 'Outfit', sans-serif;\">Accueil</span>";
    backBtn.style.position = "fixed";
    backBtn.style.top = "20px";
    backBtn.style.left = "20px";
    backBtn.style.background = "white";
    backBtn.style.color = "var(--text-main)";
    backBtn.style.textDecoration = "none";
    backBtn.style.padding = "8px 15px";
    backBtn.style.borderRadius = "30px";
    backBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
    backBtn.style.display = "flex";
    backBtn.style.alignItems = "center";
    backBtn.style.zIndex = "100";
    backBtn.style.transition = "all 0.3s ease";

    backBtn.addEventListener("mouseover", () => {
      backBtn.style.transform = "translateY(-2px)";
      backBtn.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
      backBtn.style.color = "var(--scratch-blue)";
    });

    backBtn.addEventListener("mouseout", () => {
      backBtn.style.transform = "translateY(0)";
      backBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
      backBtn.style.color = "var(--text-main)";
    });

    document.body.appendChild(backBtn);

    // Cacher le bouton à l'impression
    const style = document.createElement("style");
    style.textContent =
      '@media print { a[href="index.html"] { display: none !important; } }';
    document.head.appendChild(style);
  }
});
