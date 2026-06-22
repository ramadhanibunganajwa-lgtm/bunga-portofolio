document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. NAVBAR: efek scroll + toggle menu mobile
  ========================================================= */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 10);
  });

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Tutup menu mobile saat salah satu link diklik
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* =========================================================
     2. ACTIVE NAV LINK saat scroll (highlight sesuai section)
  ========================================================= */
  const sections = document.querySelectorAll("main section[id]");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });

  sections.forEach(section => navObserver.observe(section));

  /* =========================================================
     3. SCROLL REVEAL: fade-up untuk elemen [data-reveal]
  ========================================================= */
  const revealEls = document.querySelectorAll("[data-reveal]");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el, i) => {
    // delay kecil bertahap agar elemen muncul satu-satu, bukan serentak
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    revealObserver.observe(el);
  });

  /* =========================================================
     4. CURSOR GLOW: blob lembut yang mengikuti mouse (desktop saja)
  ========================================================= */
  const cursorGlow = document.getElementById("cursorGlow");
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (isFinePointer && cursorGlow) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
      cursorGlow.classList.add("is-active");
    });

    document.addEventListener("mouseleave", () => {
      cursorGlow.classList.remove("is-active");
    });
  }

  /* =========================================================
     5. CONTACT FORM: handler sederhana (tanpa backend)
     Ganti bagian ini dengan integrasi form-service (misal Formspree,
     EmailJS, atau backend kamu sendiri) saat sudah siap dipakai.
  ========================================================= */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();

      // TODO: ganti console.log + alert ini dengan request ke
      // form service / API kamu (lihat catatan di atas).
      console.log("Form submitted:", {
        name,
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
      });

      formStatus.textContent = `Terima kasih, ${name || "kamu"}! Pesan kamu sudah "terkirim" (placeholder — hubungkan ke form service untuk pengiriman sungguhan).`;
      contactForm.reset();
    });
  }

  /* =========================================================
     6. FOOTER: tahun otomatis
  ========================================================= */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
