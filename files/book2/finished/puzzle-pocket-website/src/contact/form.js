// The contact form on the Contact page.
// Checks the form when Send is pressed, shows any problems, and sends the
// message to Netlify Forms. Messages can only be sent from the published site.

import { validateContact } from './validate.js';

const form = document.querySelector('[data-contact-form]');

if (form) {
  const summary = form.querySelector('[data-error-summary]');
  const summaryList = form.querySelector('[data-error-list]');
  const sendButton = form.querySelector('[data-send]');
  const sentNotice = document.querySelector('[data-sent]');
  const failedNotice = document.querySelector('[data-send-failed]');

  // The form checks itself when Send is pressed, so turn off the browser's checks.
  form.noValidate = true;

  function clearErrors() {
    summary.hidden = true;
    summaryList.replaceChildren();
    for (const field of ['email', 'message']) {
      const input = form.elements[field];
      const error = form.querySelector(`#${field}-error`);
      error.hidden = true;
      error.textContent = '';
      input.removeAttribute('aria-invalid');
      const hint = field === 'message' ? 'message-hint' : '';
      if (hint) input.setAttribute('aria-describedby', hint);
      else input.removeAttribute('aria-describedby');
    }
  }

  function showErrors(errors) {
    for (const { field, message } of errors) {
      const input = form.elements[field];
      const error = form.querySelector(`#${field}-error`);

      // The message next to the field.
      error.innerHTML = '<span class="visually-hidden">Error: </span>';
      error.append(message);
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      const hint = field === 'message' ? 'message-hint ' : '';
      input.setAttribute('aria-describedby', `${hint}${field}-error`);

      // The same message in the summary, as a link to the field.
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field}`;
      link.textContent = message;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        input.focus();
      });
      item.append(link);
      summaryList.append(item);
    }

    summary.hidden = false;
    summary.focus();
  }

  function showNotice(notice) {
    sentNotice.hidden = notice !== sentNotice;
    failedNotice.hidden = notice !== failedNotice;
    notice.focus();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors();
    sentNotice.hidden = true;
    failedNotice.hidden = true;

    const { errors, isSpam } = validateContact({
      email: form.elements.email.value,
      message: form.elements.message.value,
      botField: form.elements['bot-field'].value,
    });

    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    // Spam programs fill in the hidden field. Pretend to send, but don't.
    if (isSpam) {
      form.reset();
      showNotice(sentNotice);
      return;
    }

    sendButton.disabled = true;
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) throw new Error(`The form service replied ${response.status}.`);
      form.reset();
      showNotice(sentNotice);
    } catch {
      // Keep everything the visitor typed, so they can try again.
      showNotice(failedNotice);
    } finally {
      sendButton.disabled = false;
    }
  });
}
