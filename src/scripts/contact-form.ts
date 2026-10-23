/**
 * Tiny EmailJS REST sender for /contact/ only.
 * No @emailjs/browser SDK — plain fetch to keep mobile JS budget low.
 */
const API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const THROTTLE_MS = 60_000;
const THROTTLE_KEY = 'yc_contact_last_send';
const MESSAGE_MAX = 3000;

function setStatus(
  el: HTMLElement | null,
  text: string,
  tone: 'ok' | 'err' | '',
): void {
  if (!el) return;
  el.textContent = text;
  if (tone) el.setAttribute('data-tone', tone);
  else el.removeAttribute('data-tone');
  el.hidden = !text;
}

function throttleRemaining(): number {
  try {
    const raw = localStorage.getItem(THROTTLE_KEY);
    if (!raw) return 0;
    const last = Number(raw);
    if (!Number.isFinite(last)) return 0;
    return Math.max(0, THROTTLE_MS - (Date.now() - last));
  } catch {
    return 0;
  }
}

function markSent(): void {
  try {
    localStorage.setItem(THROTTLE_KEY, String(Date.now()));
  } catch {
    /* private mode / blocked storage — ignore */
  }
}

function init(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) return;

  const serviceId = form.dataset.serviceId || '';
  const templateId = form.dataset.templateId || '';
  const publicKey = form.dataset.publicKey || '';
  const siteName = form.dataset.siteName || 'YardCalc';
  if (!serviceId || !templateId || !publicKey) return;

  const status = form.querySelector('#contact-form-status') as HTMLElement | null;
  const submitBtn = form.querySelector(
    'button[type="submit"]',
  ) as HTMLButtonElement | null;
  const messageField = form.querySelector(
    '#contact-message',
  ) as HTMLTextAreaElement | null;
  if (messageField) {
    messageField.maxLength = MESSAGE_MAX;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus(status, '', '');

    const honeypot = (
      form.querySelector('#contact-company') as HTMLInputElement | null
    )?.value?.trim();
    if (honeypot) {
      // Silent reject for bots that fill hidden fields.
      setStatus(status, 'Thanks — your message was received.', 'ok');
      form.reset();
      return;
    }

    const wait = throttleRemaining();
    if (wait > 0) {
      const secs = Math.ceil(wait / 1000);
      setStatus(
        status,
        `Please wait ${secs}s before sending another message.`,
        'err',
      );
      return;
    }

    if (!form.reportValidity()) return;

    const fromName = (
      form.querySelector('#contact-name') as HTMLInputElement
    ).value.trim();
    const replyTo = (
      form.querySelector('#contact-email') as HTMLInputElement
    ).value.trim();
    const message = (
      form.querySelector('#contact-message') as HTMLTextAreaElement
    ).value.trim();

    if (message.length > MESSAGE_MAX) {
      setStatus(
        status,
        `Message is too long (max ${MESSAGE_MAX} characters).`,
        'err',
      );
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
    }
    setStatus(status, 'Sending…', '');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: fromName,
            reply_to: replyTo,
            message,
            page_url: location.href,
            site_name: siteName,
          },
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(body || `HTTP ${res.status}`);
      }

      markSent();
      form.reset();
      setStatus(
        status,
        'Message sent. Thanks — we will reply when we can.',
        'ok',
      );
    } catch {
      setStatus(
        status,
        'Could not send right now. Please try again later or use the email link below.',
        'err',
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
