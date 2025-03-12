/**
 * Componente: Sidebar (Barra lateral)
 */

function initSidebar() {
  // Elementos DOM
  const sidebar = document.getElementById("mySidebar");
  let floatingButton = null;
  
  // Crear botón flotante para abrir el sidebar si no existe
  if (!document.querySelector('.sidebar-float-button')) {
    floatingButton = document.createElement('div');
    floatingButton.className = 'sidebar-float-button';
    floatingButton.innerHTML = '<i class="fa fa-bars"></i>';
    floatingButton.setAttribute('aria-label', 'Abrir menú');
    document.body.appendChild(floatingButton);
  } else {
    floatingButton = document.querySelector('.sidebar-float-button');
  }
  
  // Función para ajustar tamaño del sidebar según el dispositivo
  function adjustSidebarSize() {
    if (!sidebar) return;
    
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Ajustar altura máxima para evitar scrollbars
    sidebar.style.height = `${viewportHeight}px`;
    
    // Ajustar ancho en dispositivos móviles
    if (viewportWidth <= 600) {
      sidebar.style.maxWidth = '85%';
    } else {
      sidebar.style.maxWidth = '320px';
    }
    
    // Comprobar si el contenido necesita scroll
    const sidebarContent = sidebar.querySelector('.sidebar-nav-links');
    if (sidebarContent) {
      const headerHeight = sidebar.querySelector('.sidebar-header')?.offsetHeight || 0;
      const footerHeight = sidebar.querySelector('.sidebar-footer')?.offsetHeight || 0;
      
      // Calcular altura disponible para el área de navegación
      const availableHeight = viewportHeight - headerHeight - footerHeight - 30; // 30px de margen extra
      
      sidebarContent.style.maxHeight = `${availableHeight}px`;
    }
  }
  
  // Función para abrir la barra lateral con animación mejorada
  window.w3_open = function() {
    if (!sidebar) return;
    
    // Ajustar tamaño antes de mostrar
    adjustSidebarSize();
    
    // Mostrar el sidebar antes de aplicar estilos
    sidebar.style.display = "block";
    
    // Pequeño retraso para asegurar transiciones suaves
    setTimeout(() => {
      sidebar.classList.add('sidebar-open');
      floatingButton.classList.add('active');
      // Agregar clase para impedir el scroll de la página
      document.body.classList.add('sidebar-open-no-scroll');
    }, 10);
  };
  
  // Función para cerrar la barra lateral
  window.w3_close = function() {
    if (!sidebar) return;
    
    sidebar.classList.remove('sidebar-open');
    
    if (floatingButton) {
      floatingButton.classList.remove('active');
    }
    
    // Quitar clase que impide el scroll
    document.body.classList.remove('sidebar-open-no-scroll');
    
    // Esperar a que termine la animación para ocultar
    setTimeout(() => {
      sidebar.style.display = "none";
    }, 400); // Debe coincidir con la duración de la transición
  };

  // Agregar eventos a los enlaces del sidebar para que lo cierren al hacer clic
  const sidebarLinks = document.querySelectorAll('#mySidebar a[href^="#"]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', window.w3_close);
  });

  // Asignar evento al botón de cerrar
  const closeButton = document.querySelector('.sidebar-close-btn');
  if (closeButton) {
    closeButton.addEventListener('click', window.w3_close);
  }
  
  // Asignar evento al botón flotante
  if (floatingButton) {
    floatingButton.addEventListener('click', function() {
      if (sidebar.style.display === "block") {
        window.w3_close();
      } else {
        window.w3_open();
      }
    });
  }
  
  // Ajustar cuando cambia el tamaño de la ventana
  window.addEventListener('resize', function() {
    if (sidebar && sidebar.style.display === "block") {
      adjustSidebarSize();
    }
  });
  
  // Agregar estilos CSS para prevenir scroll cuando sidebar está abierto
  if (!document.querySelector('#sidebar-no-scroll-style')) {
    const style = document.createElement('style');
    style.id = 'sidebar-no-scroll-style';
    style.textContent = `
      .sidebar-open-no-scroll {
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);
  }

  console.log('Sidebar component initialized with dynamic sizing and no overlay');
}

// Exportar la función de inicialización
window.initSidebar = initSidebar; 