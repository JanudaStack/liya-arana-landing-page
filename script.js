// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Fake Reviews Data Array
const reviews = [
    {
        text: "Absolutely in love with the Minimal Sofa! The fabric quality is top-notch and it fits perfectly in my living room. Highly recommended.",
        author: "AMARABANDU RUPASINHA"
    },
    {
        text: "Fast delivery and excellent packaging. The wooden table set looks exactly like the photos. Great job Liya Arana team!",
        author: "KASUN PERERA"
    },
    {
        text: "I was skeptical about buying furniture online, but this store changed my mind. The customer service was super helpful.",
        author: "DAYANANDA THENNEKOON"
    },
    {
        text: "Meyalage badu wala quality eka mara hodai. Gedaratama genath dunna, kisima damage ekak na. Thank you!",
        author: "NIMAL RATHNAYAKE"
    }
];

const heroSlides = [
    {
        title: "WOODEN TABLE SET",
        desc: "Aliquet donec ut arcu risus amet mattis diam gravida. Ac vestibulum quis proin in aliquam et et auctor. Amet urna est arcu euismod.",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
    },
    {
        title: "MODERN SOFA DESIGN",
        desc: "Experience ultimate comfort with our new modern sofa collection. Designed for luxury living rooms with premium materials.",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1770&q=80"
    }
];

const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");
const heroImg = document.getElementById("hero-img");
const dots = document.querySelectorAll(".dot");

function goToSlide(index) {
    // Already animate wenawa nam hari, same slide eka nam hari mukuth karanna epa
    if (isAnimating || currentSlideIndex === index) return;
    
    isAnimating = true;
    currentSlideIndex = index;

    // Timeline ekak hadamu animation eka control karanna
    const tl = gsap.timeline({
        onComplete: () => { isAnimating = false; } // Animation iwara unama lock eka arinawa
    });

    // Step A: Thiyena content eka fade out karanawa
    tl.to([heroTitle, heroDesc, heroImg], {
        opacity: 0,
        y: -20, // Poddak udata yawanawa
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            // Step B: Content eka maru karanawa (Hidden wela thiyeddi)
            heroTitle.innerText = heroSlides[index].title;
            heroDesc.innerText = heroSlides[index].desc;
            heroImg.src = heroSlides[index].image;
            
            // Dots update kirima
            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");
        }
    })
    // Step C: Aluth content eka fade in karanawa
    .to([heroTitle, heroDesc, heroImg], {
        opacity: 1,
        y: 0, // Ayeth thibba thanata gannawa
        duration: 0.5,
        ease: "power2.out"
    });
}

// 3. Auto Play (Optional) - Sekond 6kata sarayak auto maru wenna
setInterval(() => {
    let nextIndex = (currentSlideIndex + 1) % heroSlides.length;
    goToSlide(nextIndex);
}, 5000);

let currentSlideIndex = 0;
let isAnimating = false;

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

const backToTopBtn = document.getElementById('backToTop');

// 1. Scroll weddi button eka pennanna/hanganna
window.addEventListener('scroll', () => {
    // Page eka 500px wada scroll unama button eka pennanawa
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// 2. Click kalahama smooth scroll wenna
backToTopBtn.addEventListener('click', () => {
    // Api kalin dapu Lenis use karanawa nam me code eka maru
    if (typeof lenis !== 'undefined') {
        lenis.scrollTo(0, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
    } else {
        // Lenis naththam normal browser scroll eka
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

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
