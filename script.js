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

// for responsive pic
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

    document.querySelectorAll('.faq-answer').forEach(ans => {
      if (ans !== answer) {
        ans.style.height = '0';
        ans.classList.remove('open');
      }
    });

    if (answer.classList.contains('open')) {
      answer.style.height = '0';
      answer.classList.remove('open');
    } else {
      answer.style.height = answer.scrollHeight + 'px';
      answer.classList.add('open');
    }
    });
  });
});

// scroll magic
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    // flashcard
    if (entry.target.classList.contains('flashcard')) {
      const inner = entry.target.querySelector('.flashcard-inner');
      if (inner && !entry.isIntersecting) {
        inner.classList.remove('flipped');
      }
    }

    // for lottie
    if (entry.target._lottieAnim) {
      if (entry.isIntersecting) {
        entry.target._lottieAnim.play();
      } else {
        entry.target._lottieAnim.stop();
      }
    }

    // animate-on-scroll
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.flashcard, .animate-on-scroll, .lottie-container')
  .forEach(el => observer.observe(el));

// enable flipping on click
document.querySelectorAll('.flashcard').forEach(card => {
  const inner = card.querySelector('.flashcard-inner');
  if (inner) {
    card.addEventListener('click', () => {
      inner.classList.toggle('flipped');
    });
  }
});

// lottie setup
document.querySelectorAll('.lottie-container').forEach(container => {
  const anim = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: container.dataset.animation
  });

  container._lottieAnim = anim;
});


