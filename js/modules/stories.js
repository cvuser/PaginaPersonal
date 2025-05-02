const stories = [
    "Una vez soñé que programaba un algoritmo que escribía poesía solo con variables. Las rimas eran funciones recursivas y los versos, promesas que siempre se resolvían en metáforas.",
    "Descubrí que podía controlar luces LED solo con mi voz y un Arduino hecho en casa. Mi primer comando fue 'Hágase la luz', y desde entonces supe que la tecnología era mi vocación.",
    "Un día mi página personal se convirtió en viral por un efecto que creé con solo 3 líneas de CSS. Los diseñadores me buscaban para preguntarme cómo lo había logrado.",
    "Una IA me escribió un poema sobre código y café, y desde entonces lo uso como mantra: 'While coffee { code: true }'. El arte y la tecnología son mis pasiones inseparables.",
    "En mi primer hackathon creé una app que traducía el llanto de los bebés. No gané, pero aprendí que incluso los fracasos pueden ser el mejor código comentado de nuestra vida.",
    "Me dicen el 'poeta de los bits' porque escribo haikus en formato JSON. Mis favoritos siempre terminan con un punto y coma elegante."
  ];
  
  export function initStoryGenerator() {
    const storyBtn = document.getElementById('generate-story');
    const storyOutput = document.getElementById('story');
    
    if (!storyBtn || !storyOutput) return;
    
    storyBtn.addEventListener('click', () => {
      generateStory(storyOutput);
    });
    
    // Generar una historia al cargar la página
    generateStory(storyOutput);
  }
  
  function generateStory(outputElement) {
    const index = Math.floor(Math.random() * stories.length);
    outputElement.textContent = stories[index];
    outputElement.classList.add('animate');
    
    setTimeout(() => {
      outputElement.classList.remove('animate');
    }, 1000);
  }