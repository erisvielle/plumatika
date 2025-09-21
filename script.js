// responsive banner so it doesn't look off
function adjustBanner() {
  const isDesktop = window.innerWidth > 768;
  const banner = document.querySelector(".banner");
  const navbar = document.querySelector(".navbar");

  if (banner && navbar) {
    if (isDesktop) {
      banner.style.marginTop = "0px";
    } else {
      banner.style.marginTop = navbar.offsetHeight + "px";
    }
  }
}

window.addEventListener("load", adjustBanner);
window.addEventListener("resize", adjustBanner);

// changing of how menus are viewed depending on device
function toggleMenu() {
  const isDesktop = window.innerWidth > 768;
  const dropdown = document.getElementById("navmenu");
  const sidemenu = document.getElementById("sidemenu");

  if (isDesktop) {
    if (dropdown) dropdown.classList.toggle("show");
    if (sidemenu) sidemenu.classList.remove("open");
  } else {
    if (sidemenu) sidemenu.classList.toggle("open");
    if (dropdown) dropdown.classList.remove("show");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;

      // Close other answers
      document.querySelectorAll('.faq-answer').forEach(ans => {
        if (ans !== answer) ans.classList.remove('open');
      });

      // Toggle this answer
      answer.classList.toggle('open');
    });
  });
});

// scroll magic
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      lottie.play();
      obs.unobserve(entry.target);
    }
    const inner = entry.target.querySelector('.flashcard-inner');
    if (!entry.isIntersecting) {
      inner.classList.remove('flipped'); // reset to front (baybayin)
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.flashcard').forEach(card => observer.observe(card));

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// lottie stuff
lottie.loadAnimation({
  container: document.getElementById('writing-lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: false,
  path: 'icon/feather.json'
});

lottie.loadAnimation({
  container: document.getElementById('achieve-lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: false,
  path: 'icon/achievements.json'
});

// flip on click
document.querySelectorAll('.flashcard').forEach(card => {
  const inner = card.querySelector('.flashcard-inner');
  card.addEventListener('click', () => {
    inner.classList.toggle('flipped');
  });
});


