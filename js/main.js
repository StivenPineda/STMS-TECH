/**
 * main.js — Lógica del cliente para STMS Tech Landing Page
 *
 * Módulos:
 *  1. i18n        — sistema de traducción ES / EN instantánea
 *  2. Navbar      — efecto scroll + menú hamburger móvil
 *  3. Scroll Reveal — IntersectionObserver para entradas suaves
 *  4. Contadores  — animación de métricas al scroll
 *  5. Formulario  — validación con mensajes i18n
 *  6. Smooth Scroll — anclas internas con offset de navbar
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. i18n — SISTEMA DE TRADUCCIÓN
   ═══════════════════════════════════════════════════════════════

   Uso en HTML:
     data-i18n="clave"             → actualiza textContent
     data-i18n-html="clave"        → actualiza innerHTML
     data-i18n-placeholder="clave" → actualiza placeholder
   ═══════════════════════════════════════════════════════════════ */

/** @type {{ es: Object.<string,string>, en: Object.<string,string> }} */
var TRANSLATIONS = {
  es: {
    /* ── Navbar ── */
    'nav.home':     'Inicio',
    'nav.services': 'Servicios',
    'nav.metrics':  'Métricas',
    'nav.contact':  'Contacto',
    'nav.cta':      'Hablemos',

    /* ── Hero ── */
    'hero.badge':          'Desarrollo Web & Testing QA',
    'hero.status':         'System Status: Optimized & Secured',
    'hero.title.part1':    'Construimos el',
    'hero.title.hl1':      'futuro web.',
    'hero.title.part2':    'Lo probamos hasta',
    'hero.title.hl2':      'la perfección.',
    'hero.subtitle':       'En STMS Tech fusionamos ingeniería de software de élite con Testing & QA riguroso para entregar productos digitales que funcionan impecablemente desde el primer deploy.',
    'hero.cta.services':   'Ver Servicios',
    'hero.cta.contact':    'Agenda una Consulta',

    /* ── Services ── */
    'services.tag':          'Lo que hacemos',
    'services.title.part1':  'Soluciones que escalan.',
    'services.title.hl':     'Calidad que permanece.',
    'services.subtitle':     'Desde la arquitectura hasta la automatización de pruebas, cubrimos cada etapa del ciclo de vida de tu producto digital.',

    /* ── Cards ── */
    'card.webdev.badge':       'Desarrollo Web',
    'card.webdev.title':       'Aplicaciones Web de Alto Rendimiento',
    'card.webdev.desc':        'Diseñamos y desarrollamos aplicaciones web modernas con las tecnologías más demandadas del mercado. Arquitectura limpia, código mantenible y performance optimizado desde el inicio.',
    'card.testing.badge':      'QA Testing',
    'card.testing.title':      'Testing Manual',
    'card.testing.desc':       'Pruebas funcionales, de regresión y de aceptación ejecutadas por especialistas QA. Cobertura total de casos de uso críticos antes de cada release.',
    'card.automation.badge':   'QA Testing',
    'card.automation.title':   'Automatización QA',
    'card.automation.desc':    'Frameworks de automatización con Playwright, Cypress y Selenium. Integración directa en pipelines CI/CD para detección temprana de regresiones.',
    'card.ux.badge':           'Diseño',
    'card.ux.title':           'UX / UI Design',
    'card.ux.desc':            'Interfaces centradas en el usuario. Desde wireframes hasta prototipos interactivos en Figma con sistemas de diseño escalables.',
    'card.perf.badge':         'QA Testing',
    'card.perf.title':         'Performance Testing',
    'card.perf.desc':          'Pruebas de carga y estrés con k6 y JMeter. Identificamos cuellos de botella antes de que tus usuarios los encuentren en producción.',
    'card.consulting.badge':   'Consultoría',
    'card.consulting.title':   'Consultoría Tech',
    'card.consulting.desc':    'Auditorías de código, revisión de arquitectura y roadmaps tecnológicos alineados con los objetivos de negocio de tu empresa.',

    /* ── Metrics ── */
    'metrics.tag':        'Números que importan',
    'metrics.title.part1':'Resultados que',
    'metrics.title.hl':   'hablan por sí solos.',
    'metrics.subtitle':   'Cada proyecto es una oportunidad de superar el estándar anterior. Estos son nuestros indicadores de calidad acumulados.',
    'metrics.label1':     'Satisfacción<br>de Clientes',
    'metrics.label2':     'Proyectos<br>Entregados',
    'metrics.label3':     'Defectos Críticos<br>en Producción',
    'metrics.label4':     'Reducción de<br>Bugs en Promedio',

    /* ── Contact ── */
    'contact.tag':        'Escríbenos',
    'contact.title.part1':'Hagamos crecer tu',
    'contact.title.hl':   'proyecto juntos.',
    'contact.text':       'Cuéntanos en qué estás trabajando. En STMS Tech analizamos tu contexto y te proponemos la solución más eficiente, ya sea desarrollo completo, auditoría QA o consultoría técnica.',
    'contact.feat1':      'Respuesta en menos de 24 horas',
    'contact.feat2':      'Consulta inicial sin costo',
    'contact.feat3':      'Propuesta técnica personalizada',
    'contact.feat4':      'Flexibilidad en modalidad de trabajo',

    /* ── Form ── */
    'form.name.label':         'Nombre completo',
    'form.name.placeholder':   'Ej. María García',
    'form.email.label':        'Correo electrónico',
    'form.email.placeholder':  'tu@empresa.com',
    'form.service.label':      'Servicio de interés',
    'form.service.default':    'Selecciona un servicio\u2026',
    'form.service.webdev':     'Desarrollo Web',
    'form.service.testing':    'Testing Manual',
    'form.service.qa':         'Automatización QA',
    'form.service.ux':         'UX / UI Design',
    'form.service.perf':       'Performance Testing',
    'form.service.consulting': 'Consultoría Tech',
    'form.message.label':      'Mensaje',
    'form.message.placeholder':'Cuéntanos sobre tu proyecto o necesidad\u2026',
    'form.submit':             'Enviar Mensaje',
    'form.submitting':         'Enviando\u2026',
    'form.success.title':      '\u00a1Mensaje enviado!',
    'form.success.text':       'Nos pondremos en contacto contigo en menos de 24 horas.',

    /* ── Validation errors ── */
    'err.name.required':    'Por favor ingresa tu nombre completo.',
    'err.email.required':   'El correo electrónico es requerido.',
    'err.email.invalid':    'Ingresa un correo electrónico válido.',
    'err.service.required': 'Selecciona un servicio de interés.',
    'err.msg.required':     'Por favor escribe tu mensaje.',
    'err.msg.short':        'El mensaje debe tener al menos 10 caracteres.',

    /* ── Footer ── */
    'footer.tagline':       'Construimos el futuro web y lo probamos hasta la perfección. Tecnología de alto impacto para empresas que exigen excelencia.',
    'footer.col1.heading':  'Servicios',
    'footer.link.webdev':   'Desarrollo Web',
    'footer.link.testing':  'Testing Manual',
    'footer.link.qa':       'Automatización QA',
    'footer.link.ux':       'UX / UI Design',
    'footer.link.perf':     'Performance Testing',
    'footer.link.consulting':'Consultoría Tech',
    'footer.col2.heading':  'Empresa',
    'footer.link.about':    'Sobre Nosotros',
    'footer.link.metrics':  'Métricas',
    'footer.link.contact':  'Contacto',
    'footer.link.privacy':  'Política de Privacidad',
    'footer.link.terms':    'Términos de Servicio',
    'footer.copyright':     '\u00a9 2025 STMS Tech. Todos los derechos reservados.',
    'footer.made':          'y mucho Testing.',

    /* ── WhatsApp FAB tooltip ── */
    'fab.tooltip': 'Escríbenos por WhatsApp',

    /* ── Chatbot ── */
    'chat.bot.name':    'STMS Assistant',
    'chat.bot.status':  'Online',
    'chat.input.ph':    'Escribe un mensaje\u2026',
    'chat.lead.title':  'D\u00e9janos tus datos:',
    'chat.lead.name.ph':'Tu nombre',
    'chat.lead.contact.ph': 'Email o WhatsApp',
    'chat.lead.submit': 'Enviar',

    /* Respuestas del bot */
    'bot.welcome':       '\u00a1Hola! Soy el asistente virtual de STMS Tech. \u00bfEn qu\u00e9 puedo ayudarte hoy?',
    'bot.welcome2':      'Puedo responderte sobre nuestros servicios, calidad, qui\u00e9nes somos o presupuestos. \u00bfQu\u00e9 te gustar\u00eda saber?',
    'bot.services':      'Ofrecemos 6 servicios especializados:\n\n\ud83d\udd35 Desarrollo Web (React, Node.js, Next.js)\n\ud83d\udd35 Testing Manual y Automatizaci\u00f3n QA\n\ud83d\udd35 Performance Testing (k6, JMeter)\n\ud83d\udd35 UX / UI Design\n\ud83d\udd35 Consultor\u00eda Tech\n\nCada uno con enfoque en calidad y entrega a tiempo.',
    'bot.quality':       'Garantizamos calidad mediante:\n\n\u2705 98% de satisfacci\u00f3n de clientes\n\u2705 0 defectos cr\u00edticos en producci\u00f3n\n\u2705 Reducci\u00f3n promedio del 40% de bugs\n\u2705 Pruebas integradas en cada fase del desarrollo\n\nNuestros QA trabajan desde el primer sprint.',
    'bot.about':         'STMS Tech es una empresa especializada en desarrollo web de alto rendimiento y Testing/QA riguroso. Fusionamos ingenier\u00eda de software de \u00e9lite con calidad end-to-end para que tus productos funcionen perfectamente desde el primer deploy.',
    'bot.price':         'Los presupuestos son personalizados seg\u00fan el alcance y tecnolog\u00eda de cada proyecto. Para darte una asesor\u00eda exacta, necesito unos datos \u00a1es r\u00e1pido y sin compromiso! \u{1f4ac}',
    'bot.lead.prompt':   '\u00a1Perfecto! Por favor d\u00e9jame tu nombre y un correo o WhatsApp para que nuestro equipo te contacte.',
    'bot.lead.thanks':   '\u00a1Recibido! \ud83c\udf1f Nuestro equipo se pondr\u00e1 en contacto contigo en menos de 24 horas para darte una propuesta personalizada.',
    'bot.fallback':      'No estoy seguro de entenderte bien. Puedo ayudarte con:\n\n\u2022 \u00bfQu\u00e9 servicios ofrecen?\n\u2022 \u00bfC\u00f3mo garantizan la calidad?\n\u2022 \u00bfQui\u00e9nes son?\n\u2022 Precios y presupuestos',
    'bot.lead.missing':  'Por favor completa tu nombre y un m\u00e9todo de contacto para continuar.'
  },

  en: {
    /* ── Navbar ── */
    'nav.home':     'Home',
    'nav.services': 'Services',
    'nav.metrics':  'Metrics',
    'nav.contact':  'Contact',
    'nav.cta':      "Let's Talk",

    /* ── Hero ── */
    'hero.badge':          'Web Development & Testing QA',
    'hero.status':         'System Status: Optimized & Secured',
    'hero.title.part1':    'We build the',
    'hero.title.hl1':      'future web.',
    'hero.title.part2':    'We test it to',
    'hero.title.hl2':      'perfection.',
    'hero.subtitle':       'At STMS Tech we fuse elite software engineering with rigorous Testing & QA to deliver digital products that work flawlessly from the first deploy.',
    'hero.cta.services':   'View Services',
    'hero.cta.contact':    'Book a Consultation',

    /* ── Services ── */
    'services.tag':          'What we do',
    'services.title.part1':  'Solutions that scale.',
    'services.title.hl':     'Quality that endures.',
    'services.subtitle':     "From architecture to test automation, we cover every stage of your digital product's lifecycle.",

    /* ── Cards ── */
    'card.webdev.badge':       'Web Development',
    'card.webdev.title':       'High-Performance Web Applications',
    'card.webdev.desc':        'We design and develop modern web applications using the most in-demand technologies. Clean architecture, maintainable code, and performance optimized from day one.',
    'card.testing.badge':      'QA Testing',
    'card.testing.title':      'Manual Testing',
    'card.testing.desc':       'Functional, regression, and acceptance tests executed by QA specialists. Full coverage of critical use cases before each release.',
    'card.automation.badge':   'QA Testing',
    'card.automation.title':   'QA Automation',
    'card.automation.desc':    'Automation frameworks with Playwright, Cypress, and Selenium. Direct CI/CD integration for early regression detection.',
    'card.ux.badge':           'Design',
    'card.ux.title':           'UX / UI Design',
    'card.ux.desc':            'User-centered interfaces. From wireframes to interactive Figma prototypes with scalable design systems.',
    'card.perf.badge':         'QA Testing',
    'card.perf.title':         'Performance Testing',
    'card.perf.desc':          'Load and stress tests with k6 and JMeter. We identify bottlenecks before your users find them in production.',
    'card.consulting.badge':   'Consulting',
    'card.consulting.title':   'Tech Consulting',
    'card.consulting.desc':    "Code audits, architecture reviews, and technology roadmaps aligned with your company's business objectives.",

    /* ── Metrics ── */
    'metrics.tag':        'Numbers that matter',
    'metrics.title.part1':'Results that',
    'metrics.title.hl':   'speak for themselves.',
    'metrics.subtitle':   'Every project is an opportunity to exceed the previous standard. These are our accumulated quality indicators.',
    'metrics.label1':     'Client<br>Satisfaction',
    'metrics.label2':     'Projects<br>Delivered',
    'metrics.label3':     'Critical Defects<br>in Production',
    'metrics.label4':     'Average Bug<br>Reduction',

    /* ── Contact ── */
    'contact.tag':        'Write to Us',
    'contact.title.part1':"Let's grow your",
    'contact.title.hl':   'project together.',
    'contact.text':       "Tell us what you're working on. At STMS Tech we analyze your context and propose the most efficient solution, whether full development, QA audit, or tech consulting.",
    'contact.feat1':      'Response in less than 24 hours',
    'contact.feat2':      'Free initial consultation',
    'contact.feat3':      'Personalized technical proposal',
    'contact.feat4':      'Flexibility in work arrangement',

    /* ── Form ── */
    'form.name.label':         'Full name',
    'form.name.placeholder':   'E.g. John Smith',
    'form.email.label':        'Email address',
    'form.email.placeholder':  'you@company.com',
    'form.service.label':      'Service of interest',
    'form.service.default':    'Select a service\u2026',
    'form.service.webdev':     'Web Development',
    'form.service.testing':    'Manual Testing',
    'form.service.qa':         'QA Automation',
    'form.service.ux':         'UX / UI Design',
    'form.service.perf':       'Performance Testing',
    'form.service.consulting': 'Tech Consulting',
    'form.message.label':      'Message',
    'form.message.placeholder':'Tell us about your project or need\u2026',
    'form.submit':             'Send Message',
    'form.submitting':         'Sending\u2026',
    'form.success.title':      'Message sent!',
    'form.success.text':       'We will get back to you in less than 24 hours.',

    /* ── Validation errors ── */
    'err.name.required':    'Please enter your full name.',
    'err.email.required':   'Email address is required.',
    'err.email.invalid':    'Please enter a valid email address.',
    'err.service.required': 'Please select a service.',
    'err.msg.required':     'Please write your message.',
    'err.msg.short':        'Message must be at least 10 characters.',

    /* ── Footer ── */
    'footer.tagline':       'We build the future web and test it to perfection. High-impact technology for companies that demand excellence.',
    'footer.col1.heading':  'Services',
    'footer.link.webdev':   'Web Development',
    'footer.link.testing':  'Manual Testing',
    'footer.link.qa':       'QA Automation',
    'footer.link.ux':       'UX / UI Design',
    'footer.link.perf':     'Performance Testing',
    'footer.link.consulting':'Tech Consulting',
    'footer.col2.heading':  'Company',
    'footer.link.about':    'About Us',
    'footer.link.metrics':  'Metrics',
    'footer.link.contact':  'Contact',
    'footer.link.privacy':  'Privacy Policy',
    'footer.link.terms':    'Terms of Service',
    'footer.copyright':     '\u00a9 2025 STMS Tech. All rights reserved.',
    'footer.made':          'and lots of Testing.',

    /* ── WhatsApp FAB tooltip ── */
    'fab.tooltip': 'Chat with us on WhatsApp',

    /* ── Chatbot ── */
    'chat.bot.name':    'STMS Assistant',
    'chat.bot.status':  'Online',
    'chat.input.ph':    'Type a message\u2026',
    'chat.lead.title':  'Leave your details:',
    'chat.lead.name.ph':'Your name',
    'chat.lead.contact.ph': 'Email or WhatsApp',
    'chat.lead.submit': 'Send',

    /* Bot responses */
    'bot.welcome':       'Hi! I\'m the STMS Tech virtual assistant. How can I help you today?',
    'bot.welcome2':      'I can answer questions about our services, quality standards, who we are, or pricing. What would you like to know?',
    'bot.services':      'We offer 6 specialized services:\n\n\ud83d\udd35 Web Development (React, Node.js, Next.js)\n\ud83d\udd35 Manual Testing & QA Automation\n\ud83d\udd35 Performance Testing (k6, JMeter)\n\ud83d\udd35 UX / UI Design\n\ud83d\udd35 Tech Consulting\n\nAll focused on quality and on-time delivery.',
    'bot.quality':       'We guarantee quality through:\n\n\u2705 98% client satisfaction rate\n\u2705 0 critical defects in production\n\u2705 Average 40% bug reduction\n\u2705 Testing integrated from sprint 1\n\nOur QA team is involved from day one.',
    'bot.about':         'STMS Tech specializes in high-performance web development and rigorous Testing/QA. We fuse elite software engineering with end-to-end quality so your products work flawlessly from the first deploy.',
    'bot.price':         'Pricing is tailored to each project\'s scope and technology stack. To give you an accurate quote, I\'d love to connect you with our team \u2014 it\'s quick and commitment-free! \u{1f4ac}',
    'bot.lead.prompt':   'Great! Please leave your name and an email or WhatsApp number so our team can reach out with a personalized proposal.',
    'bot.lead.thanks':   'Received! \ud83c\udf1f Our team will contact you within 24 hours with a tailored proposal.',
    'bot.fallback':      'I\'m not quite sure I understand. I can help you with:\n\n\u2022 What services do you offer?\n\u2022 How do you guarantee quality?\n\u2022 Who are you?\n\u2022 Pricing & budgets',
    'bot.lead.missing':  'Please enter your name and a contact method to continue.'
  }
};

/** Idioma activo. Se persiste en localStorage. */
var currentLang = localStorage.getItem('stms-lang') || 'es';

/**
 * Aplica las traducciones del idioma dado a todos los elementos
 * marcados con data-i18n, data-i18n-html o data-i18n-placeholder.
 * @param {string} lang — 'es' | 'en'
 */
function applyTranslations(lang) {
  var dict = TRANSLATIONS[lang];
  if (!dict) return;

  // textContent
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // innerHTML (para textos con <br> u otras etiquetas)
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  // placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });

  // data-tooltip en el FAB de WhatsApp
  document.querySelectorAll('[data-i18n-tooltip]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-tooltip');
    if (dict[key] !== undefined) el.setAttribute('data-tooltip', dict[key]);
  });

  // Atributo lang del <html>
  document.documentElement.lang = lang;
}

(function initI18n() {
  var toggleEl = document.getElementById('langToggle');
  if (!toggleEl) return;

  /** Actualiza clases activas en los botones del toggle */
  function syncButtons(lang) {
    toggleEl.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
    });
  }

  // Aplica el idioma guardado al cargar
  applyTranslations(currentLang);
  syncButtons(currentLang);

  // Click en cualquier botón del toggle
  toggleEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-btn');
    if (!btn) return;

    var newLang = btn.dataset.lang;
    if (newLang === currentLang) return;

    currentLang = newLang;
    localStorage.setItem('stms-lang', currentLang);
    applyTranslations(currentLang);
    syncButtons(currentLang);
  });
})();


/* ═══════════════════════════════════════════════════════════════
   2. NAVBAR — scroll shrink + menú hamburger móvil
   ═══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  if (!navbar) return;

  var SCROLL_THRESHOLD = 80;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    // Bloquea el scroll del body cuando el menú está abierto en mobile
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cierra al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Cierra al hacer clic fuera
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();


/* ═══════════════════════════════════════════════════════════════
   3. SCROLL REVEAL — IntersectionObserver
   ═══════════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal');

  if (!elements.length || !('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el) { observer.observe(el); });
})();


/* ═══════════════════════════════════════════════════════════════
   4. CONTADORES ANIMADOS — métricas de calidad
   ═══════════════════════════════════════════════════════════════ */
(function initCounters() {
  var counterEls = document.querySelectorAll('[data-count]');
  if (!counterEls.length || !('IntersectionObserver' in window)) return;

  /**
   * Anima un número desde 0 hasta target con easing ease-out cúbico.
   * @param {HTMLElement} el
   * @param {number} target
   * @param {number} duration ms
   */
  function animateCounter(el, target, duration) {
    var start  = performance.now();
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';

    function step(now) {
      var elapsed  = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el     = entry.target;
          var target = parseInt(el.dataset.count, 10);
          if (!isNaN(target)) animateCounter(el, target, 1800);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  counterEls.forEach(function (el) { counterObserver.observe(el); });
})();


/* ═══════════════════════════════════════════════════════════════
   5. VALIDACIÓN DE FORMULARIO (mensajes i18n)
   ═══════════════════════════════════════════════════════════════ */
(function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /** Devuelve el texto de la clave en el idioma activo */
  function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
  }

  function showError(group, message) {
    group.classList.add('has-error');
    var errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(group) {
    group.classList.remove('has-error');
  }

  function validate() {
    var isValid = true;

    // Nombre
    var nameGroup = form.querySelector('[data-field="name"]');
    var nameInput = nameGroup && nameGroup.querySelector('input');
    if (nameInput) {
      if (!nameInput.value.trim()) {
        showError(nameGroup, t('err.name.required')); isValid = false;
      } else { clearError(nameGroup); }
    }

    // Email
    var emailGroup = form.querySelector('[data-field="email"]');
    var emailInput = emailGroup && emailGroup.querySelector('input');
    if (emailInput) {
      if (!emailInput.value.trim()) {
        showError(emailGroup, t('err.email.required')); isValid = false;
      } else if (!EMAIL_RE.test(emailInput.value.trim())) {
        showError(emailGroup, t('err.email.invalid')); isValid = false;
      } else { clearError(emailGroup); }
    }

    // Servicio
    var serviceGroup  = form.querySelector('[data-field="service"]');
    var serviceSelect = serviceGroup && serviceGroup.querySelector('select');
    if (serviceSelect) {
      if (!serviceSelect.value) {
        showError(serviceGroup, t('err.service.required')); isValid = false;
      } else { clearError(serviceGroup); }
    }

    // Mensaje
    var msgGroup = form.querySelector('[data-field="message"]');
    var msgInput = msgGroup && msgGroup.querySelector('textarea');
    if (msgInput) {
      if (!msgInput.value.trim()) {
        showError(msgGroup, t('err.msg.required')); isValid = false;
      } else if (msgInput.value.trim().length < 10) {
        showError(msgGroup, t('err.msg.short')); isValid = false;
      } else { clearError(msgGroup); }
    }

    return isValid;
  }

  // Limpia errores en tiempo real
  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      var group = field.closest('.form-group');
      if (group && group.classList.contains('has-error')) clearError(group);
    });
  });

  // Submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled     = true;
      submitBtn.textContent  = t('form.submitting');
    }

    // Simular envío asíncrono (reemplazar con fetch real en producción)
    setTimeout(function () {
      var successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        form.style.display           = 'none';
        successMsg.style.display     = 'block';
      }
    }, 1200);
  });
})();


/* ═══════════════════════════════════════════════════════════════
   6. SMOOTH SCROLL — anclajes internos con offset de navbar
   ═══════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();

      var navbarHeight = document.getElementById('navbar')
        ? document.getElementById('navbar').offsetHeight : 0;

      var top = targetEl.getBoundingClientRect().top
                + window.scrollY
                - navbarHeight
                - 16;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════
   7. CHATBOT — Asistente virtual con detección de intenciones
   ═══════════════════════════════════════════════════════════════ */
(function initChatbot() {
  var fab        = document.getElementById('chatFab');
  var window_el  = document.getElementById('chatWindow');
  var closeBtn   = document.getElementById('chatClose');
  var messagesEl = document.getElementById('chatMessages');
  var inputEl    = document.getElementById('chatInput');
  var sendBtn    = document.getElementById('chatSend');
  var leadForm   = document.getElementById('chatLeadForm');
  var leadName   = document.getElementById('leadName');
  var leadContact= document.getElementById('leadContact');
  var leadSubmit = document.getElementById('leadSubmit');
  var badge      = document.getElementById('chatBadge');
  var iconOpen   = fab  && fab.querySelector('.chat-fab__icon--open');
  var iconClose  = fab  && fab.querySelector('.chat-fab__icon--close');

  if (!fab || !window_el || !messagesEl) return;

  var isOpen       = false;
  var hasGreeted   = false;   // para no saludar dos veces
  var leadCaptured = false;   // flag: ya tenemos datos del lead
  var TYPING_DELAY = 900;     // ms que simula que el bot "escribe"

  /* ─── Helpers ─── */

  /** Obtiene traducción del idioma activo */
  function tb(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
  }

  /** Hace scroll al último mensaje */
  function scrollBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /**
   * Añade una burbuja de mensaje al chat.
   * @param {string} text  — texto (saltos de línea → <br>)
   * @param {'bot'|'user'} who
   */
  function addBubble(text, who) {
    var div = document.createElement('div');
    div.className = 'chat-bubble chat-bubble--' + who;
    // Convierte \n en <br> para un formato legible
    div.innerHTML = text.replace(/\n/g, '<br>');
    messagesEl.appendChild(div);
    scrollBottom();
    return div;
  }

  /**
   * Muestra el indicador de escritura y lo reemplaza por el mensaje
   * real después de TYPING_DELAY ms.
   * @param {string} text
   * @param {Function} [onDone] — callback tras mostrar el mensaje
   */
  function botReply(text, onDone) {
    // Indicador de escritura (…)
    var typingDiv = document.createElement('div');
    typingDiv.className = 'chat-bubble chat-bubble--bot chat-bubble--typing';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typingDiv);
    scrollBottom();

    setTimeout(function () {
      messagesEl.removeChild(typingDiv);
      addBubble(text, 'bot');
      if (typeof onDone === 'function') onDone();
    }, TYPING_DELAY);
  }

  /* ─── Detección de intenciones ─── */

  /**
   * Clasifica el mensaje del usuario en una intención.
   * @param {string} msg
   * @returns {'services'|'quality'|'about'|'price'|'contact'|'fallback'}
   */
  function detectIntent(msg) {
    var m = msg.toLowerCase();

    var intents = {
      services: {
        es: ['servicio', 'ofrecen', 'hacen', 'ofreceis', 'que ofrecen', 'qué ofrecen', 'que hacen', 'qué hacen', 'trabajo', 'especializ'],
        en: ['service', 'offer', 'what do you', 'provide', 'what you do', 'speciali', 'work on']
      },
      quality: {
        es: ['calidad', 'garantía', 'garantia', 'garantizan', 'aseguran', 'confiable', 'seguro', 'testing', 'qa', 'pruebas', 'bugs', 'errores'],
        en: ['quality', 'guarantee', 'ensure', 'reliable', 'trust', 'testing', 'qa', 'bugs', 'defects', 'how do you']
      },
      about: {
        es: ['quiénes', 'quienes', 'empresa', 'son ustedes', 'sobre ustedes', 'quién eres', 'quien eres', 'nos', 'historia', 'equipo'],
        en: ['who are', 'about you', 'about stms', 'company', 'team', 'who is', 'tell me']
      },
      price: {
        es: ['precio', 'presupuesto', 'costo', 'cuánto', 'cuanto', 'cobran', 'tarifa', 'cotización', 'cotizacion', 'vale', 'cuestan', 'pagar', 'dinero'],
        en: ['price', 'budget', 'cost', 'how much', 'quote', 'rate', 'fee', 'pricing', 'charge', 'pay', 'money', 'invest']
      },
      contact: {
        es: ['contacto', 'hablar', 'llamar', 'escribir', 'comunicar', 'asesor', 'agendar', 'reunión', 'reunion'],
        en: ['contact', 'talk', 'call', 'reach', 'communicate', 'advisor', 'schedule', 'meeting', 'speak']
      }
    };

    for (var intent in intents) {
      var kws = intents[intent][currentLang] || intents[intent]['es'];
      for (var i = 0; i < kws.length; i++) {
        if (m.indexOf(kws[i]) !== -1) return intent;
      }
    }
    return 'fallback';
  }

  /**
   * Genera la respuesta del bot según la intención detectada.
   * @param {string} intent
   */
  function respondToIntent(intent) {
    switch (intent) {
      case 'services':
        botReply(tb('bot.services'));
        break;

      case 'quality':
        botReply(tb('bot.quality'));
        break;

      case 'about':
        botReply(tb('bot.about'));
        break;

      case 'price':
      case 'contact':
        if (!leadCaptured) {
          botReply(tb('bot.price'), function () {
            // Pequeño delay extra antes de pedir datos
            setTimeout(function () {
              botReply(tb('bot.lead.prompt'), showLeadForm);
            }, 400);
          });
        } else {
          botReply(tb('bot.lead.thanks'));
        }
        break;

      default: // fallback
        botReply(tb('bot.fallback'));
    }
  }

  /* ─── Formulario de leads ─── */

  function showLeadForm() {
    if (leadForm) {
      leadForm.hidden = false;
      // Actualiza placeholders con el idioma activo
      if (leadName)    leadName.placeholder    = tb('chat.lead.name.ph');
      if (leadContact) leadContact.placeholder = tb('chat.lead.contact.ph');
      scrollBottom();
    }
  }

  function hideLeadForm() {
    if (leadForm) leadForm.hidden = true;
  }

  if (leadSubmit) {
    leadSubmit.addEventListener('click', function () {
      var name    = (leadName    && leadName.value.trim())    || '';
      var contact = (leadContact && leadContact.value.trim()) || '';

      if (!name || !contact) {
        botReply(tb('bot.lead.missing'));
        return;
      }

      // Simula envío — en producción enviar a backend/CRM
      hideLeadForm();
      leadCaptured = true;

      // Muestra lo que envió el usuario como burbuja
      addBubble(name + ' | ' + contact, 'user');

      setTimeout(function () {
        botReply(tb('bot.lead.thanks'));
      }, 300);
    });
  }

  /* ─── Envío de mensaje del usuario ─── */

  function handleUserMessage() {
    if (!inputEl) return;
    var msg = inputEl.value.trim();
    if (!msg) return;

    inputEl.value = '';
    addBubble(msg, 'user');

    var intent = detectIntent(msg);
    respondToIntent(intent);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', handleUserMessage);
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserMessage();
      }
    });
  }

  /* ─── Abrir / cerrar ventana ─── */

  function openChat() {
    isOpen = true;
    window_el.classList.add('chat-window--open');
    window_el.setAttribute('aria-hidden', 'false');
    fab.setAttribute('aria-expanded', 'true');

    // Intercambia iconos
    if (iconOpen)  iconOpen.style.display  = 'none';
    if (iconClose) iconClose.style.display = 'block';

    // Oculta badge
    if (badge) badge.classList.add('hidden');

    // Saludo inicial (solo una vez)
    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(function () {
        botReply(tb('bot.welcome'), function () {
          setTimeout(function () {
            botReply(tb('bot.welcome2'));
          }, 500);
        });
      }, 300);
    }

    // Foco en el input
    if (inputEl) setTimeout(function () { inputEl.focus(); }, 350);
  }

  function closeChat() {
    isOpen = false;
    window_el.classList.remove('chat-window--open');
    window_el.setAttribute('aria-hidden', 'true');
    fab.setAttribute('aria-expanded', 'false');

    if (iconOpen)  iconOpen.style.display  = 'block';
    if (iconClose) iconClose.style.display = 'none';
  }

  fab.addEventListener('click', function () {
    if (isOpen) { closeChat(); } else { openChat(); }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeChat);
  }

  // Cierra con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closeChat();
  });

  // Actualiza placeholders del chat cuando cambia el idioma
  var origApply = applyTranslations;
  applyTranslations = function (lang) {
    origApply(lang);
    if (inputEl)    inputEl.placeholder    = TRANSLATIONS[lang]['chat.input.ph']       || inputEl.placeholder;
    if (leadName)   leadName.placeholder   = TRANSLATIONS[lang]['chat.lead.name.ph']   || leadName.placeholder;
    if (leadContact)leadContact.placeholder= TRANSLATIONS[lang]['chat.lead.contact.ph']|| leadContact.placeholder;
  };
})();
