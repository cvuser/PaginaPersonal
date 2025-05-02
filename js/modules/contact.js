export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Simular envío del formulario
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mostrar mensaje de éxito
        showAlert('¡Mensaje enviado con éxito! Pronto me pondré en contacto contigo.', 'success');
        contactForm.reset();
      } catch (error) {
        showAlert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.', 'error');
        console.error('Error submitting form:', error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
  
  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Estilos para la alerta
    const style = document.createElement('style');
    style.textContent = `
      .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--card-shadow);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
      }
      .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }
      .alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alertDiv);
    
    // Eliminar la alerta después de 5 segundos
    setTimeout(() => {
      alertDiv.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
  }