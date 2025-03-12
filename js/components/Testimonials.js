/**
 * Componente: Testimonials (Testimonios de clientes)
 * Versión unificada que combina la funcionalidad básica del carrusel y las mejoras visuales
 */

function initTestimonials() {
  // Referencias a elementos del DOM
  const testimonialsSection = document.getElementById('testimonials');
  if (!testimonialsSection) {
    console.warn('No se encontró la sección de testimonios');
    return;
  }
  
  const carousel = testimonialsSection.querySelector('.testimonials-carousel');
  const cards = carousel.querySelectorAll('.testimonial-card');
  const prevBtn = testimonialsSection.querySelector('.carousel-control.prev');
  const nextBtn = testimonialsSection.querySelector('.carousel-control.next');
  const dots = testimonialsSection.querySelectorAll('.dot');
  const authorImages = testimonialsSection.querySelectorAll('.testimonial-author img');
  
  console.log(`Inicializando carrusel con ${cards.length} testimonios`);
  
  // Variables de control
  let currentIndex = 0;
  const totalCards = cards.length;
  
  // Función para igualar la altura de todas las tarjetas
  function equalizeCardHeights() {
    // Primero, resetear alturas para medir correctamente
    cards.forEach(card => {
      card.style.height = 'auto';
    });
    
    // Esperar un momento para que se apliquen los estilos
    setTimeout(() => {
      // Encontrar la altura máxima
      let maxHeight = 0;
      cards.forEach(card => {
        const height = card.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });
      
      // Aplicar la altura máxima a todas las tarjetas
      cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
      });
      
      console.log(`Altura de las tarjetas igualada a ${maxHeight}px`);
    }, 100);
  }
  
  // Función para mostrar una tarjeta específica
  function showCard(index) {
    // Validar el índice
    if (index < 0) index = totalCards - 1;
    if (index >= totalCards) index = 0;
    
    // Actualizar el índice actual
    currentIndex = index;
    
    // Mover el carrusel - multiplicamos por el porcentaje que ocupa cada tarjeta
    const percentage = (100 / totalCards) * currentIndex;
    carousel.style.transform = `translateX(-${percentage}%)`;
    
    // Actualizar los dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    
    // Ajustar visibilidad y escala de las tarjetas
    cards.forEach((card, i) => {
      if (i === currentIndex) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.setAttribute('aria-hidden', 'false');
      } else {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.95)';
        card.setAttribute('aria-hidden', 'true');
      }
    });
    
    console.log(`Mostrando testimonio ${currentIndex + 1} de ${totalCards}`);
  }
  
  // Configurar el carrusel para display: flex
  carousel.style.display = 'flex';
  
  // Establecer el ancho del carrusel como un porcentaje basado en el número de tarjetas
  carousel.style.width = `${totalCards * 100}%`;
  
  // Configurar cada tarjeta para tener el ancho correcto
  const cardWidth = 100 / totalCards;
  cards.forEach(card => {
    card.style.flex = `0 0 ${cardWidth}%`;
    // Asegurarnos de que no hay márgenes que afecten el cálculo
    card.style.boxSizing = 'border-box';
    card.style.margin = '0';
    card.style.padding = '30px';
  });
  
  // Ejecutar una vez para igualar alturas
  equalizeCardHeights();
  
  // Reetablecer alturas cuando la ventana cambie de tamaño
  window.addEventListener('resize', equalizeCardHeights);
  
  // Configurar botones de navegación
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showCard(currentIndex - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showCard(currentIndex + 1);
    });
  }
  
  // Configurar dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showCard(i);
    });
  });
  
  // Configurar navegación con teclado
  testimonialsSection.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      showCard(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showCard(currentIndex + 1);
    }
  });
  
  // Configurar deslizamiento táctil
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Umbral mínimo para considerar un swipe
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe izquierda (siguiente)
      showCard(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe derecha (anterior)
      showCard(currentIndex - 1);
    }
  }
  
  // Autoplay
  let autoplayInterval;
  
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      showCard(currentIndex + 1);
    }, 5000); // Cambiar cada 5 segundos
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Detener autoplay al interactuar
  carousel.addEventListener('mouseenter', stopAutoplay);
  if (prevBtn) prevBtn.addEventListener('mouseenter', stopAutoplay);
  if (nextBtn) nextBtn.addEventListener('mouseenter', stopAutoplay);
  dots.forEach(dot => dot.addEventListener('mouseenter', stopAutoplay));
  
  // Reiniciar autoplay después de un tiempo sin interacción
  carousel.addEventListener('mouseleave', startAutoplay);
  
  // ========= MEJORAS VISUALES (antes en TestimonialsEnhanced.js) =========
  
  // Añadir efectos de hover a las tarjetas
  cards.forEach(card => {
    const originalTransform = card.style.transform || '';
    const originalBoxShadow = card.style.boxShadow || '';
    
    card.addEventListener('mouseenter', () => {
      if (card.getAttribute('aria-hidden') === 'false') {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '6px 15px 0 rgba(0, 0, 0, 0.2)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (card.getAttribute('aria-hidden') === 'false') {
        card.style.transform = originalTransform;
        card.style.boxShadow = originalBoxShadow;
      }
    });
  });
  
  // Verificar y manejar las imágenes
  authorImages.forEach(img => {
    // Efecto de loading de las imágenes
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    // Manejar errores de carga
    img.addEventListener('error', () => {
      img.src = './img/avatar.jpg'; // Imagen de respaldo
    });
    
    // Añadir efectos de hover a las imágenes
    img.parentElement.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.1) rotate(5deg)';
      img.style.borderColor = 'var(--accent-color)';
    });
    
    img.parentElement.addEventListener('mouseleave', () => {
      img.style.transform = '';
      img.style.borderColor = '';
    });
  });
  
  // Añadir efectos pixelados a elementos con la clase pixel-corners
  const pixelCorners = testimonialsSection.querySelectorAll('.pixel-corners');
  pixelCorners.forEach(element => {
    element.addEventListener('mouseenter', () => {
      // Solo aplicar el efecto si el elemento es directo (no dentro de otro elemento con la misma clase)
      if (!element.closest('.pixel-corners') || element.closest('.pixel-corners') === element) {
        element.style.transition = 'clip-path 0.3s ease';
        // Efecto de "pixelación" más pronunciado al hacer hover
        element.style.clipPath = `
          polygon(
            0px 6px,
            6px 6px,
            6px 0px,
            calc(100% - 6px) 0px,
            calc(100% - 6px) 6px,
            100% 6px,
            100% calc(100% - 6px),
            calc(100% - 6px) calc(100% - 6px),
            calc(100% - 6px) 100%,
            6px 100%,
            6px calc(100% - 6px),
            0px calc(100% - 6px)
          )
        `;
      }
    });
    
    element.addEventListener('mouseleave', () => {
      if (!element.closest('.pixel-corners') || element.closest('.pixel-corners') === element) {
        element.style.clipPath = '';
      }
    });
  });
  
  // Añadir efectos de brillo a estrellas de puntuación
  const stars = testimonialsSection.querySelectorAll('.testimonial-rating i');
  stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
      // Efecto de brillo al pasar el mouse
      star.style.color = 'var(--accent-color)';
      star.style.transform = 'scale(1.3)';
      
      // También resaltar las estrellas anteriores (para efecto de selección)
      const parentRating = star.closest('.testimonial-rating');
      const siblingStars = parentRating.querySelectorAll('i');
      
      siblingStars.forEach((s, i) => {
        if (i <= index) {
          s.style.color = 'var(--accent-color)';
        }
      });
    });
    
    star.addEventListener('mouseleave', () => {
      // Restaurar el color original
      star.style.color = '';
      star.style.transform = '';
      
      // Restaurar las demás estrellas también
      const parentRating = star.closest('.testimonial-rating');
      const siblingStars = parentRating.querySelectorAll('i');
      
      siblingStars.forEach(s => {
        s.style.color = '';
      });
    });
  });
  
  // Inicializar el carrusel
  showCard(0);
  startAutoplay();
  
  console.log('Componente de testimonios inicializado con todas las características');
}

// Exportar la función de inicialización
window.initTestimonials = initTestimonials;

// Ejecutar después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initTestimonials); 