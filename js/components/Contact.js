/**
 * Componente: Contact (Sección de contacto)
 */

// Componente de Contacto
class ContactComponent {
  constructor() {
    console.log('Componente de Contacto inicializado');
    this.initEffects();
    this.initMap();
  }

  // Inicializar todos los efectos visuales
  initEffects() {
    // Animar el título con un retraso para que sea visible después de la carga
    setTimeout(() => {
      const sectionTitle = document.querySelector('#contact-section .section-title');
      if (sectionTitle) {
        sectionTitle.classList.add('title-animated');
      }
    }, 300);

    // Aplicar efectos de entrada a los elementos de información
    const infoItems = document.querySelectorAll('.contact-info-item');
    infoItems.forEach((item, index) => {
      item.classList.add('fade-in-right');
      item.style.animationDelay = `${index * 0.1 + 0.3}s`;
    });

    // Aplicar efectos a las tarjetas de contacto
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
      card.classList.add('card-animated');
      card.style.animationDelay = `${index * 0.15 + 0.3}s`;
      
      // Efecto de elevación y animación del icono al pasar el ratón
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-card-icon');
        if (icon) {
          icon.style.transform = 'translateX(-50%) rotate(10deg)';
          icon.style.backgroundColor = 'var(--accent-color)';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-card-icon');
        if (icon) {
          icon.style.transform = 'translateX(-50%)';
          icon.style.backgroundColor = 'var(--primary-color)';
        }
      });
    });

    // Efectos para iconos sociales
    const socialIcons = document.querySelectorAll('.social-icon-btn');
    socialIcons.forEach((icon, index) => {
      icon.classList.add('bounce-in');
      icon.style.animationDelay = `${index * 0.1 + 0.5}s`;
    });

    // Efecto para el contenedor de Google Maps
    const mapContainer = document.querySelector('.google-map-container');
    if (mapContainer) {
      mapContainer.classList.add('fade-in-up');
      mapContainer.style.animationDelay = '0.6s';
    }

    // Añadir efecto de pulso al info box del mapa después de la carga
    setTimeout(() => {
      const mapInfoBox = document.querySelector('.map-info-box');
      if (mapInfoBox) {
        mapInfoBox.classList.add('pulse');
      }
    }, 1500);

    // Efecto de parallax para el fondo según el scroll
    window.addEventListener('scroll', () => {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        const scrollPosition = window.scrollY;
        const sectionTop = contactSection.offsetTop;
        const sectionHeight = contactSection.offsetHeight;
        
        if (scrollPosition > sectionTop - window.innerHeight && 
            scrollPosition < sectionTop + sectionHeight) {
          const parallaxValue = (scrollPosition - sectionTop + window.innerHeight) * 0.05;
          contactSection.style.backgroundPosition = `0px ${parallaxValue}px`;
        }
      }
    });
  }

  // Inicializar el mapa de Google (si es necesario configurar algo específico)
  initMap() {
    // Aquí iría cualquier configuración adicional para el mapa de Google
    // Ejemplo: zoom, marcadores, etc.
    console.log('Mapa de Google inicializado');
  }

  // Crear y mostrar una notificación
  showNotification(message, type = 'success') {
    // Eliminar notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Crear la notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    document.body.appendChild(notification);
    
    // Mostrar la notificación
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
}

// Inicializar el componente cuando se carga el documento
document.addEventListener('DOMContentLoaded', () => {
  window.contactComponent = new ContactComponent();
  console.log('Componente de Contacto inicializado con efectos mejorados');
}); 