document.addEventListener("DOMContentLoaded", () => {
  // Add future projects by copying one object in this list.
  // liveUrl and sourceUrl are optional. Leave sourceUrl empty when unavailable.
  const projects = [
    {
      title: "Personal Portfolio Website",
      category: "Live Web Project",
      description: "My personal website featuring my background, competitive programming, education, skills, wishlist and contact information.",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://ishtiyaqalam9.github.io",
      sourceUrl: ""
    }
  ];

  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map((project, index) => {
      const liveLink = project.liveUrl
        ? `<a href="${project.liveUrl}" target="_blank" rel="noreferrer">Live Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
        : "";
      const sourceLink = project.sourceUrl
        ? `<a href="${project.sourceUrl}" target="_blank" rel="noreferrer">Source Code <i class="fa-brands fa-github"></i></a>`
        : "";

      return `
        <article class="project-card">
          <div class="project-number">
            <span>${String(index + 1).padStart(2, "0")} / ${project.category}</span>
            <i class="fa-solid fa-code"></i>
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.technologies.map(technology => `<span>${technology}</span>`).join("")}
          </div>
          <div class="project-actions">${liveLink}${sourceLink}</div>
        </article>`;
    }).join("");
  }

  // Typewriter effect - original roles preserved.
  const titles = ["CSE Student", "Competitive Programmer", "Software Developer", "Problem Solver", "Django Enthusiast"];
  const typewriterEl = document.getElementById("typewriter");
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    if (!typewriterEl) return;
    const currentTitle = titles[titleIndex];
    typewriterEl.textContent = isDeleting
      ? currentTitle.substring(0, charIndex - 1)
      : currentTitle.substring(0, charIndex + 1);

    charIndex += isDeleting ? -1 : 1;
    let speed = isDeleting ? 38 : 78;

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      speed = 1700;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      speed = 280;
    }
    window.setTimeout(typeWriter, speed);
  }
  typeWriter();

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");

  navToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("active");
    navToggle.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle?.classList.remove("active");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 30);
    backToTop?.classList.toggle("visible", window.scrollY > 450);
  }, { passive: true });

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -70px 0px", threshold: 0.08 });

  document.querySelectorAll(
    ".about-text, .about-stats, .cp-highlight, .cp-card, .project-card, .skill-category, .wish-card, .contact-title, .contact-panel"
  ).forEach((element, index) => {
    element.classList.add("fade-up");
    element.style.transitionDelay = `${(index % 4) * 70}ms`;
    revealObserver.observe(element);
  });

  document.querySelectorAll(".timeline-item").forEach((element, index) => {
    element.style.transitionDelay = `${index * 90}ms`;
    revealObserver.observe(element);
  });

  const stats = document.querySelector(".about-stats");
  const counterObserver = new IntersectionObserver((entries, observer) => {
    if (entries.some(entry => entry.isIntersecting)) {
      document.querySelectorAll(".stat-number").forEach(counter => {
        const target = Number(counter.dataset.target || 0);
        const start = performance.now();
        const duration = 1400;

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = String(Math.floor(target * eased));
          if (progress < 1) requestAnimationFrame(update);
          else counter.textContent = String(target);
        }
        requestAnimationFrame(update);
      });
      observer.disconnect();
    }
  }, { threshold: 0.35 });
  if (stats) counterObserver.observe(stats);

  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navItems.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
  sections.forEach(section => activeObserver.observe(section));

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
});
