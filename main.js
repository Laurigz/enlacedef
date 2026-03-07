/* =========================================
   ENLACE – main.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR: scrolled class + mobile menu ── */
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });

  /* ── 2. SCROLLSPY: highlight active nav link ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('a.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`a.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => spyObserver.observe(s));

  /* ── 3. SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── 4. PORTFOLIO FILTER ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        const cats = item.dataset.cat || '';
        const show = filter === 'all' || cats.includes(filter);
        item.style.opacity = show ? '1' : '0.15';
        item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
        item.style.pointerEvents = show ? 'auto' : 'none';
      });
    });
  });

  /* ── 5. BUDGET BUTTONS ── */
  const budgetBtns = document.querySelectorAll('.budget-btn');
  const budgetInput = document.getElementById('presupuesto');

  budgetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      budgetBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      budgetInput.value = btn.dataset.val;
    });
  });

  /* ── 6. LEAD FORM ── */
  const form = document.getElementById('leadForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#ef4444';
        field.addEventListener('input', () => field.style.borderColor = '', { once: true });
      }
    });
    if (!valid) return;

    // Loading state
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    // Simulate submission (replace with real endpoint)
    await new Promise(r => setTimeout(r, 1800));

    // Show success
    form.classList.add('hidden');
    formSuccess.classList.remove('hidden');
  });

  /* ── 7. CHATBOT ── */
  const chatToggle = document.getElementById('chatToggle');
  const chatBox = document.getElementById('chatBox');
  const closeChat = document.getElementById('closeChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatNotif = document.getElementById('chatNotif');

  const responses = {
    precio: 'Nuestros packs arrancan desde $500/mes. Para un presupuesto exacto, completá el formulario y te enviamos una propuesta personalizada en 48hs. 💰',
    web: 'Desarrollamos sitios web modernos, rápidos y enfocados en conversión. ¿Tenés una web actual que necesita renovarse?',
    seo: 'Con SEO posicionamos tu negocio en los primeros resultados de Google de forma orgánica. Los resultados se ven entre 3 y 6 meses. 📈',
    branding: 'Creamos identidades visuales completas: logo, paleta de colores, tipografía y manual de marca. Todo lo que tu negocio necesita para comunicar profesionalismo.',
    ia: 'Integramos IA a tu negocio: chatbots, automatizaciones, análisis de datos y generación de contenido. ¿Qué proceso te gustaría automatizar?',
    contacto: 'Podés contactarnos completando el formulario en la sección de Contacto, o directamente por WhatsApp. Respondemos en menos de 24 horas. 📩',
    tiempo: 'El tiempo de entrega varía según el proyecto: una web puede estar lista en 14-21 días, un branding completo en 10-15 días.',
    default: 'Gracias por tu consulta. Para darte una respuesta más detallada, te invito a completar el formulario de contacto y un especialista de Enlace te responderá en 24 horas. 🙌'
  };

  function getBotResponse(msg) {
    const m = msg.toLowerCase();
    if (m.includes('precio') || m.includes('costo') || m.includes('cuánto') || m.includes('cuanto') || m.includes('pack')) return responses.precio;
    if (m.includes('web') || m.includes('página') || m.includes('pagina') || m.includes('sitio')) return responses.web;
    if (m.includes('seo') || m.includes('google') || m.includes('posicionamiento')) return responses.seo;
    if (m.includes('brand') || m.includes('logo') || m.includes('identidad')) return responses.branding;
    if (m.includes('ia') || m.includes('inteligencia') || m.includes('automatiz') || m.includes('bot')) return responses.ia;
    if (m.includes('contact') || m.includes('whatsapp') || m.includes('email') || m.includes('llam')) return responses.contacto;
    if (m.includes('tiempo') || m.includes('plazo') || m.includes('cuándo') || m.includes('cuando') || m.includes('días')) return responses.tiempo;
    return responses.default;
  }

  function addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`;
    div.innerHTML = isUser
      ? `<div class="bg-brand text-white rounded-xl rounded-tr-none px-3 py-2 text-sm max-w-[85%]">${text}</div>`
      : `<div class="w-7 h-7 bg-brand rounded-full flex items-center justify-center text-xs flex-shrink-0">🤖</div>
         <div class="bg-white rounded-xl rounded-tl-none px-3 py-2 text-sm text-dark shadow-sm max-w-[85%]">${text}</div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, true);
    chatInput.value = '';
    setTimeout(() => addMessage(getBotResponse(text)), 700);
  }

  chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('hidden');
    chatNotif.classList.add('hidden');
  });
  closeChat.addEventListener('click', () => chatBox.classList.add('hidden'));
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

});
