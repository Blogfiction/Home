/**
 * Blogfiction - Sistema de Componentes
 * Este archivo gestiona todos los componentes de la página
 */

// Objeto global para almacenar los componentes
const BlogfictionComponents = {};

// Función para cargar un componente HTML en un contenedor
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
      // Disparar evento de componente cargado
      const event = new CustomEvent('componentLoaded', { detail: { id: containerId } });
      document.dispatchEvent(event);
    })
    .catch(error => {
      console.error(`Error al cargar el componente ${componentUrl}:`, error);
    });
}

// Función para inicializar todos los componentes
function initComponents() {
  // Cargar componentes cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    // Registrar los componentes disponibles
    const components = [
      { id: 'navbar-container', url: './components/Navbar.html' },
      { id: 'sidebar-container', url: './components/Sidebar.html' },
      { id: 'hero-container', url: './components/Hero.html' },
      { id: 'info-modal-container', url: './components/InfoModal.html' },
      { id: 'team-container', url: './components/Team.html' },
      { id: 'work-container', url: './components/Work.html' },
      { id: 'testimonials-container', url: './components/Testimonials.html' },
      { id: 'pricing-container', url: './components/Services.html' },
      { id: 'contact-container', url: './components/Contact.html' },
      { id: 'footer-container', url: './components/Footer.html' },
      { id: 'background-music-container', url: './components/BackgroundMusic.html' }
    ];

    // Variables para controlar la carga de componentes
    let loadedComponents = 0;
    const totalComponents = components.length;

    // Cargar cada componente
    components.forEach(component => {
      loadComponent(component.id, component.url);
    });

    // Inicializar funcionalidad después de cargar todos los componentes
    document.addEventListener('componentLoaded', (e) => {
      // Incrementar contador de componentes cargados
      loadedComponents++;
      
      // Activar scripts específicos para cada componente
      switch (e.detail.id) {
        case 'navbar-container':
          if (typeof initNavbar === 'function') initNavbar();
          break;
        case 'sidebar-container':
          if (typeof initSidebar === 'function') initSidebar();
          break;
        case 'team-container':
          if (typeof initTeam === 'function') initTeam();
          break;
        case 'work-container':
          if (typeof initWork === 'function') initWork();
          break;
        case 'testimonials-container':
          if (typeof initTestimonials === 'function') initTestimonials();
          break;
        case 'pricing-container':
          if (typeof initServices === 'function') initServices();
          break;
        case 'footer-container':
          if (typeof initFooter === 'function') initFooter();
          break;
        case 'hero-container':
          if (typeof initHero === 'function') initHero();
          break;
        case 'background-music-container':
          if (typeof initBackgroundMusic === 'function') initBackgroundMusic();
          break;
        // Agrega más casos según sea necesario
      }
      
      // Si todos los componentes se han cargado, hacer los emails clickeables
      if (loadedComponents >= totalComponents) {
        console.log('Todos los componentes cargados. Haciendo emails clickeables...');
        // Pequeño retraso para asegurar que el DOM está completamente actualizado
        setTimeout(makeEmailsClickable, 300);
      }
    });
  });
}

/**
 * Función para hacer clickeables todos los textos de email en el proyecto
 * Esta función busca textos que parezcan direcciones de email y los convierte en enlaces mailto
 */
function makeEmailsClickable() {
  // Expresión regular para identificar direcciones de email en texto
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  
  // Función para procesar nodos de texto
  function processNode(node) {
    // Si es un nodo de texto y no está dentro de un enlace o input
    if (node.nodeType === 3 && 
        !['A', 'SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(node.parentNode.nodeName)) {
      
      const text = node.nodeValue;
      const matches = text.match(emailRegex);
      
      if (matches) {
        // Crear un fragmento para reemplazar el nodo de texto
        const fragment = document.createDocumentFragment();
        
        // Dividir el texto por las coincidencias de email
        let lastIndex = 0;
        text.replace(emailRegex, function(match, email, offset) {
          // Agregar el texto antes del email
          if (offset > lastIndex) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, offset)));
          }
          
          // Crear el enlace para el email
          const link = document.createElement('a');
          link.href = `mailto:${email}`;
          link.textContent = email;
          link.className = 'email-link';
          link.title = `Enviar email a ${email}`;
          link.style.color = 'inherit';
          link.style.textDecoration = 'underline';
          link.style.cursor = 'pointer';
          
          // Agregar tooltip de ayuda
          link.setAttribute('data-tooltip', 'Haz clic para enviar un email');
          
          // Agregar el enlace al fragmento
          fragment.appendChild(link);
          
          lastIndex = offset + match.length;
        });
        
        // Agregar el texto restante después del último email
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        
        // Reemplazar el nodo de texto con el fragmento
        node.parentNode.replaceChild(fragment, node);
        return true;
      }
    }
    return false;
  }
  
  // Función recursiva para procesar todos los nodos del documento
  function walkAllNodes(node) {
    if (processNode(node)) return;
    
    // Si tiene hijos, procesarlos
    let child = node.firstChild;
    while (child) {
      // Guardar el siguiente antes de procesar, porque el árbol puede cambiar
      const next = child.nextSibling;
      walkAllNodes(child);
      child = next;
    }
  }
  
  // Procesar todo el documento
  walkAllNodes(document.body);
  
  // Agregar estilo para el tooltip
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

// Exportar funciones globalmente
window.BlogfictionComponents = BlogfictionComponents;
window.loadComponent = loadComponent;
window.initComponents = initComponents; 