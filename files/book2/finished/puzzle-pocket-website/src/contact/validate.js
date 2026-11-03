// Checks what a visitor typed into the contact form.
// This file knows nothing about the page, so it can be tested on its own.
// The messages match content/site-text.md word for word.

export const MESSAGE_LIMIT = 2000;

export const MESSAGES = {
  emailMissing: 'Enter your email address, so we can reply.',
  emailFormat: 'Enter an email address in the correct format, like name@example.com.',
  messageMissing: 'Enter a message, up to 2,000 characters.',
  messageTooLong: 'Shorten your message to 2,000 characters or fewer.',
};

// Something, then @, then something with a dot in it, and no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns { errors, isSpam }.
// errors is a list of { field, message }, in the same order as the form.
// isSpam is true when the hidden honeypot field has been filled in.
export function validateContact({ email = '', message = '', botField = '' }) {
  const errors = [];
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedEmail === '') {
    errors.push({ field: 'email', message: MESSAGES.emailMissing });
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.push({ field: 'email', message: MESSAGES.emailFormat });
  }

  if (trimmedMessage === '') {
    errors.push({ field: 'message', message: MESSAGES.messageMissing });
  } else if (message.length > MESSAGE_LIMIT) {
    errors.push({ field: 'message', message: MESSAGES.messageTooLong });
  }

  return { errors, isSpam: botField.trim() !== '' };
}
