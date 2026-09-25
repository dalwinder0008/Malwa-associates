document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky header border & shadow on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 15);
    }
  }, { passive: true });

  // 2. Mobile navigation drawer toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Footer current year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Hero Background Image Auto-Slider (Car, Tractor, JCB, Home)
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    slides[0].classList.add('active');

    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4500); // Har 4.5 second me background image auto-transition karegi
  }

  // 5. Enquiry Form Submit: Validates Phone and opens WhatsApp Directly
  const form = document.getElementById('enquiryForm');
  const status = document.getElementById('formStatus');
  const WHATSAPP_NUMBER = '918054701500';

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const loanType = document.getElementById('loanType').value;
      const message = document.getElementById('message').value.trim();

      const cleanPhone = phone.replace(/\D/g, '').slice(-10);

      // Validate 10-digit Indian phone (starts with 6, 7, 8, 9)
      if (!name || !/^[6-9]\d{9}$/.test(cleanPhone)) {
        status.textContent = 'Please enter your name and a valid 10-digit mobile number.';
        status.classList.remove('success');
        status.style.color = '#c62828';
        return;
      }

      // Format WhatsApp query text
      const waText = 
`*New Enquiry — Malwa Associates*
• *Name:* ${name}
• *Phone:* ${cleanPhone}
• *Requirement:* ${loanType}
${message ? `• *Note:* ${message}` : ''}`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

      status.textContent = `Thanks ${name}! Redirecting you to WhatsApp...`;
      status.classList.add('success');
      status.style.color = '#2E7D32';

      window.open(waUrl, '_blank');
      form.reset();
    });
  }
});