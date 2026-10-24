
/* =========================================================
   HYBRID 3D + GLASSMORPHISM DIGITAL PORTFOLIO
   File: script.js
   Plain JavaScript — no frameworks required
   ========================================================= */

   document.documentElement.classList.add("js-ready");

   document.addEventListener("DOMContentLoaded", () => {
     /* 1. MOBILE NAVIGATION */
   
     const menuToggle = document.querySelector(".menu-toggle");
     const navLinks = document.querySelector(".nav-links");
     const navigationLinks = document.querySelectorAll(".nav-link, .nav-contact");
   
     function closeMenu() {
       if (!menuToggle || !navLinks) return;
   
       menuToggle.setAttribute("aria-expanded", "false");
       navLinks.classList.remove("is-open");
       menuToggle.setAttribute("aria-label", "Open navigation menu");
     }
   
     if (menuToggle && navLinks) {
       menuToggle.addEventListener("click", () => {
         const isExpanded =
           menuToggle.getAttribute("aria-expanded") === "true";
   
         menuToggle.setAttribute(
           "aria-expanded",
           String(!isExpanded)
         );
         menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
   
         navLinks.classList.toggle("is-open", !isExpanded);
       });
   
       navigationLinks.forEach((link) => {
         link.addEventListener("click", closeMenu);
       });

       // A desktop resize should never leave the menu stuck open.
       window.addEventListener("resize", () => {
         if (window.innerWidth > 900) closeMenu();
       });
   
       document.addEventListener("click", (event) => {
         if (
           !menuToggle.contains(event.target) &&
           !navLinks.contains(event.target)
         ) {
           closeMenu();
         }
       });
   
       document.addEventListener("keydown", (event) => {
         if (event.key === "Escape") {
           closeMenu();
           menuToggle.focus();
         }
       });
     }
   
   
     /* 2. SCROLL REVEAL ANIMATIONS */
   
     const revealElements = document.querySelectorAll(
       ".hero-copy, .hero-visual, .section-heading, " +
       ".about-card, .education-intro, .timeline-card, " +
       ".project-card, .certificate-card, .contact-panel"
     );
   
     revealElements.forEach((element) => {
       element.classList.add("reveal");
     });
   
     if ("IntersectionObserver" in window &&
         !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
         window.innerWidth > 760) {
       const revealObserver = new IntersectionObserver(
         (entries, observer) => {
           entries.forEach((entry) => {
             if (entry.isIntersecting) {
               entry.target.classList.add("is-visible");
               observer.unobserve(entry.target);
             }
           });
         },
         {
           threshold: 0.12,
           rootMargin: "0px 0px -35px 0px",
         }
       );
   
       revealElements.forEach((element) => {
         revealObserver.observe(element);
       });
     } else {
       revealElements.forEach((element) => {
         element.classList.add("is-visible");
       });
     }
   
   
     /* 3. ACTIVE NAVIGATION LINK */
   
     const sections = document.querySelectorAll(
       "#home, #about, #education, #projects, #certificates, #contact"
     );
   
     if ("IntersectionObserver" in window && sections.length) {
       const sectionObserver = new IntersectionObserver(
         (entries) => {
           entries.forEach((entry) => {
             if (entry.isIntersecting) {
               const currentId = entry.target.id;
   
               navigationLinks.forEach((link) => {
                 const isActive =
                   link.getAttribute("href") === `#${currentId}`;
   
                 link.classList.toggle("active", isActive);
   
                 if (isActive) {
                   link.setAttribute("aria-current", "location");
                 } else {
                   link.removeAttribute("aria-current");
                 }
               });
             }
           });
         },
         {
           rootMargin: "-25% 0px -60% 0px",
         }
       );
   
       sections.forEach((section) => {
         sectionObserver.observe(section);
       });
     }
   
   
     /* 4. CURSOR-RESPONSIVE 3D OBJECT */
   
     const heroVisual = document.querySelector(".hero-visual");
     const glassObject = document.querySelector(".glass-object");
   
     const supportsHover = window.matchMedia(
       "(hover: hover) and (pointer: fine)"
     );
   
     const prefersReducedMotion = window.matchMedia(
       "(prefers-reduced-motion: reduce)"
     );
   
     if (
       heroVisual &&
       glassObject &&
       supportsHover.matches &&
       !prefersReducedMotion.matches
     ) {
       heroVisual.addEventListener("mousemove", (event) => {
         const bounds = heroVisual.getBoundingClientRect();
   
         const x = (event.clientX - bounds.left) / bounds.width;
         const y = (event.clientY - bounds.top) / bounds.height;
   
         const rotateY = (x - 0.5) * 16;
         const rotateX = (0.5 - y) * 16;
   
         glassObject.style.transform =
           `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
       });
   
       heroVisual.addEventListener("mouseleave", () => {
         glassObject.style.transform = "";
       });
     }
   
   
     /* 6. AUTOMATIC COPYRIGHT YEAR */
   
     const copyrightYear = document.querySelector(
       "#current-year"
     );
   
     if (copyrightYear) {
       copyrightYear.textContent = new Date().getFullYear();
     }
   
   
     /* 7. CONTACT EMAIL BUTTON */
   
     const emailButtons = document.querySelectorAll(
       "[data-email-link]"
     );
   
     emailButtons.forEach((button) => {
       button.addEventListener("click", () => {
         const email = button.dataset.emailLink;
   
         if (
           email &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
         ) {
           window.location.href = `mailto:${email}`;
         }
       });
     });
   
   
     /* 8. BACK-TO-TOP BUTTON */
   
     const backToTop = document.querySelector(".back-to-top");
   
     if (backToTop) {
       backToTop.addEventListener("click", (event) => {
         event.preventDefault();
   
         window.scrollTo({
           top: 0,
           behavior: prefersReducedMotion.matches
             ? "auto"
             : "smooth",
         });
       });
     }
   
   
     /* 9. OPTIONAL 3D TILT FOR PROJECT CARDS */
   
     const projectCards = document.querySelectorAll(
       ".project-card"
     );
   
     if (
       supportsHover.matches &&
       !prefersReducedMotion.matches
     ) {
       projectCards.forEach((card) => {
         card.addEventListener("mousemove", (event) => {
           const bounds = card.getBoundingClientRect();
   
           const x = (event.clientX - bounds.left) / bounds.width;
           const y = (event.clientY - bounds.top) / bounds.height;
   
           const rotateY = (x - 0.5) * 3;
           const rotateX = (0.5 - y) * 3;
   
           card.style.transform =
             `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
         });
   
         card.addEventListener("mouseleave", () => {
           card.style.transform = "";
         });
       });
     }
   
     console.info(
       "Portfolio initialized successfully."
     );
   });

   
/* =========================================
   HYBRID 3D EXPERIENCE — HERO SCROLL MOTION
========================================= */

(() => {
  const hero = document.querySelector("#hero-visual");
  const object = document.querySelector("#glass-object");

  if (!hero || !object) return;

  const outerOrbit = hero.querySelector(".orbit-outer");
  const innerOrbit = hero.querySelector(".orbit-inner");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reduceMotion.matches ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.innerWidth <= 760) return;

  let ticking = false;

  function updateHeroMotion() {
    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Progress changes as the hero moves through the viewport.
    const progress = Math.max(
      0,
      Math.min(
        1,
        (viewportHeight - rect.top) /
          (viewportHeight + rect.height)
      )
    );

    const rotationY = (progress - 0.5) * 20;
    const rotationX = (0.5 - progress) * 12;
    const translateY = (progress - 0.5) * -55;
    const scale = 1 - progress * 0.08;

    object.style.transform = `
      perspective(1000px)
      translate3d(0, ${translateY}px, 0)
      rotateX(${rotationX}deg)
      rotateY(${rotationY}deg)
      scale(${scale})
    `;

    if (outerOrbit) {
      outerOrbit.style.rotate = `${progress * 100}deg`;
    }

    if (innerOrbit) {
      innerOrbit.style.rotate = `${progress * -140}deg`;
    }

    ticking = false;
  }

  function requestHeroUpdate() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(updateHeroMotion);
  }

  window.addEventListener("scroll", requestHeroUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestHeroUpdate);

  updateHeroMotion();
})();


/* =========================================
   CINEMATIC PROJECT REVEAL — SCROLL
========================================= */

(() => {
  const projectCards = document.querySelectorAll(".project-card");

  if (!projectCards.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reduceMotion.matches || window.innerWidth <= 760 ||
      window.matchMedia("(pointer: coarse)").matches) {
    projectCards.forEach((card) => {
      card.classList.add("is-project-visible");
    });
    return;
  }

  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-project-visible");
        } else {
          entry.target.classList.remove("is-project-visible");
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  projectCards.forEach((card) => {
    projectObserver.observe(card);
  });
})();


/* =========================================
   STEP 4 — SCROLL-REACTIVE PROJECT PARALLAX
========================================= */

(() => {
  const visuals = document.querySelectorAll(
    ".project-card .project-image, .project-card .project-screenshot"
  );

  if (!visuals.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches ||
      window.innerWidth <= 760) {
    return;
  }

  let scheduled = false;

  function updateParallax() {
    const viewportHeight = window.innerHeight;

    visuals.forEach((visual) => {
      const rect = visual.getBoundingClientRect();

      // Ignore visuals far outside the viewport.
      if (rect.bottom < -100 || rect.top > viewportHeight + 100) {
        return;
      }

      const centerOffset =
        (rect.top + rect.height / 2 - viewportHeight / 2) /
        (viewportHeight / 2);

      const progress = Math.max(-1, Math.min(1, centerOffset));
      const tilt = progress * -3;
      const shift = progress * -12;

      visual.style.transform = `
        perspective(1200px)
        translate3d(0, ${shift}px, 0)
        rotateX(${tilt}deg)
      `;
    });

    scheduled = false;
  }

  function requestParallaxUpdate() {
    if (scheduled) return;

    scheduled = true;
    window.requestAnimationFrame(updateParallax);
  }

  window.addEventListener("scroll", requestParallaxUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestParallaxUpdate);

  updateParallax();
})();


/* =========================================
   STEP 5 — MAGNETIC HERO BUTTONS
========================================= */

(() => {
  const buttons = document.querySelectorAll(".hero-actions .button");

  if (!buttons.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  if (reducedMotion.matches || !finePointer.matches) return;

  buttons.forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const offsetX = (x / rect.width - 0.5) * 10;
      const offsetY = (y / rect.height - 0.5) * 8;

      button.style.setProperty("--magnetic-x", `${offsetX}px`);
      button.style.setProperty("--magnetic-y", `${offsetY}px`);
      button.style.setProperty("--light-x", `${x}px`);
      button.style.setProperty("--light-y", `${y}px`);

      button.classList.add("is-magnetic-active");
    });

    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--magnetic-x", "0px");
      button.style.setProperty("--magnetic-y", "0px");
      button.classList.remove("is-magnetic-active");
    });
  });
})();

/* =========================================
   STEP 6 — CINEMATIC HEADING REVEALS
========================================= */

(() => {
  const headings = document.querySelectorAll(".section-heading");

  if (!headings.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches) return;

  const headingObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-heading-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  headings.forEach((heading) => {
    headingObserver.observe(heading);
  });
})();
