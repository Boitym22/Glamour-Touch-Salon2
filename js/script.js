// Navigation and demonstration form validation for the Part 2 improvements.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-navigation');
  if (toggle && navigation) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      navigation.classList.toggle('is-open', !expanded);
    });
  }

  const dateInput = document.querySelector('#date');
  const localDate = (date) => [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
  if (dateInput) dateInput.min = localDate(new Date());

  for (const id of ['booking-form', 'contact-form']) {
    const form = document.getElementById(id);
    if (!form) continue;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      if (dateInput && id === 'booking-form' && dateInput.value < localDate(new Date())) {
        dateInput.setCustomValidity('Please choose today or a future date.');
        dateInput.reportValidity();
        dateInput.setCustomValidity('');
        feedback.textContent = 'Please choose a valid appointment date.';
        return;
      }
      if (!form.reportValidity()) return;
      feedback.textContent = id === 'booking-form'
        ? 'Your request passed validation. This is a demonstration form; no booking has been sent to the salon.'
        : 'Your message passed validation. This is a demonstration form; no message has been sent.';
    });
  }
});
