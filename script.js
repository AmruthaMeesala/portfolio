// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      initReveal();
    }, 500);
  }, 1400);
});

// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
});

// ACTIVE NAV
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  links.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}

// MOBILE MENU
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// TYPING ANIMATION
const roles = ['Integrated M.Tech Student','Data Analytics Enthusiast','Power BI Developer','Python Programmer','SQL Enthusiast'];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typing-text');
function type() {
  const cur = roles[ri];
  if (!deleting) {
    el.textContent = cur.substring(0, ci + 1);
    ci++;
    if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = cur.substring(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 90);
}
setTimeout(type, 1600);

// SCROLL REVEAL
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// COUNTERS
function animateCounter(el) {
  const target = parseFloat(el.dataset.target || el.dataset.targetDecimal);
  const isDecimal = 'targetDecimal' in el.dataset;
  const dur = 1800;
  const steps = 60;
  const inc = target / steps;
  let cur = 0;
  let count = 0;
  const id = setInterval(() => {
    cur += inc;
    count++;
    if (count >= steps) { clearInterval(id); cur = target; }
    el.textContent = isDecimal ? cur.toFixed(2) : Math.round(cur) + (el.dataset.target === '6' ? '+' : '');
  }, dur / steps);
}
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('[data-target],[data-target-decimal]');
      nums.forEach(n => animateCounter(n));
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const statsSection = document.getElementById('stats');
if (statsSection) statObs.observe(statsSection);

// CONTACT FORM
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('formBtn');
  btn.textContent = 'Message Sent ✓';
  btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// REDUCED MOTION
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.orb').forEach(o => o.style.animation = 'none');
}
