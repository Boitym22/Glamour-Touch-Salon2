
  // BOOKING AND CONTACT FORM SUBMISSION
  ['booking-form', 'contact-form'].forEach((id) => {
    const form = document.getElementById(id);

    if (!form) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const feedback = form.querySelector('.form-feedback');

      if (!form.reportValidity()) return;

      if (
        id === 'booking-form' &&
        dateInput &&
        dateInput.value < localDate(new Date())
      ) {
        dateInput.setCustomValidity('Please choose today or a future date.');
        dateInput.reportValidity();
        dateInput.setCustomValidity('');

        if (feedback) {
          feedback.textContent = 'Please choose a valid appointment date.';
        }

        return;
      }

      if (!form.action || !form.action.startsWith('https://formspree.io/f/')) {
        if (feedback) {
          feedback.textContent = 'This form is not connected yet.';
        }
        return;
      }

      if (feedback) {
        feedback.textContent = 'Sending your request...';
      }

      const submitButton = form.querySelector('[type="submit"]');

      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          if (feedback) {
            feedback.textContent = id === 'booking-form'
              ? 'Thank you! Your booking request has been sent successfully. The salon will contact you to confirm availability.'
              : 'Thank you! Your message has been sent successfully.';
          }

          form.reset();

          if (id === 'booking-form' && dateInput) {
            dateInput.min = localDate(new Date());
          }
        } else {
          if (feedback) {
            feedback.textContent = 'Sorry, your request could not be sent. Please try again.';
          }
        }
      } catch (error) {
        if (feedback) {
          feedback.textContent = 'A connection problem occurred. Please check your internet and try again.';
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  });
