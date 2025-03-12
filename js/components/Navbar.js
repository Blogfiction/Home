/**
 * Componente: Navbar (Barra de navegación)
 */

function initNavbar() {
  // Efecto de scroll para la navbar
  function handleScroll() {
    const navbar = document.querySelector('.w3-bar.w3-theme-d2');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.25)";
      navbar.style.height = "56px";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.backgroundColor = "rgba(126, 63, 242, 0.95)";
    } else {
      navbar.style.boxShadow = "0 6px 0 rgba(0, 0, 0, 0.3)";
      navbar.style.height = "60px";
      navbar.style.backdropFilter = "blur(0px)";
      navbar.style.backgroundColor = "";
    }
  }

  // Observador de secciones para resaltar enlaces activos
  function setupSectionObserver() {
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if(sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          
          // Remover el estado activo de todos los enlaces
          navLinks.forEach(link => {
            link.classList.remove('active-link');
            
            // Si el enlace apunta a la sección actual, activarlo
            const href = link.getAttribute('href').substring(1); // Eliminar el #
            if (href === currentId) {
              link.classList.add('active-link');
            }
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  }

  // Asignar eventos de clic a los enlaces del menú
  const navLinks = document.querySelectorAll('.w3-bar-item.w3-button');
  navLinks.forEach(link => {
    // Agregar efecto de clic
    link.addEventListener('mousedown', function() {
      this.style.transform = 'translate(2px, 2px)';
    });
    
    link.addEventListener('mouseup', function() {
      this.style.transform = '';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Animar la entrada de los íconos sociales en fila horizontal
  function animateSocialIcons() {
    const socialIcons = document.querySelectorAll('.nav-social-icon');
    
    socialIcons.forEach((icon, index) => {
      // Configurar estado inicial
      icon.style.opacity = "0";
      icon.style.transform = "translateY(10px)";
      
      // Animar con retardo escalonado
      setTimeout(() => {
        icon.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        icon.style.opacity = "1";
        icon.style.transform = "translateY(0)";
      }, 300 + (index * 100));
    });
  }
  
  // Agregar efectos de hover y clic para íconos sociales
  const socialIcons = document.querySelectorAll('.nav-social-icon');
  socialIcons.forEach(icon => {
    // Efecto de clic
    icon.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.9)';
      this.style.boxShadow = '1px 1px 0 rgba(0, 0, 0, 0.25)';
    });
    
    icon.addEventListener('mouseup', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  // Inicializar efectos de scroll
  window.addEventListener('scroll', handleScroll);
  
  // Inicializar observador de secciones
  setupSectionObserver();
  
  // Animar íconos sociales al cargar
  animateSocialIcons();

  console.log('Navbar component initialized with enhanced animations');
}

// Exportar la función de inicialización
window.initNavbar = initNavbar; 