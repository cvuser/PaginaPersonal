document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Mostrar notificación tipo toast
  const toast = document.getElementById("toast");
  toast.classList.remove("hidden");
  toast.classList.add("show");

  // Ocultar después de 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);

  // Resetear el formulario
  this.reset();
});
