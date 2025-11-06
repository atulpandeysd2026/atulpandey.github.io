// ---- Typing effect for the Home tagline ----
const typingText = ["CSE Student", "Aspiring Software Engineer", "Passionate Learner"];
let i = 0, j = 0, isDeleting = false;

function typeEffect() {
  const el = document.getElementById("typing");
  if (!el) return;
  const current = typingText[i];
  el.textContent = current.substring(0, j) + (j % 2 ? "|" : "");
  if (!isDeleting && j++ === current.length) {
    isDeleting = true; setTimeout(typeEffect, 900);
  } else if (isDeleting && j-- === 0) {
    isDeleting = false; i = (i + 1) % typingText.length; setTimeout(typeEffect, 200);
  } else {
    setTimeout(typeEffect, isDeleting ? 80 : 120);
  }
}
typeEffect();

// ---- Animate skill bars when they enter viewport ----
const progressBars = document.querySelectorAll(".progress-bar");
function animateBars() {
  progressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60 && bar.style.width === "0%") {
      bar.style.width = bar.textContent; // uses the "80%" etc. text inside the bar
    }
  });
}
window.addEventListener("scroll", animateBars);
window.addEventListener("load", animateBars);

// ---- Formspree submission (no page redirect) ----
const form = document.getElementById("contact-form");
const statusBox = document.getElementById("form-status");

if (form && statusBox) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusBox.className = "alert alert-info mt-3";
    statusBox.textContent = "Sending...";

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        statusBox.className = "alert alert-success mt-3";
        statusBox.textContent = "✅ Thank you! Your message has been sent.";
        form.reset();
      } else {
        let msg = "❌ Something went wrong. Please try again.";
        try {
          const json = await res.json();
          if (json && json.errors) {
            msg = json.errors.map(e => e.message).join(", ");
          }
        } catch(_) {}
        statusBox.className = "alert alert-danger mt-3";
        statusBox.textContent = msg;
      }
    } catch (err) {
      statusBox.className = "alert alert-danger mt-3";
      statusBox.textContent = "❌ Network error. Please check your connection.";
    }
  });
}
