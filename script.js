document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: "ease-out-cubic",
  });

  // Mobile menu functionality
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navList = document.querySelector("nav ul");

  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    navList.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburgerMenu.contains(e.target) && !navList.contains(e.target)) {
      hamburgerMenu.classList.remove("active");
      navList.classList.remove("active");
    }
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // Close mobile menu if open
      hamburgerMenu.classList.remove("active");
      navList.classList.remove("active");

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // Certificate modal functionality
  const certificate = document.getElementById("certificate");
  const modal = document.getElementById("certificate-modal");
  const modalImg = document.getElementById("certificate-large");
  const span = document.getElementsByClassName("close")[0];

  if (certificate && modal && modalImg && span) {
    certificate.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    };

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  // Form submission handling
  const form = document.querySelector('form[name="contact"]');
  const submitButton = form.querySelector('button[type="submit"]');

  if (form && submitButton) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
        .then(() => {
          alert("Thank you for your message. I will get back to you soon!");
          form.reset();
        })
        .catch((error) => {
          alert(
            "Oops! There was a problem submitting your form. Please try again later."
          );
          console.error("Error:", error);
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = "Send";
        });
    });
  }

  // Scroll-to-top button
  const scrollTopButton = document.createElement("button");
  scrollTopButton.className = "scroll-to-top";
  scrollTopButton.innerHTML =
    '<span aria-hidden="true">↑</span><span class="sr-only">Scroll to top</span>';
  document.body.appendChild(scrollTopButton);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.display = "flex";
    } else {
      scrollTopButton.style.display = "none";
    }
  });

  scrollTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Section highlighting
  const sections = document.querySelectorAll("section");
  const headerHeight = document.querySelector("header").offsetHeight;

  function updateActiveSection() {
    const scrollPosition = window.scrollY + headerHeight + 100;
    let currentSection = null;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;
      const sectionId = section.getAttribute("id");

      // Check if we're in the top 40% of the section
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight * 0.4
      ) {
        currentSection = sectionId;
      }
    });

    // Update active link
    if (currentSection) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    }
  }

  // Update active section on scroll with throttling
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check for active section
  updateActiveSection();
});
