// ── HAMBURGER ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── ACTIVE NAV ─────────────────────────────────────────
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href').split('/').pop() === page) a.classList.add('active');
});

// ── FAQ ACORDEÓN ────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q')?.setAttribute('aria-expanded','false');
    });
    if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
  });
});

// ── ANIMACIONES SCROLL ──────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// ── FORMULARIO CONTACTO ─────────────────────────────────
const form = document.getElementById('contacto-form');
if (form) {
  const showErr = (id, msg) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#E24B4A';
    let hint = el.parentElement.querySelector('.field-error');
    if (!hint) { hint = document.createElement('span'); hint.className = 'field-error'; el.parentElement.appendChild(hint); }
    hint.textContent = msg;
  };
  const clearErr = id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '';
    const hint = el.parentElement.querySelector('.field-error');
    if (hint) hint.textContent = '';
  };
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const nombre  = document.getElementById('nombre')?.value.trim()  || '';
    const email   = document.getElementById('email')?.value.trim()   || '';
    const servicio= document.getElementById('servicio')?.value       || '';
    const mensaje = document.getElementById('mensaje')?.value.trim() || '';
    const rgpd    = document.getElementById('rgpd')?.checked;

    if (nombre.length < 2)         { showErr('nombre',  'Necesitamos tu nombre.'); ok=false; } else clearErr('nombre');
    if (!emailRx.test(email))      { showErr('email',   'El email no tiene el formato correcto.'); ok=false; } else clearErr('email');
    if (!servicio)                 { showErr('servicio','Selecciona un servicio.'); ok=false; } else clearErr('servicio');
    if (mensaje.length < 20)       { showErr('mensaje', 'Cuéntanos un poco más (mínimo 20 caracteres).'); ok=false; } else clearErr('mensaje');
    if (!rgpd)                     { showErr('rgpd',    'Debes aceptar la política de privacidad.'); ok=false; } else clearErr('rgpd');

    if (!ok) return;
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Enviando...'; btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }, 1200);
  });
}
