/**
 * Componente: Hero (Cabecera con imagen)
 */

function initHero() {
  // Configurar evento para el botón de "MÁS INFO"
  const infoButton = document.querySelector('.w3-display-bottomleft .w3-button');
  if (infoButton) {
    infoButton.removeAttribute('onclick');
    infoButton.addEventListener('click', function() {
      document.getElementById('id01').style.display = 'block';
    });
  }

  // Añadir efecto parallax suave al hacer scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroImage = document.querySelector('.w3-display-container img');
    
    if (heroImage && scrollPosition < 500) {
      // Efecto parallax suave
      heroImage.style.transform = `translateY(${scrollPosition * 0.15}px)`;
    }
  });

  console.log('Hero component initialized');
}

// Exportar la función de inicialización
window.initHero = initHero; 