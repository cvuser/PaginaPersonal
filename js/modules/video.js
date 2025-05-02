export function initVideoPlayer() {
    const video = document.getElementById('sports-video');
    if (!video) return;
  
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
  
    // Play/Pause
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.textContent = '❚❚';
      } else {
        video.pause();
        playBtn.textContent = '▶';
      }
    });
  
    // Actualizar barra de progreso
    video.addEventListener('timeupdate', () => {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.value = percent;
    });
  
    // Saltar a posición al hacer clic en la barra
    progressBar.addEventListener('click', (e) => {
      const pos = (e.offsetX / progressBar.offsetWidth) * video.duration;
      video.currentTime = pos;
    });
  
    // Pantalla completa
    fullscreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    });
  
    // Cambiar icono al finalizar video
    video.addEventListener('ended', () => {
      playBtn.textContent = '▶';
    });
  }