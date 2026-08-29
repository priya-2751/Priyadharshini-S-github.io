// ---------- Mobile nav toggle ----------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ---------- Contact form validation ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const nameField = document.getElementById('cf-name');
  const emailField = document.getElementById('cf-email');
  const messageField = document.getElementById('cf-message');
  const statusEl = document.getElementById('formStatus');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    const wrapper = field.closest('.field');
    const errorEl = wrapper.querySelector('.error');
    wrapper.classList.toggle('has-error', Boolean(message));
    errorEl.textContent = message || '';
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!nameField.value.trim()) {
      setError(nameField, 'Please enter your name.');
      valid = false;
    } else {
      setError(nameField, '');
    }

    if (!emailField.value.trim()) {
      setError(emailField, 'Please enter your email.');
      valid = false;
    } else if (!emailPattern.test(emailField.value.trim())) {
      setError(emailField, 'Please enter a valid email address.');
      valid = false;
    } else {
      setError(emailField, '');
    }

    if (!messageField.value.trim()) {
      setError(messageField, 'Please add a short message.');
      valid = false;
    } else {
      setError(messageField, '');
    }

    if (!valid) {
      statusEl.textContent = '';
      return;
    }

    // NOTE: This form has no backend attached yet.
    // Replace this block with a real submission (e.g. Formspree, EmailJS,
    // or your own API endpoint) when you're ready to receive messages.
    const subject = encodeURIComponent(`Portfolio message from ${nameField.value.trim()}`);
    const body = encodeURIComponent(`${messageField.value.trim()}\n\n— ${nameField.value.trim()} (${emailField.value.trim()})`);
    window.location.href = `mailto:priyadharshini8070@gmail.com?subject=${subject}&body=${body}`;

    statusEl.textContent = 'Opening your email app to send this message…';
    statusEl.classList.add('success');
    contactForm.reset();
  });
}