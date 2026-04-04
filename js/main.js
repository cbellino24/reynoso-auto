const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const heroSlides = document.querySelectorAll(".hero-media-slide");
let heroIndex = 0;

if (heroSlides.length > 1) {
  setInterval(() => {
    heroSlides[heroIndex].classList.remove("is-active");
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add("is-active");
  }, 4500);
}

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");
    if (!item) return;

    const isOpen = item.classList.toggle("is-open");
    question.setAttribute("aria-expanded", String(isOpen));
  });
});

const locationHeroSlides = document.querySelectorAll(".loc-hero-slide");
let locationHeroIndex = 0;

if (locationHeroSlides.length > 1) {
  setInterval(() => {
    locationHeroSlides[locationHeroIndex].classList.remove("is-active");
    locationHeroIndex = (locationHeroIndex + 1) % locationHeroSlides.length;
    locationHeroSlides[locationHeroIndex].classList.add("is-active");
  }, 4200);
}

/* =========================
   GALLERY CAROUSEL
   ========================= */

const gallerySlides = document.querySelectorAll(".gallery-carousel-slide");
const galleryDotsWrap = document.querySelector(".gallery-carousel-dots");
const galleryPrev = document.querySelector(".gallery-carousel-prev");
const galleryNext = document.querySelector(".gallery-carousel-next");
let galleryIndex = 0;
let galleryAutoRotate = null;

function renderGalleryDots() {
  if (!galleryDotsWrap || !gallerySlides.length) return;

  galleryDotsWrap.innerHTML = "";

  gallerySlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `gallery-carousel-dot ${index === galleryIndex ? "is-active" : ""}`;
    dot.setAttribute("aria-label", `Go to gallery slide ${index + 1}`);

    dot.addEventListener("click", () => {
      setGallerySlide(index);
      restartGalleryAutoRotate();
    });

    galleryDotsWrap.appendChild(dot);
  });
}

function setGallerySlide(index) {
  if (!gallerySlides.length) return;

  gallerySlides[galleryIndex].classList.remove("is-active");
  galleryIndex = (index + gallerySlides.length) % gallerySlides.length;
  gallerySlides[galleryIndex].classList.add("is-active");

  const dots = document.querySelectorAll(".gallery-carousel-dot");
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === galleryIndex);
  });
}

function restartGalleryAutoRotate() {
  if (galleryAutoRotate) clearInterval(galleryAutoRotate);

  if (gallerySlides.length > 1) {
    galleryAutoRotate = setInterval(() => {
      setGallerySlide(galleryIndex + 1);
    }, 4600);
  }
}

if (gallerySlides.length > 0) {
  renderGalleryDots();
  restartGalleryAutoRotate();

  if (galleryPrev) {
    galleryPrev.addEventListener("click", () => {
      setGallerySlide(galleryIndex - 1);
      restartGalleryAutoRotate();
    });
  }

  if (galleryNext) {
    galleryNext.addEventListener("click", () => {
      setGallerySlide(galleryIndex + 1);
      restartGalleryAutoRotate();
    });
  }
}

/* =========================
   GALLERY LIGHTBOX
   ========================= */

const galleryCards = document.querySelectorAll(".gallery-card");
const galleryLightbox = document.getElementById("galleryLightbox");
const galleryLightboxImage = document.querySelector(".gallery-lightbox-image");
const galleryLightboxClose = document.querySelector(".gallery-lightbox-close");

function closeGalleryLightbox() {
  if (!galleryLightbox) return;
  galleryLightbox.classList.remove("is-open");
  galleryLightbox.setAttribute("aria-hidden", "true");
  if (galleryLightboxImage) {
    galleryLightboxImage.src = "";
    galleryLightboxImage.alt = "";
  }
}

if (galleryCards.length && galleryLightbox && galleryLightboxImage) {
  galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const imageSrc = card.getAttribute("data-gallery-image");
      const imageAlt = card.getAttribute("data-gallery-alt") || "Gallery image";

      galleryLightboxImage.src = imageSrc;
      galleryLightboxImage.alt = imageAlt;
      galleryLightbox.classList.add("is-open");
      galleryLightbox.setAttribute("aria-hidden", "false");
    });
  });

  if (galleryLightboxClose) {
    galleryLightboxClose.addEventListener("click", closeGalleryLightbox);
  }

  galleryLightbox.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) {
      closeGalleryLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeGalleryLightbox();
    }
  });
}

if (window.lucide) {
  window.lucide.createIcons();
}