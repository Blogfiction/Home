/**
 * Blogfiction - Sistema de Componentes
 * Este archivo gestiona todos los componentes de la página
 */

const BlogfictionComponents = {};

const COMPONENT_REGISTRY = {
  navbar: { id: 'navbar-container', url: './components/Navbar.html', init: 'initNavbar' },
  sidebar: { id: 'sidebar-container', url: './components/Sidebar.html', init: 'initSidebar' },
  hero: { id: 'hero-container', url: './components/Hero.html', init: 'initHero' },
  'info-modal': { id: 'info-modal-container', url: './components/InfoModal.html', init: 'initInfoModal' },
  team: { id: 'team-container', url: './components/Team.html', init: 'initTeam' },
  work: { id: 'work-container', url: './components/Work.html', init: 'initWork' },
  testimonials: { id: 'testimonials-container', url: './components/Testimonials.html', init: 'initTestimonials' },
  services: { id: 'pricing-container', url: './components/Services.html', init: 'initServices' },
  contact: { id: 'contact-container', url: './components/Contact.html', init: null },
  footer: { id: 'footer-container', url: './components/Footer.html', init: 'initFooter' },
  'background-music': { id: 'background-music-container', url: './components/BackgroundMusic.html', init: 'initBackgroundMusic' }
};

function loadComponent(containerId, componentUrl) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Contenedor ${containerId} no encontrado`);
    return;
  }

  fetch(componentUrl)
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
      const event = new CustomEvent('componentLoaded', { detail: { id: containerId } });
      document.dispatchEvent(event);
    })
    .catch(error => {
      console.error(`Error al cargar el componente ${componentUrl}:`, error);
    });
}

function initComponents(componentKeys) {
  document.addEventListener('DOMContentLoaded', () => {
    const keys = componentKeys || Object.keys(COMPONENT_REGISTRY);
    const components = keys
      .map(key => COMPONENT_REGISTRY[key])
      .filter(Boolean);

    let loadedComponents = 0;
    const totalComponents = components.length;

    components.forEach(component => {
      loadComponent(component.id, component.url);
    });

    document.addEventListener('componentLoaded', (e) => {
      loadedComponents++;

      const loadedComponent = components.find(item => item.id === e.detail.id);
      if (loadedComponent && loadedComponent.init && typeof window[loadedComponent.init] === 'function') {
        window[loadedComponent.init]();
      }

      if (loadedComponents >= totalComponents) {
        console.log('Todos los componentes cargados. Haciendo emails clickeables...');
        setTimeout(makeEmailsClickable, 300);
      }
    });
  });
}

function makeEmailsClickable() {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

  function processNode(node) {
    if (node.nodeType === 3 &&
        !['A', 'SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(node.parentNode.nodeName)) {
      const text = node.nodeValue;
      const matches = text.match(emailRegex);

      if (matches) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        text.replace(emailRegex, function(match, email, offset) {
          if (offset > lastIndex) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, offset)));
          }

          const link = document.createElement('a');
          link.href = `mailto:${email}`;
          link.textContent = email;
          link.className = 'email-link';
          link.title = `Enviar email a ${email}`;
          link.style.color = 'inherit';
          link.style.textDecoration = 'underline';
          link.style.cursor = 'pointer';
          link.setAttribute('data-tooltip', 'Haz clic para enviar un email');
          fragment.appendChild(link);
          lastIndex = offset + match.length;
        });

        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }

        node.parentNode.replaceChild(fragment, node);
        return true;
      }
    }
    return false;
  }

  function walkAllNodes(node) {
    if (processNode(node)) return;

    let child = node.firstChild;
    while (child) {
      const next = child.nextSibling;
      walkAllNodes(child);
      child = next;
    }
  }

  walkAllNodes(document.body);

  const style = document.createElement('style');
  style.textContent = `
    .email-link {
      position: relative;
      transition: all 0.3s ease;
    }
    .email-link:hover {
      color: var(--accent-color, #4CAF50) !important;
    }
    .email-link:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 5px 10px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 5px;
      font-size: 0.8em;
      white-space: nowrap;
      z-index: 1000;
    }
  `;
  document.head.appendChild(style);
}

window.BlogfictionComponents = BlogfictionComponents;
window.loadComponent = loadComponent;
window.initComponents = initComponents;
