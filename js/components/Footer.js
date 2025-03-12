// Inicialización del componente Footer
function initFooter() {
    console.log("Componente Footer inicializado");
    
    // Configurar el botón de volver arriba
    const botonVolverArriba = document.querySelector('.boton-volver-arriba');
    if (botonVolverArriba) {
        // Inicialmente ocultar el botón
        botonVolverArriba.style.opacity = "0";
        botonVolverArriba.style.visibility = "hidden";
        
        // Mostrar/ocultar el botón según el scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                botonVolverArriba.style.opacity = "1";
                botonVolverArriba.style.visibility = "visible";
            } else {
                botonVolverArriba.style.opacity = "0";
                botonVolverArriba.style.visibility = "hidden";
            }
        });
        
        // Animación suave al hacer clic en el botón
        botonVolverArriba.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Animación suave de scroll
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Añadir efectos hover a los enlaces sociales
    const socialesBtn = document.querySelectorAll('.social-btn');
    socialesBtn.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.querySelector('i').classList.add('fa-bounce');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.querySelector('i').classList.remove('fa-bounce');
        });
    });
    
    // Actualizar el año de copyright
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} Blogfiction - Todos los derechos reservados`;
    }
}

// Llamar a la función init cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    initFooter();
}); 