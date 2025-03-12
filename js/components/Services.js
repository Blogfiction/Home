// Inicialización del componente Services
function initServices() {
    console.log("Componente Services inicializado");
    
    // Añadir efectos de hover a las tarjetas de servicios
    const serviciosCards = document.querySelectorAll("#pricing .w3-ul");
    serviciosCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            // Añadir clase para efecto de brillo
            this.classList.add("servicios-hover");
        });
        
        card.addEventListener("mouseleave", function() {
            // Remover clase al salir
            this.classList.remove("servicios-hover");
        });
    });

    // Configurar botones de suscripción
    const botonesSuscripcion = document.querySelectorAll("#pricing .w3-button");
    botonesSuscripcion.forEach(boton => {
        boton.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de confirmación
            const plan = this.closest('.w3-ul').querySelector('.w3-wide').textContent;
            alert(`¡Gracias por interesarte en nuestro ${plan}! Te contactaremos pronto.`);
            
            // Aquí se podría agregar lógica adicional como abrir un formulario modal
        });
    });
    
    // Añadir efecto de resaltado al scroll
    window.addEventListener('scroll', function() {
        const pricingSection = document.getElementById('pricing');
        if (isElementInViewport(pricingSection)) {
            serviciosCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('servicios-visible');
                }, 200 * index);
            });
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
}

// Llamar a la función init cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    initServices();
}); 