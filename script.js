// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Fake Reviews Data Array
const reviews = [
  {
    text: "Absolutely in love with the Minimal Sofa! The fabric quality is top-notch and it fits perfectly in my living room. Highly recommended.",
    author: "AMARABANDU RUPASINHA",
  },
  {
    text: "Fast delivery and excellent packaging. The wooden table set looks exactly like the photos. Great job Liya Arana team!",
    author: "KASUN PERERA",
  },
  {
    text: "I was skeptical about buying furniture online, but this store changed my mind. The customer service was super helpful.",
    author: "DAYANANDA THENNEKOON",
  },
  {
    text: "Meyalage badu wala quality eka mara hodai. Gedaratama genath dunna, kisima damage ekak na. Thank you!",
    author: "NIMAL RATHNAYAKE",
  },
];

const heroSlides = [
  {
    title: "WOODEN TABLE SET",
    desc: "Aliquet donec ut arcu risus amet mattis diam gravida. Ac vestibulum quis proin in aliquam et et auctor. Amet urna est arcu euismod.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
  },
  {
    title: "MODERN SOFA DESIGN",
    desc: "Experience ultimate comfort with our new modern sofa collection. Designed for luxury living rooms with premium materials.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1770&q=80",
  },
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
    onComplete: () => {
      isAnimating = false;
    }, // Animation iwara unama lock eka arinawa
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
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");
    },
  })
    // Step C: Aluth content eka fade in karanawa
    .to([heroTitle, heroDesc, heroImg], {
      opacity: 1,
      y: 0, // Ayeth thibba thanata gannawa
      duration: 0.5,
      ease: "power2.out",
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
    },
  })
    // Step 3: Aluth Text eka yata idan uda enawa (Fade-in)
    .fromTo(
      [textElement, authorElement],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
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

const backToTopBtn = document.getElementById("backToTop");

// 1. Scroll weddi button eka pennanna/hanganna
window.addEventListener("scroll", () => {
  // Page eka 500px wada scroll unama button eka pennanawa
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// 2. Click kalahama smooth scroll wenna
backToTopBtn.addEventListener("click", () => {
  // Api kalin dapu Lenis use karanawa nam me code eka maru
  if (typeof lenis !== "undefined") {
    lenis.scrollTo(0, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    // Lenis naththam normal browser scroll eka
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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

// --- SHOPPING CART LOGIC (DYNAMIC) ---

// DOM Elements
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElement = document.querySelector(".cart-total h3:last-child");
const cartCountElement = document.getElementById("cart-count");
const addCartButtons = document.querySelectorAll(".add-cart-btn");

// Cart Array (Items save karaganna thana)
let cart = [];

// 1. OPEN / CLOSE CART FUNCTIONS
function openCart() {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

cartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// 2. ADD TO CART FUNCTION
addCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Data Attributes walin wisthara gannawa
    const id = e.target.getAttribute("data-id");
    const name = e.target.getAttribute("data-name");
    const price = parseFloat(e.target.getAttribute("data-price"));
    const img = e.target.getAttribute("data-img");

    addToCart(id, name, price, img);
    openCart(); // Item eka dapu gaman cart eka pennanawa
  });
});

function addToCart(id, name, price, img) {
  // Item eka danatama cart eke thiyenawada balanawa
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    // Thiyenawa nam quantity wadi karanawa
    existingItem.quantity += 1;
  } else {
    // Naththam aluthin ekathu karanawa
    cart.push({ id, name, price, img, quantity: 1 });
  }

  updateCartUI();
}

// 3. REMOVE FROM CART FUNCTION
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

// 4. UPDATE CART UI (RENDER HTML)
function updateCartUI() {
  // A. Cart Items HTML clear karanawa
  cartItemsContainer.innerHTML = "";

  let totalPrice = 0;
  let totalCount = 0;

  // B. Cart eke thiyena hama item ekatama HTML hadanawa
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalCount += item.quantity;

    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");

    cartItemEl.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <i class="fas fa-trash remove-item" onclick="removeFromCart('${item.id}')"></i>
        `;

    cartItemsContainer.appendChild(cartItemEl);
  });

  // C. Total Price & Count Update karanawa
  cartTotalElement.innerText = "$" + totalPrice.toFixed(2);
  if (totalCount > 0) {
    // Badu thiyenawa nam pennanawa
    cartCountElement.style.display = "inline-block";
    cartCountElement.innerText = totalCount;
  } else {
    // Badu 0 nam hanganawa
    cartCountElement.style.display = "none";
  }

  // Header Text Update
  document.querySelector(".cart-header h3").innerText =
    `YOUR CART (${totalCount})`;

  // Header eke Cart Title eka update (Ex: YOUR CART (3))
  document.querySelector(".cart-header h3").innerText =
    `YOUR CART (${totalCount})`;
}

// --- QUANTITY CHANGE LOGIC ---

// 1. Quantity Wadi/Adu karana Function eka
function changeQuantity(id, action) {
  // Adala item eka hoyagannawa
  const item = cart.find((item) => item.id === id);

  if (item) {
    if (action === "plus") {
      item.quantity++; // Wadi karanawa
    } else if (action === "minus") {
      item.quantity--; // Adu karanawa

      // Quantity eka 0 unoth item eka ain karanawa
      if (item.quantity <= 0) {
        removeFromCart(id);
        return; // Methanin nawaththanawa (updateCartUI eka removeFromCart eken call wenawa)
      }
    }
  }
  updateCartUI(); // UI eka update karanawa
}

// 2. Updated Cart UI Function (HTML Structure wenas kala)
function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;
  let totalCount = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalCount += item.quantity;

    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");

    // Methana HTML eka wenas kala Buttons (+ -) ekathu karanna
    cartItemEl.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            
            <div class="item-details">
                <h4>${item.name}</h4>
                <p style="margin-bottom: 5px; font-size: 12px; color: #888;">$${item.price} each</p>
                
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="changeQuantity('${item.id}', 'minus')">-</button>
                    <span class="qty-count">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity('${item.id}', 'plus')">+</button>
                </div>
            </div>
            
            <i class="fas fa-trash remove-item" onclick="removeFromCart('${item.id}')"></i>
        `;

    cartItemsContainer.appendChild(cartItemEl);
  });

cartTotalElement.innerText = "$" + totalPrice.toFixed(2);

// 2. Count Badge Logic (Meka thama wadagathma tika)
if (totalCount > 0) {
    cartCountElement.style.display = 'block'; // Badu thiyenawa nam pennanawa
    cartCountElement.innerText = totalCount;
} else {
    cartCountElement.style.display = 'none';  // Badu nathnam hanganawa
}

// 3. Header Text Update
document.querySelector('.cart-header h3').innerText = `YOUR CART (${totalCount})`;
}
