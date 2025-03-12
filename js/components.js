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
      // { id: 'sidebar-container', url: './components/Sidebar.html' },
      { id: 'hero-container', url: './components/Hero.html' },
      { id: 'info-modal-container', url: './components/InfoModal.html' },
      { id: 'team-container', url: './components/Team.html' },
      { id: 'work-container', url: './components/Work.html' },
      { id: 'pricing-container', url: './components/Services.html' },
      { id: 'contact-container', url: './components/Contact.html' },
      { id: 'footer-container', url: './components/Footer.html' }
    ];

    // Cargar cada componente
    components.forEach(component => {
      loadComponent(component.id, component.url);
    });

    // Inicializar funcionalidad después de cargar todos los componentes
    document.addEventListener('componentLoaded', (e) => {
      // Activar scripts específicos para cada componente
      switch (e.detail.id) {
        case 'navbar-container':
          if (typeof initNavbar === 'function') initNavbar();
          break;
        // case 'sidebar-container':
        //   if (typeof initSidebar === 'function') initSidebar();
        //   break;
        case 'team-container':
          if (typeof initTeam === 'function') initTeam();
          break;
        case 'work-container':
          if (typeof initWork === 'function') initWork();
          break;
        case 'pricing-container':
          if (typeof initServices === 'function') initServices();
          break;
        case 'footer-container':
          if (typeof initFooter === 'function') initFooter();
          break;
        // Agrega más casos según sea necesario
      }
    });
  });
}

// Exportar funciones globalmente
window.BlogfictionComponents = BlogfictionComponents;
window.loadComponent = loadComponent;
window.initComponents = initComponents; 