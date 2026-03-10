/* script.js
   Interaktivitas:
    - Mobile navbar toggle
    - Navbar background on scroll
    - IntersectionObserver untuk animasi saat scroll (fade-in/slide-in)
    - Memicu animasi progress bar skill
    - Smooth scrolling with offset fix for fixed navbar
    - Simple contact form validation/feedback (simulated send)
*/

/* -------------------------
   Utilities and DOM refs
   ------------------------- */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

/* ===== Navbar scroll behavior ===== */
const SCROLL_OFFSET = 60; // untuk menyesuaikan smooth scroll offset

function onScroll(){
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ===== Mobile nav toggle ===== */
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
  navToggle.classList.toggle('open');
});

/* Close mobile nav when clicking a link */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('mobile-open')) {
      navLinks.classList.remove('mobile-open');
      navToggle.classList.remove('open');
    }
  });
});

/* ===== Smooth scrolling with offset fix ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const targetId = this.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      // hitung posisi target dikurangi offset navbar
      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPos = rect.top + scrollTop - (SCROLL_OFFSET + 10);
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

/* ===== IntersectionObserver untuk animasi saat scroll ===== */
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.08
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      // jika elemen skill, trigger progress anim
      if (entry.target.classList.contains('skill')) {
        const bar = entry.target.querySelector('.progress-bar');
        const percent = entry.target.dataset.percent || entry.target.getAttribute('data-percent') || 0;
        // atur width berdasarkan persentase
        bar.style.width = percent + '%';
        bar.setAttribute('aria-valuenow', percent);
      }

      // jika project card / lainnya, Anda bisa menambahkan interaksi lebih lanjut di sini
    }
  });
}, observerOptions);

/* observe semua elemen dengan class .animate (dipakai di banyak bagian) */
document.querySelectorAll('.animate').forEach(el => observer.observe(el));

/* ===== Contact form handling (simulasi) ===== */
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // simple validation
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Mohon isi semua bidang sebelum mengirim.";
    formMessage.style.color = "#ffcccb";
    return;
  }

  // feedback sementara (di produksi, kirim ke server / API)
  formMessage.style.color = "#9aa6b2";
  formMessage.textContent = "Mengirim pesan...";

  setTimeout(() => {
    formMessage.style.color = "#7be0c7";
    formMessage.textContent = "Pesan berhasil dikirim! Saya akan menghubungi Anda segera.";
    contactForm.reset();
  }, 1000);
});

/* ===== Set copyright year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Optional: Add subtle hover tilt effect on project cards ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -3}deg) rotateY(${x * 6}deg) translateZ(0)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});