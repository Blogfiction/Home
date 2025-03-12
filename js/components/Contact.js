/**
 * Componente: Contact (Sección de contacto)
 */

function initContact() {
  // Efecto hover para las tarjetas de información
  const contactCards = document.querySelectorAll('#contact .w3-card');
  
  contactCards.forEach(card => {
    // Añadir un efecto de elevación al hover
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
  });

  // Efecto para la imagen del mapa
  const mapImage = document.querySelector('.w3-image.w3-greyscale-min');
  if (mapImage) {
    mapImage.addEventListener('mouseenter', function() {
      this.style.filter = 'grayscale(0%)';
      this.style.transform = 'scale(1.02)';
    });
    
    mapImage.addEventListener('mouseleave', function() {
      this.style.filter = 'grayscale(50%)';
      this.style.transform = 'scale(1)';
    });
  }

  console.log('Contact component initialized');
}

// Exportar la función de inicialización
window.initContact = initContact; 