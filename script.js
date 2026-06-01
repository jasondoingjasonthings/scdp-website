// Cookie Easter egg — second visit swaps the hero headline
(function () {
  var VISITED_KEY = 'scdp_visited';
  var headline = document.getElementById('hero-headline');
  if (!headline) return;

  if (localStorage.getItem(VISITED_KEY)) {
    headline.innerHTML = 'You came back.<br>That\'s exactly the kind of person Jason wants to work with.';
  } else {
    localStorage.setItem(VISITED_KEY, '1');
  }
})();

// Reel modal
var reelBtn = document.getElementById('reel-btn');
var modal = document.getElementById('reel-modal');
var modalClose = document.getElementById('modal-close');
var modalOverlay = document.getElementById('modal-overlay');
var modalContactLink = document.getElementById('modal-contact-link');

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  reelBtn.focus();
}

if (reelBtn && modal) {
  reelBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  if (modalContactLink) {
    modalContactLink.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

// Contact form — Formspree AJAX
var form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('.btn-submit');
    var originalText = btn.textContent;
    btn.textContent = 'Submitting…';
    btn.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.innerHTML =
            '<p style="font-size:0.875rem;color:#C8B89A;line-height:1.8;padding:0.5rem 0;">' +
            'Your enquiry has been received. We endeavour to respond within 5–7 business days. ' +
            'Senior leadership involvement is not guaranteed at initial scoping stage.' +
            '</p>';
        } else {
          btn.textContent = originalText;
          btn.disabled = false;
          showFormError();
        }
      })
      .catch(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        showFormError();
      });
  });
}

function showFormError() {
  var existing = form.querySelector('.form-error');
  if (existing) return;
  var err = document.createElement('p');
  err.className = 'form-error';
  err.style.cssText = 'font-size:0.75rem;color:#888;margin-top:0.75rem;';
  err.textContent = 'Something went wrong. Please try again or email us directly.';
  form.appendChild(err);
}

// Smooth scroll for nav anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
