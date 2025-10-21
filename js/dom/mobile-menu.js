/**
 * Mobile Menu Handler
 * Maneja la funcionalidad del menú hamburguesa en dispositivos móviles
 */

(function() {
  'use strict';

  // Esperar a que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
  });

  function initMobileMenu() {
    const aside = document.querySelector('aside');
    const header = document.querySelector('header nav');
    const body = document.body;
    
    if (!aside || !header) {
      console.warn('No se encontraron elementos aside o header');
      return;
    }

    // Verificar si estamos en vista móvil
    function isMobileView() {
      return window.innerWidth <= 768;
    }

    // Toggle del menú móvil
    function toggleMobileMenu() {
      if (!isMobileView()) return;
      
      aside.classList.toggle('mobile-menu-open');
      body.classList.toggle('menu-open');
    }

    // Cerrar menú móvil
    function closeMobileMenu() {
      aside.classList.remove('mobile-menu-open');
      body.classList.remove('menu-open');
    }

    // Agregar evento click al botón hamburguesa (::before del header nav)
    header.addEventListener('click', function(e) {
      // Verificar si el click fue en la parte del pseudo-elemento hamburguesa
      const rect = header.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      
      // El botón hamburguesa está en los primeros ~50px del header en móvil
      if (isMobileView() && clickX < 60) {
        toggleMobileMenu();
        e.stopPropagation();
      }
    });

    // Cerrar menú al hacer click en el overlay
    body.addEventListener('click', function(e) {
      if (body.classList.contains('menu-open') && !aside.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Cerrar menú al hacer click en un enlace del menú
    const menuLinks = aside.querySelectorAll('a.nav-link, a.nav-sublink');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (isMobileView()) {
          closeMobileMenu();
        }
      });
    });

    // Cerrar menú al cambiar de tamaño de ventana si ya no es móvil
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (!isMobileView()) {
          closeMobileMenu();
        }
      }, 250);
    });

    // Prevenir scroll del body cuando el menú está abierto
    aside.addEventListener('touchmove', function(e) {
      if (body.classList.contains('menu-open')) {
        e.stopPropagation();
      }
    }, { passive: false });
  }
})();

