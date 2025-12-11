/**
 * Componente: Background Music (Música de Fondo)
 * Maneja la reproducción de música de fondo con controles de volumen
 */

function initBackgroundMusic() {
  const audio = document.getElementById('background-music');
  const toggleBtn = document.getElementById('music-toggle-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const musicIcon = document.getElementById('music-icon');
  
  if (!audio || !toggleBtn) {
    console.warn('Elementos de música de fondo no encontrados');
    return;
  }

  // Configurar volumen inicial
  audio.volume = volumeSlider ? volumeSlider.value / 100 : 0.5;

  // Estado de la música
  let isPlaying = false;
  let userInteracted = false;

  // Función para reproducir música
  function playMusic() {
    if (!userInteracted) {
      // Los navegadores requieren interacción del usuario para reproducir audio
      return;
    }
    
    audio.play()
      .then(() => {
        isPlaying = true;
        musicIcon.className = 'fa fa-pause';
        toggleBtn.classList.add('playing');
        // Guardar preferencia en localStorage
        localStorage.setItem('musicEnabled', 'true');
      })
      .catch(error => {
        console.warn('Error al reproducir música:', error);
        isPlaying = false;
      });
  }

  // Función para pausar música
  function pauseMusic() {
    audio.pause();
    isPlaying = false;
    musicIcon.className = 'fa fa-music';
    toggleBtn.classList.remove('playing');
    localStorage.setItem('musicEnabled', 'false');
  }

  // Toggle play/pause
  toggleBtn.addEventListener('click', function() {
    userInteracted = true;
    
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  // Control de volumen
  if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
      const volume = this.value / 100;
      audio.volume = volume;
      localStorage.setItem('musicVolume', volume.toString());
      
      // Actualizar icono según el volumen
      const volumeIcons = document.querySelectorAll('.volume-icon');
      volumeIcons.forEach(icon => {
        if (volume === 0) {
          icon.className = 'fa fa-volume-off volume-icon';
        } else if (volume < 0.5) {
          icon.className = 'fa fa-volume-down volume-icon';
        } else {
          icon.className = 'fa fa-volume-up volume-icon';
        }
      });
    });
  }

  // Cargar preferencias guardadas
  const savedMusicEnabled = localStorage.getItem('musicEnabled');
  const savedVolume = localStorage.getItem('musicVolume');
  
  if (savedVolume) {
    const volume = parseFloat(savedVolume);
    audio.volume = volume;
    if (volumeSlider) {
      volumeSlider.value = volume * 100;
    }
  }

  // Intentar reproducir automáticamente si el usuario lo había habilitado antes
  // Pero solo después de una interacción del usuario
  document.addEventListener('click', function enableMusic() {
    userInteracted = true;
    
    if (savedMusicEnabled === 'true' && !isPlaying) {
      playMusic();
    }
    
    // Remover el listener después de la primera interacción
    document.removeEventListener('click', enableMusic);
  }, { once: true });

  // Manejar cuando el audio termina (aunque está en loop, por si acaso)
  audio.addEventListener('ended', function() {
    if (audio.loop) {
      audio.currentTime = 0;
      audio.play();
    }
  });

  // Manejar errores de carga
  audio.addEventListener('error', function(e) {
    console.warn('Error al cargar el archivo de música:', e);
    toggleBtn.style.opacity = '0.5';
    toggleBtn.disabled = true;
    toggleBtn.title = 'Archivo de música no encontrado';
  });

  // Actualizar icono de volumen inicial
  if (volumeSlider) {
    const volume = audio.volume;
    const volumeIcons = document.querySelectorAll('.volume-icon');
    volumeIcons.forEach(icon => {
      if (volume === 0) {
        icon.className = 'fa fa-volume-off volume-icon';
      } else if (volume < 0.5) {
        icon.className = 'fa fa-volume-down volume-icon';
      } else {
        icon.className = 'fa fa-volume-up volume-icon';
      }
    });
  }

  console.log('Background Music component initialized');
}

// Exportar la función de inicialización
window.initBackgroundMusic = initBackgroundMusic;

