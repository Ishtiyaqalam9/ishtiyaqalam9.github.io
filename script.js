document.addEventListener("DOMContentLoaded", () => {

  // Typewriter Effect
  const titles = ["CSE Student", "Competitive Programmer", "Software Developer", "Problem Solver", "Django Enthusiast"];
  const typewriterEl = document.getElementById("typewriter");
  let titleIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 80;

  function typeWriter() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      typewriterEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 300;
    }
    setTimeout(typeWriter, typeSpeed);
  }
  typeWriter();

  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Scroll Reveal Animations
  const observerOptions = { root: null, rootMargin: "0px 0px -80px 0px", threshold: 0.1 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".about-text, .about-stats, .cp-highlight, .cp-card, .skill-category, .wish-card").forEach((el, i) => {
    el.classList.add("fade-up");
    el.style.transitionDelay = `${i % 4 * 0.1}s`;
    revealObserver.observe(el);
  });

  document.querySelectorAll(".timeline-item").forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    revealObserver.observe(el);
  });

  // Counter Animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector(".about-stats");
  if (statsSection) counterObserver.observe(statsSection);

  function animateCounters() {
    document.querySelectorAll(".stat-number").forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 1500;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        counter.textContent = current;
        if (progress < 1) requestAnimationFrame(updateCounter);
        else counter.textContent = target;
      }
      requestAnimationFrame(updateCounter);
    });
  }

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
      }
    });
  });

  // Active Nav Link Highlight
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute("id");
    });
    navItems.forEach(item => {
      item.style.color = item.getAttribute("href") === `#${current}` ? "#a78bfa" : "";
    });
  });

  console.log("Portfolio Loaded 🚀");
});