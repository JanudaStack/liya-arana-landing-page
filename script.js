// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial Load Animation (Hero Section)
const tl = gsap.timeline();

tl.from(".logo", { duration: 1, y: -20, opacity: 0, ease: "power3.out" })
  .from(
    ".nav-icons i",
    { duration: 0.8, y: -20, opacity: 0, stagger: 0.1, ease: "power3.out" },
    "-=0.5",
  )
  .from(
    ".anim-hero",
    { duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: "power3.out" },
    "-=0.5",
  )
  .from(
    ".anim-hero-img",
    { duration: 1.2, x: 30, opacity: 0, ease: "power3.out" },
    "-=1",
  );

// Scroll Animations (Features)
gsap.from(".feature-item", {
  scrollTrigger: {
    trigger: ".features",
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
});

// Scroll Animations (Products)
gsap.from(".product-card", {
  scrollTrigger: {
    trigger: ".products",
    start: "top 75%",
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
});

// About Us Animation
gsap.from(".about-content", {
  scrollTrigger: {
    trigger: ".about-us",
    start: "top 75%",
  },
  x: 50,
  opacity: 0,
  duration: 1,
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

const navLinks = document.querySelectorAll(".desktop-nav a");

// Hama link ekakatama "Click" event ekak danawa
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Kalin active wela thibba hama ekakma normal karanawa
    navLinks.forEach((nav) => nav.classList.remove("active"));

    // Dan click karapu ekata 'active' class eka danawa
    this.classList.add("active");
  });
});

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});
