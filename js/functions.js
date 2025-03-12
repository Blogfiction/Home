/**
 * Funciones JavaScript para el sitio web
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializamos todas las funcionalidades
  setupModalControls();
});

/**
 * Configura el control de modales para evitar problemas de hover
 * Este código complementa el manejo de modales existente en index.html
 */
function setupModalControls() {
  // Agregamos la clase modal-active al body cuando se abre un modal
  const modalBtns = document.querySelectorAll('[onclick*="document.getElementById"][onclick*=".style.display=\'block\'"]');
  
  modalBtns.forEach(btn => {
    const originalOnClick = btn.getAttribute('onclick');
    
    btn.setAttribute('onclick', originalOnClick + ';document.body.classList.add("modal-active");');
  });
  
  // Quitamos la clase modal-active al body cuando se cierra un modal
  const closeButtons = document.querySelectorAll('.w3-button.w3-display-topright, [onclick*=".style.display=\'none\'"]');
  
  closeButtons.forEach(btn => {
    const originalOnClick = btn.getAttribute('onclick');
    
    if (originalOnClick) {
      btn.setAttribute('onclick', originalOnClick + ';document.body.classList.remove("modal-active");');
    }
  });
  
  // Agregar cierre de modal al hacer clic fuera (complementa el código existente)
  const modales = document.querySelectorAll('.w3-modal');
  
  modales.forEach(modal => {
    const originalClickHandler = modal.onclick;
    
    modal.onclick = function(event) {
      // Preservar el comportamiento original si existe
      if (typeof originalClickHandler === 'function') {
        originalClickHandler.call(this, event);
      }
      
      // Si el clic fue directamente en el fondo del modal
      if (event.target === modal) {
        document.body.classList.remove('modal-active');
      }
    };
  });
} 