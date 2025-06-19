document.addEventListener("DOMContentLoaded", () => {
  const curiosities = [
    "🎮 Me encanta jugar a videojuegos donde sea importante el factor estratégico.",
    "⚽ He sido capitán de mi equipo de fútbol 7 durante esta temporada.",
    "💡 Soy curioso con los proyectos antiguos, para entender el funcionamiento de años anteriores.",
    "📚 Siempre me quedo enganchado viendo películas de ciencia ficción.",
    "🎧 Escucho música lo-fi cuando trabajo para concentrarme mejor.",
    "🧩 Siempre intento ver las películas en VOSE."
  ];

  const box = document.getElementById("curiosity-box");
  const btn = document.getElementById("curiosity-btn");
  let lastIndex = -1;

  btn.addEventListener("click", () => {
    let index;
    do {
      index = Math.floor(Math.random() * curiosities.length);
    } while (index === lastIndex);
    lastIndex = index;
    box.textContent = curiosities[index];
    box.style.boxShadow = "0 4px 16px rgba(44,62,80,0.12)";
  });

  // Año actual en footer
  document.getElementById("current-year").textContent = new Date().getFullYear();
});
