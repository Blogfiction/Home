/**
 * Componente: Team (Sección de equipo con organigrama)
 */

function initTeam() {
  // Configurar todos los eventos de los modales
  const modales = [
    'modal-direccion', 'modal-desarrollo', 'modal-productos', 'modal-diseno', 
    'modal-servicios', 'modal-talleres', 'modal-desarrollo-digital', 'modal-finanzas', 
    'modal-ventas', 'modal-contabilidad', 'modal-rrhh',
    'modal-practicante-1', 'modal-practicante-2', 'modal-practicante-3',
    'modal-practicante-4', 'modal-practicante-5', 'modal-practicante-6'
  ];
  
  // Configurar eventos para abrir modales
  const cajas = document.querySelectorAll('.organigrama-caja[onclick]');
  cajas.forEach(caja => {
    const onClickAttr = caja.getAttribute('onclick');
    if (onClickAttr) {
      // Extraer el ID del modal del atributo onclick
      const modalId = onClickAttr.match(/document\.getElementById\('(.+?)'\)/)[1];
      caja.removeAttribute('onclick');
      
      // Agregar evento de clic
      caja.addEventListener('click', function() {
        document.getElementById(modalId).style.display = 'block';
        document.body.classList.add('modal-active');
      });
    }
  });
  
  // Configurar eventos para cerrar modales
  modales.forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (modal) {
      // Botón de cierre
      const closeButton = modal.querySelector('.modal-cerrar-movil');
      if (closeButton) {
        closeButton.removeAttribute('onclick');
        closeButton.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.classList.remove('modal-active');
        });
      }
      
      // Cerrar al hacer clic fuera del modal
      modal.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
          document.body.classList.remove('modal-active');
        }
      });
    }
  });

  // Efecto hover para las cajas del organigrama
  const organigramaCajas = document.querySelectorAll('.organigrama-caja');
  organigramaCajas.forEach(caja => {
    caja.addEventListener('mouseenter', function() {
      organigramaCajas.forEach(otraCaja => {
        if (otraCaja !== caja) {
          otraCaja.style.opacity = '0.7';
        }
      });
    });
    
    caja.addEventListener('mouseleave', function() {
      organigramaCajas.forEach(otraCaja => {
        otraCaja.style.opacity = '1';
      });
    });
  });
  
  // Efecto inicial para destacar estructura
  setTimeout(function() {
    const cajas = document.querySelectorAll('.organigrama-caja');
    let delay = 0;
    
    cajas.forEach(caja => {
      setTimeout(function() {
        caja.style.transform = 'translateY(-5px)';
        setTimeout(function() {
          caja.style.transform = 'translateY(0)';
        }, 300);
      }, delay);
      delay += 150;
    });
  }, 1000);

  // Configurar botones de contacto de practicantes
  const botonesPracticantes = document.querySelectorAll('.practicante-contacto');
  botonesPracticantes.forEach((boton, index) => {
    boton.addEventListener('click', function() {
      const modalId = `modal-practicante-${index + 1}`;
      document.getElementById(modalId).style.display = 'block';
      document.body.classList.add('modal-active');
    });
  });

  // Efectos para las tarjetas de practicantes
  const tarjetasPracticantes = document.querySelectorAll('.tarjeta-practicante');
  
  // Efecto hover para las tarjetas
  tarjetasPracticantes.forEach(tarjeta => {
    // Añadir efecto para mostrar el botón al hacer hover
    tarjeta.addEventListener('mouseenter', function() {
      const boton = this.querySelector('.practicante-contacto');
      boton.style.transform = 'translateY(0) scale(1.05)';
      
      // Añadir efecto a las demás tarjetas
      tarjetasPracticantes.forEach(otraTarjeta => {
        if (otraTarjeta !== tarjeta) {
          otraTarjeta.style.opacity = '0.7';
        }
      });
    });
    
    tarjeta.addEventListener('mouseleave', function() {
      const boton = this.querySelector('.practicante-contacto');
      boton.style.transform = '';
      
      // Restaurar opacidad de las demás tarjetas
      tarjetasPracticantes.forEach(otraTarjeta => {
        otraTarjeta.style.opacity = '1';
      });
    });
  });
  
  // Detectar cuando la sección de practicantes es visible
  window.addEventListener('scroll', function() {
    const practicantesSeccion = document.querySelector('.practicantes-seccion');
    if (practicantesSeccion && isElementInViewport(practicantesSeccion)) {
      practicantesSeccion.classList.add('visible');
    }
  });
  
  // Función auxiliar para detectar si un elemento está en el viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  console.log('Team component initialized');
}

// Exportar la función de inicialización
window.initTeam = initTeam; 