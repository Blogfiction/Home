/**
 * Componente: Work (Sección de trabajos)
 * - Maneja la funcionalidad interactiva de la sección de trabajos
 * - Incluye efectos de animación y modal de detalles
 */

function initWork() {
  // Elementos del DOM
  const workSection = document.getElementById('work');
  if (!workSection) return;
  
  const workCards = workSection.querySelectorAll('.work-card');
  const modal = document.getElementById('projectModal');
  const modalContent = modal ? modal.querySelector('.modal-body') : null;
  const closeModalBtn = modal ? modal.querySelector('.close-modal') : null;
  
  // 1. Configurar los eventos del modal
  function setupModal() {
    if (!modal) return;
    
    // Cerrar modal
    closeModalBtn.addEventListener('click', closeModal);
    
    // Cerrar también al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
      }
    });
    
    // Configurar botones para abrir el modal
    const viewProjectBtns = workSection.querySelectorAll('.view-project-btn');
    viewProjectBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtener los datos de la tarjeta para mostrar en el modal
        const card = this.closest('.work-card');
        openProjectModal(card);
      });
    });
  }

  // 2. Abrir el modal con los datos del proyecto
  function openProjectModal(card) {
    if (!modal || !modalContent) return;
    
    // Extraer información del proyecto
    const title = card.querySelector('h3').textContent;
    const subtitle = card.querySelector('h4').textContent;
    const description = card.querySelector('p').textContent;
    const image = card.querySelector('img').src;
    const tags = card.querySelectorAll('.w3-tag');
    
    // Construir el contenido del modal
    let tagsHTML = '';
    tags.forEach(tag => {
      tagsHTML += `<span class="${tag.className}">${tag.textContent}</span>`;
    });
    
    // Llenar el modal con contenido
    modalContent.innerHTML = `
      <div class="modal-project">
        <div class="modal-project-image">
          <img src="${image}" alt="${title}" class="pixel-corners">
        </div>
        <div class="modal-project-info">
          <h2>${title}</h2>
          <h3>${subtitle}</h3>
          <div class="modal-project-tags">${tagsHTML}</div>
          <div class="modal-project-description">
            <p>${description}</p>
            <p>Este es un ejemplo de proyecto destacado de nuestra empresa. Utilizamos tecnologías avanzadas y metodologías ágiles para desarrollar soluciones efectivas para nuestros clientes.</p>
          </div>
          <div class="modal-project-actions">
            <button class="action-btn pixel-corners">Ver detalles</button>
            <button class="action-btn pixel-corners">Contactar</button>
          </div>
        </div>
      </div>
    `;
    
    // Mostrar el modal con animación
    modal.style.display = 'block';
    
    // Añadir la clase visible con un pequeño retraso para la animación
    setTimeout(() => {
      modal.querySelector('.modal-content').classList.add('visible');
    }, 10);
    
    // Prevenir scroll en el body
    document.body.style.overflow = 'hidden';
  }

  // 3. Cerrar el modal
  function closeModal() {
    if (!modal) return;
    
    // Remover la clase visible para iniciar la animación de salida
    modal.querySelector('.modal-content').classList.remove('visible');
    
    // Ocultar el modal con animación
    setTimeout(() => {
      modal.style.display = 'none';
      
      // Restaurar scroll
      document.body.style.overflow = 'auto';
    }, 300);
  }

  // 4. Configurar efectos hover en las tarjetas
  function setupCardEffects() {
    workCards.forEach(card => {
      // Obtener las etiquetas dentro de esta tarjeta
      const tags = card.querySelectorAll('.w3-tag');
      
      // Efecto hover en tarjetas
      card.addEventListener('mouseenter', function() {
        // Añadir animación a las etiquetas con efecto escalonado
        tags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.transform = 'translateY(-3px) rotate(-3deg)';
          }, index * 80);
        });
      });
      
      card.addEventListener('mouseleave', function() {
        // Restaurar las etiquetas
        tags.forEach(tag => {
          tag.style.transform = '';
        });
      });
    });
  }

  // 5. Manejar efecto de carga de imágenes
  function setupImageLoading() {
    const images = workSection.querySelectorAll('.work-card-image img');
    
    images.forEach(img => {
      // Añadir clase de carga
      const imageContainer = img.parentElement;
      imageContainer.classList.add('loading');
      
      // Remover clase de carga cuando la imagen se carga
      img.addEventListener('load', () => {
        imageContainer.classList.remove('loading');
      });
      
      // Si la imagen ya está cargada (desde caché)
      if (img.complete) {
        imageContainer.classList.remove('loading');
      }
    });
  }

  // 6. Función de inicialización principal
  function initialize() {
    // Asegurar que el modal esté oculto inicialmente
    if (modal) {
      modal.style.display = 'none';
    }
    
    // Hacer visibles todas las tarjetas inmediatamente
    workCards.forEach((card) => {
      // Eliminar la dependencia de la clase card-visible
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
    
    // Configurar modal
    setupModal();
    
    // Configurar efectos hover
    setupCardEffects();
    
    // Configurar efecto de carga de imágenes
    setupImageLoading();
  }
  
  // Iniciar el componente
  initialize();
  
  console.log('Work component initialized - versión simplificada y corregida');
}

// Exportar la función de inicialización
window.initWork = initWork; 