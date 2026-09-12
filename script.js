/* ============================================
   RECANTO DELICIÊ — JavaScript
   Funcionalidades: scroll reveal, menu mobile,
   navbar scroll, smooth scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── MENU MOBILE ───────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    navLinks.classList.add('open');
    menuToggle.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Fechar menu ao clicar nos links
  const navAnchors = navLinks.querySelectorAll('a');
  navAnchors.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  });


  // ─── NAVBAR SCROLL EFFECT ─────────────────
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      navbar.style.boxShadow = '0 2px 30px rgba(244, 154, 193, 0.2)';
    } else {
      navbar.style.boxShadow = '0 1px 20px rgba(244, 154, 193, 0.15)';
    }

    lastScrollY = currentScrollY;
  }, { passive: true });


  // ─── SCROLL REVEAL ANIMATION ──────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ─── SMOOTH SCROLL para âncoras ───────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ─── WHATSAPP FLOAT SHOW/HIDE ─────────────
  const whatsappFloat = document.getElementById('whatsappFloat');

  function toggleWhatsappVisibility() {
    if (window.scrollY > 300) {
      whatsappFloat.style.opacity = '1';
      whatsappFloat.style.pointerEvents = 'auto';
    } else {
      whatsappFloat.style.opacity = '0.6';
      whatsappFloat.style.pointerEvents = 'auto';
    }
  }

  toggleWhatsappVisibility();
  window.addEventListener('scroll', toggleWhatsappVisibility, { passive: true });


  // ─── LAZY LOAD STAGGER para cards ─────────
  const productCards = document.querySelectorAll('.product-card.reveal');
  productCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });

  const depoimentoCards = document.querySelectorAll('.depoimento-card.reveal');
  depoimentoCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
  });

  const contatoItems = document.querySelectorAll('.contato-item.reveal');
  contatoItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });


  // ─── ANO DINÂMICO no rodapé ───────────────
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    const currentYear = new Date().getFullYear();
    footerCopy.textContent = `© ${currentYear} Recanto Deliciê. Todos os direitos reservados.`;
  }

});
