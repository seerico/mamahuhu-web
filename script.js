// ============================================
// MAMAHUHU — interacciones
// ============================================
(function () {
  'use strict';

  // --- Header sombra al hacer scroll ---
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Menú móvil ---
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu(force) {
    const open = typeof force === 'boolean' ? force : !burger.classList.contains('is-open');
    burger.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => toggleMenu());
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.classList.contains('is-open')) toggleMenu(false);
    });
  }

  // --- Fade-in al hacer scroll (IntersectionObserver) ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => io.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('is-visible'));
  }

  // --- Formulario de contacto ---
  const form = document.getElementById('contacto-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validación nativa
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = {
        nombre: form.nombre.value.trim(),
        telefono: form.telefono.value.trim(),
        email: form.email.value.trim(),
        personas: form.personas.value,
        fecha: form.fecha.value,
        mensaje: form.mensaje.value.trim()
      };

      // Construir email con la reserva
      const lineas = [
        `Nombre: ${data.nombre}`,
        `Teléfono: ${data.telefono}`,
        `Email: ${data.email}`,
        `Personas: ${data.personas}`
      ];
      if (data.fecha) lineas.push(`Fecha: ${data.fecha}`);
      if (data.mensaje) lineas.push(`Mensaje: ${data.mensaje}`);

      const asunto = encodeURIComponent('Reserva / consulta — Mamahuhu');
      const cuerpo = encodeURIComponent(lineas.join('\n'));
      const mailto = `mailto:seerico.food@hotmail.com?subject=${asunto}&body=${cuerpo}`;

      // Abrir cliente de correo con el mensaje precargado
      window.location.href = mailto;

      // Mostrar mensaje de éxito y reset
      if (successMsg) successMsg.classList.add('is-visible');
      form.reset();

      setTimeout(() => {
        if (successMsg) successMsg.classList.remove('is-visible');
      }, 6000);
    });
  }

  // --- Smooth scroll para enlaces de ancla (refuerzo) ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
