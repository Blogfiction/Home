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

  console.log('Navbar component initialized');
}

// Exportar la función de inicialización
window.initNavbar = initNavbar; 