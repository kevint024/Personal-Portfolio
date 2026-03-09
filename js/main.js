// ============================================
// GSAP & ScrollTrigger Setup
// ============================================
gsap.registerPlugin(ScrollTrigger);

// ============================================
// DOM References
// ============================================
const scrollContainer = document.querySelector("[data-scroll-container]");
const toContactButtons = document.querySelectorAll(".contact-scroll");
const footer = document.getElementById("js-footer");
const emailButton = document.querySelector("button.email");
const toCopyText = document.querySelector(".to-copy span");
const loader = document.querySelector(".loader");

// ============================================
// Time Component
// ============================================
function updateTime() {
  const now = new Date();
  const hourEl = document.querySelector("[data-hour]");
  const minuteEl = document.querySelector("[data-minute]");
  if (hourEl && minuteEl) {
    hourEl.textContent = String(now.getHours()).padStart(2, "0");
    minuteEl.textContent = String(now.getMinutes()).padStart(2, "0");
  }
}

updateTime();
setInterval(updateTime, 1000);

// ============================================
// Copy Email Functionality
// ============================================
function copyEmail(e) {
  const email = e.target.textContent.trim();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email);
  } else {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = email;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

if (emailButton) {
  emailButton.addEventListener("click", (e) => {
    copyEmail(e);
    if (toCopyText) {
      toCopyText.textContent = "Copied!";
      setTimeout(() => {
        toCopyText.textContent = "Click To Copy";
      }, 2000);
    }
  });
}

// ============================================
// Scroll to Contact
// ============================================
toContactButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ============================================
// Loader
// ============================================
window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) {
      loader.classList.add("loaded");
    }
    // Show the main content
    if (scrollContainer) {
      gsap.to(scrollContainer, { autoAlpha: 1, duration: 0.3 });
    }
    // Start intro animations
    homeIntro();
    homeAnimations();
    heroTextAnimation();
  }, 1400);
});

// ============================================
// Intro Animation
// ============================================
function homeIntro() {
  const tl = gsap.timeline();

  tl.from(".home__nav", {
    duration: 0.5,
    delay: 0.3,
    opacity: 0,
    yPercent: -100,
    ease: "power4.out",
  })
    .from(
      ".hero__name",
      {
        duration: 0.8,
        yPercent: 100,
        ease: "power4.out",
      }
    )
    .from(
      ".hero__subtitle",
      {
        duration: 0.8,
        yPercent: 100,
        ease: "power4.out",
      },
      "-=0.5"
    )
    .from(
      ".hero__title .bottom__right",
      {
        duration: 1,
        yPercent: 50,
        opacity: 0,
        ease: "power4.out",
      },
      "-=0.4"
    );
}

// ============================================
// Scroll Animations
// ============================================
function homeAnimations() {
  // Line animations
  gsap.to(".home__projects__line", { autoAlpha: 1 });

  gsap.utils.toArray(".home__projects__line").forEach((el) => {
    const line = el.querySelector("span");
    if (line) {
      gsap.from(line, {
        duration: 1.5,
        scrollTrigger: {
          trigger: el,
        },
        scaleX: 0,
      });
    }
  });

  // Fade in animations
  gsap.utils.toArray("[data-fade-in]").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
      },
      duration: 1.5,
      yPercent: 100,
      opacity: 0,
      ease: "power4.out",
    });
  });

  // Mobile project animations
  if (window.innerWidth <= 768) {
    gsap.utils.toArray(".home__projects__project").forEach((el) => {
      const text = el.querySelector(".title__main");
      const link = el.querySelector(".project__link");
      if (text) {
        gsap.from([text, link].filter(Boolean), {
          scrollTrigger: {
            trigger: el,
          },
          duration: 1.5,
          yPercent: 100,
          stagger: { amount: 0.2 },
          ease: "power4.out",
        });
      }
    });

    // Awards title animation on mobile
    const awardsTl = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: {
        trigger: ".home__awards",
      },
    });

    awardsTl.from(".awards__title span", {
      duration: 1,
      opacity: 0,
      yPercent: 100,
      stagger: { amount: 0.2 },
    });
  }

  // Parallax scrolling for project titles on desktop
  if (window.innerWidth > 768) {
    gsap.utils.toArray("[data-scroll]").forEach((el) => {
      const direction = el.getAttribute("data-scroll-direction");
      const speed = parseFloat(el.getAttribute("data-scroll-speed")) || 0;

      if (direction === "horizontal" && speed !== 0) {
        gsap.to(el, {
          x: () => speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }
}

// ============================================
// Hero Text Dash Animation
// ============================================
function heroTextAnimation() {
  // No dash animation needed with simplified hero
}
