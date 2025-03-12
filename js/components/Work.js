/**
 * Componente: Work (Sección de trabajos)
 * - Maneja la funcionalidad interactiva de la sección de trabajos
 * - Incluye efectos de animación y modal de detalles
 */

function initWork() {
  // Referencias a elementos del DOM
  const workSection = document.getElementById('work');
  const filterButtons = workSection.querySelectorAll('.filter-btn');
  const workCards = workSection.querySelectorAll('.work-card');
  const projectModal = document.getElementById('projectModal');
  const modalBody = projectModal.querySelector('.modal-body');
  const closeModal = projectModal.querySelector('.close-modal');
  const viewProjectButtons = workSection.querySelectorAll('.view-project-btn');
  const viewAllButton = workSection.querySelector('.view-all-btn');
  
  // Función para filtrar proyectos por categoría
  function filterProjects(filterValue) {
    workCards.forEach(card => {
      // Obtener categorías del proyecto (pueden ser múltiples)
      const categories = card.getAttribute('data-category');
      
      if (filterValue === 'all' || categories.includes(filterValue)) {
        // Animación suave para mostrar el card
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        // Animación suave para ocultar el card
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
  
  // Manejar el click en botones de filtro
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Agregar clase active al botón clickeado
      this.classList.add('active');
      
      // Filtrar proyectos según la categoría
      const filterValue = this.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });
  
  // Manejar click en botones "Ver Proyecto"
  viewProjectButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Encontrar la tarjeta padre
      const card = this.closest('.work-card');
      
      // Obtener datos del proyecto
      const imgSrc = card.querySelector('img').src;
      const title = card.querySelector('h3').textContent;
      const subtitle = card.querySelector('h4').textContent;
      const description = card.querySelector('p').textContent;
      const tags = Array.from(card.querySelectorAll('.w3-tag')).map(tag => tag.outerHTML).join('');
      
      // Generar contenido extendido para el modal
      const extendedDesc = `
        <p>${description}</p>
        <p>Este proyecto representa nuestra dedicación a crear experiencias excepcionales y soluciones innovadoras. Utilizamos tecnologías de vanguardia y metodologías ágiles para asegurar resultados de alta calidad.</p>
        <p>Para más información sobre este proyecto o para discutir cómo podemos ayudarte con algo similar, no dudes en contactarnos.</p>
      `;
      
      // Llenar el modal con los datos del proyecto
      modalBody.innerHTML = `
        <img src="${imgSrc}" alt="${title}" class="pixel-corners">
        <h2>${title}</h2>
        <h3>${subtitle}</h3>
        <div class="modal-project-tags">${tags}</div>
        <div class="modal-project-description">${extendedDesc}</div>
        <div class="modal-project-actions">
          <button class="btn-pixel pixel-corners contact-project-btn">CONTACTAR SOBRE ESTE PROYECTO</button>
        </div>
      `;
      
      // Mostrar el modal con animación
      projectModal.style.display = 'block';
      
      // Configurar el botón de contacto en el modal
      const contactProjectBtn = modalBody.querySelector('.contact-project-btn');
      if (contactProjectBtn) {
        contactProjectBtn.addEventListener('click', function() {
          // Cerrar el modal
          projectModal.style.display = 'none';
          
          // Scroll hasta la sección de contacto
          document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
          });
          
          // Opcional: pre-llenar el formulario con información del proyecto
          const contactSubject = document.querySelector('#contact-form input[name="Subject"]');
          if (contactSubject) {
            contactSubject.value = `Consulta sobre: ${title}`;
          }
        });
      }
    });
  });
  
  // Cerrar el modal al hacer click en la X
  closeModal.addEventListener('click', function() {
    projectModal.style.display = 'none';
  });
  
  // Cerrar el modal al hacer click fuera del contenido
  window.addEventListener('click', function(event) {
    if (event.target === projectModal) {
      projectModal.style.display = 'none';
    }
  });
  
  // También cerrar con la tecla ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && projectModal.style.display === 'block') {
      projectModal.style.display = 'none';
    }
  });
  
  // Manejar el botón "Ver todos los proyectos"
  if (viewAllButton) {
    viewAllButton.addEventListener('click', function() {
      // Aquí podrías redirigir a una página de portfolio completa
      // o cargar más proyectos con AJAX
      
      // Por ahora, simplemente mostramos todos los proyectos
      filterButtons.forEach(btn => btn.classList.remove('active'));
      filterButtons[0].classList.add('active'); // Activar el botón "Todos"
      filterProjects('all');
      
      // Notificar al usuario
      showNotification('¡Mostrando todos los proyectos disponibles!');
    });
  }
  
  // Función para mostrar notificaciones
  function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification pixel-corners';
    notification.textContent = message;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Aplicar efectos de hover mejorados
  workCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hovered');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hovered');
    });
  });
  
  // Efectos de scroll para revelar elementos
  function checkVisibility() {
    workCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const isVisible = (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
      );
      
      if (isVisible) {
        card.classList.add('visible');
      }
    });
  }
  
  // Verificar visibilidad inicial y en cada scroll
  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
  
  console.log('Work component initialized with enhanced filters and interactions');
}

// Exportar la función de inicialización
window.initWork = initWork; 