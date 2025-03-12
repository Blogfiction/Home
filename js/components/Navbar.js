/**
 * Componente: Navbar (Barra de navegación)
 */

function initNavbar() {
  // Manejador para abrir menú en versiones móviles
  function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }

  // Asignar evento al botón de menú móvil
  const menuButton = document.querySelector('.w3-bar .w3-button[onclick="openNav()"]');
  if (menuButton) {
    menuButton.removeAttribute('onclick');
    menuButton.addEventListener('click', openNav);
  }

  // Asignar eventos de clic a los enlaces del menú
  const navLinks = document.querySelectorAll('.w3-bar-item.w3-button');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Cerrar menú móvil al hacer clic en un enlace
      const navDemo = document.getElementById("navDemo");
      if (navDemo && navDemo.className.indexOf("w3-show") !== -1) {
        navDemo.className = navDemo.className.replace(" w3-show", "");
      }
    });
  });

  // Mejorar la interacción con el menú de redes sociales
  const rrssBtn = document.querySelector('.rrss-btn');
  const socialDropdown = document.querySelector('.social-dropdown');
  
  if (rrssBtn && socialDropdown) {
    // Variable para controlar si el menú está abierto o cerrado
    let isOpen = false;
    
    // Mostrar/ocultar al hacer clic en el botón RRSS
    rrssBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      isOpen = !isOpen;
      
      if (isOpen) {
        socialDropdown.style.display = 'flex';
        // Añadir clase activa al botón para indicar que está abierto
        this.classList.add('active');
      } else {
        socialDropdown.style.display = 'none';
        this.classList.remove('active');
      }
    });
    
    // Efecto de entrada para los iconos
    const socialIcons = socialDropdown.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
      // Configurar delay para entrada escalonada
      icon.style.transitionDelay = `${index * 0.05}s`;
      
      // Evitar cerrar el menú cuando se hace clic en un icono
      icon.addEventListener('click', function(e) {
        e.stopPropagation();
      });
      
      // Agregar efectos visuales al hover
      icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
      });
      
      icon.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
    
    // Manejar cierre del dropdown cuando se hace clic fuera
    document.addEventListener('click', function(event) {
      if (isOpen && !rrssBtn.contains(event.target) && !socialDropdown.contains(event.target)) {
        socialDropdown.style.display = 'none';
        rrssBtn.classList.remove('active');
        isOpen = false;
      }
    });
  }

  console.log('Navbar component initialized with social menu enhancements');
}

// Exportar la función de inicialización
window.initNavbar = initNavbar; 