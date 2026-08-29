const header = document.getElementById("site-header");
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav a");

const syncHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 14);
};

syncHeader();
window.addEventListener("scroll", syncHeader, {
  passive: true
});

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  const theme = document.documentElement.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
});

menuToggle.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
  });
});

const sections = [...document.querySelectorAll("section[id], footer[id]")];
const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    desktopLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  }, {
    rootMargin: "-35% 0px -45% 0px",
    threshold: [0.1, 0.35, 0.6],
  }
);

sections.forEach((section) => observer.observe(section));