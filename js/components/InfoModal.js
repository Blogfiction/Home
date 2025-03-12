/**
 * Componente: InfoModal (Ventana modal informativa)
 */

function initInfoModal() {
  // Configurar evento para cerrar el modal
  const closeButton = document.querySelector('#id01 .w3-display-topright');
  if (closeButton) {
    closeButton.removeAttribute('onclick');
    closeButton.addEventListener('click', function() {
      document.getElementById('id01').style.display = 'none';
    });
  }

  // Cerrar modal al hacer clic fuera de él
  const modal = document.getElementById('id01');
  if (modal) {
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Cerrar modal con la tecla Escape
  window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });

  console.log('InfoModal component initialized');
}

// Exportar la función de inicialización
window.initInfoModal = initInfoModal; 