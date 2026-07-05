/* ── SCROLL PROGRESS BAR ── */
window.addEventListener('scroll', () => {
  const el  = document.getElementById('prog');
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  el.style.width = pct + '%';
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// Close when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.querySelector('.hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== btn) {
    menu.classList.remove('open');
  }
});

/* ── FADE-UP ON SCROLL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.fade-up');
      const index    = Array.from(siblings).indexOf(entry.target);
      entry.target.style.transitionDelay = (index * 80) + 'ms';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#e2e8f0';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));

/* ── CONTACT FORM ── */
function sendMsg(e) {
  e.preventDefault();

  const btn      = e.target.querySelector('button');
  const original = btn.textContent;
  const name     = e.target.querySelector('input[type="text"]');
  const email    = e.target.querySelector('input[type="email"]');

  if (!name.value.trim() || !email.value.trim()) {
    btn.textContent      = 'PLEASE FILL ALL FIELDS';
    btn.style.background = '#b45309';
    setTimeout(() => {
      btn.textContent      = original;
      btn.style.background = '';
    }, 2500);
    return;
  }

  btn.textContent      = 'SENDING…';
  btn.style.background = '#334155';
  btn.disabled         = true;

  setTimeout(() => {
    btn.textContent      = 'MESSAGE SENT ✓';
    btn.style.background = '#16a34a';
    btn.disabled         = false;
    e.target.reset();

    setTimeout(() => {
      btn.textContent      = original;
      btn.style.background = '';
    }, 3000);
  }, 1200);
}