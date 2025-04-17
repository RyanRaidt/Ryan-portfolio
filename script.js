document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerOffset = 60;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Certificate modal functionality
const certificate = document.getElementById('certificate');
const modal = document.getElementById('certificate-modal');
const modalImg = document.getElementById("certificate-large");
const span = document.getElementsByClassName("close")[0];

if (certificate && modal && modalImg && span) {
  certificate.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  };

  span.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
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
  scrollTopButton.textContent = "↑";
  scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;
  document.body.appendChild(scrollTopButton);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.display = "block";
    } else {
      scrollTopButton.style.display = "none";
    }
  });

  scrollTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});