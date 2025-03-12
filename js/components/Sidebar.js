/**
 * Componente: Sidebar (Barra lateral)
 */

function initSidebar() {
  // Función para abrir la barra lateral
  window.w3_open = function() {
    var sidebar = document.getElementById("mySidebar");
    sidebar.style.width = "300px";
    sidebar.style.paddingTop = "10%";
    sidebar.style.display = "block";
  };
  
  // Función para cerrar la barra lateral
  window.w3_close = function() {
    document.getElementById("mySidebar").style.display = "none";
  };

  // Agregar eventos a los enlaces del sidebar para que lo cierren al hacer clic
  const sidebarLinks = document.querySelectorAll('#mySidebar a[href^="#"]');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      document.getElementById("mySidebar").style.display = "none";
    });
  });

  // Asignar evento al botón de cerrar
  const closeButton = document.querySelector('#mySidebar a[onclick="w3_close()"]');
  if (closeButton) {
    closeButton.removeAttribute('onclick');
    closeButton.addEventListener('click', window.w3_close);
  }

  console.log('Sidebar component initialized');
}

// Exportar la función de inicialización
window.initSidebar = initSidebar; 