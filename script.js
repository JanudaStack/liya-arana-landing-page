// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Fake Reviews Data Array
const reviews = [
    {
        text: "Absolutely in love with the Minimal Sofa! The fabric quality is top-notch and it fits perfectly in my living room. Highly recommended.",
        author: "SARAH JENKINS"
    },
    {
        text: "Fast delivery and excellent packaging. The wooden table set looks exactly like the photos. Great job Furnics team!",
        author: "KASUN PERERA"
    },
    {
        text: "I was skeptical about buying furniture online, but this store changed my mind. The customer service was super helpful.",
        author: "DAVID MILLER"
    },
    {
        text: "Meyalage badu wala quality eka mara hodai. Gedaratama genath dunna, kisima damage ekak na. Thank you!",
        author: "NIMAL RATHNAYAKE"
    }
];

let currentReview = 0;
const textElement = document.getElementById("review-text");
const authorElement = document.getElementById("review-author");

function changeReview() {
    // A. Next Review Index eka gannawa (Array eka iwara unama ayeth 0 wenne me modulo '%' nisa)
    currentReview = (currentReview + 1) % reviews.length;

    // B. GSAP Animation Sequence
    const tl = gsap.timeline();

    // Step 1: Thiyena Text eka uda gihin fade-out wenawa
    tl.to([textElement, authorElement], {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            // Step 2: Text eka maru karanawa (Animation eka athulema)
            textElement.innerText = `"${reviews[currentReview].text}"`;
            authorElement.innerText = reviews[currentReview].author;
        }
    })
    // Step 3: Aluth Text eka yata idan uda enawa (Fade-in)
    .fromTo([textElement, authorElement], 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
}

// 3. Set Interval (Every 5 Seconds)
// Winadi 5kata sarayak review eka auto maru wenawa
setInterval(changeReview, 4000);


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
