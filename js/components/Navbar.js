/**
 * Componente: Navbar (Barra de navegación)
 */

function initNavbar() {
  function handleScroll() {
    const navbar = document.querySelector('.w3-bar.w3-theme-d2');
    if (!navbar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.25)";
      navbar.style.height = "56px";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.backgroundColor = "rgba(126, 63, 242, 0.95)";
    } else {
      navbar.style.boxShadow = "0 6px 0 rgba(0, 0, 0, 0.3)";
      navbar.style.height = "60px";
      navbar.style.backdropFilter = "blur(0px)";
      navbar.style.backgroundColor = "";
    }
  }

  function setupActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    if (navLinks.length === 0) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      link.classList.remove('active-link');
      const page = link.getAttribute('data-page');
      if (page === currentPage) {
        link.classList.add('active-link');
      }
    });
  }

  const navLinks = document.querySelectorAll('.w3-bar-item.w3-button');
  navLinks.forEach(link => {
    link.addEventListener('mousedown', function() {
      this.style.transform = 'translate(2px, 2px)';
    });

    link.addEventListener('mouseup', function() {
      this.style.transform = '';
    });

    link.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  function animateSocialIcons() {
    const socialIcons = document.querySelectorAll('.nav-social-icon');

    socialIcons.forEach((icon, index) => {
      icon.style.opacity = "0";
      icon.style.transform = "translateY(10px)";

      setTimeout(() => {
        icon.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        icon.style.opacity = "1";
        icon.style.transform = "translateY(0)";
      }, 300 + (index * 100));
    });
  }

  const socialIcons = document.querySelectorAll('.nav-social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.9)';
      this.style.boxShadow = '1px 1px 0 rgba(0, 0, 0, 0.25)';
    });

    icon.addEventListener('mouseup', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });

    icon.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  window.addEventListener('scroll', handleScroll);
  setupActiveNavLink();
  animateSocialIcons();

  console.log('Navbar component initialized');
}

window.initNavbar = initNavbar;
