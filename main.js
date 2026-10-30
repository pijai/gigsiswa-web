// Sign-up form for the launch waitlist: POST /api/v1/waitlist on the GigSiswa API.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value) {
  return EMAIL.test(value.trim());
}

/** What to tell the visitor after the API answers (status 0 = the request never reached it). */
export function resultFor(status) {
  if (status === 202 || status === 200 || status === 201) return { ok: true };
  if (status === 400) return { ok: false, error: 'That email looks incomplete. Check it and try again.' };
  if (status === 429) return { ok: false, error: 'Too many tries from here. Wait a minute, then try again.' };
  return { ok: false, error: "We couldn't save your email just now. Check your connection and try again." };
}

export function doneMessage(audience, email) {
  return audience === 'BUSINESS'
    ? `We'll email ${email} when GigSiswa opens for businesses.`
    : `We'll email ${email} when GigSiswa launches. Get ready to cari gig!`;
}

function wire() {
  const form = document.getElementById('join-form');
  if (!form) return;
  // On localhost, post to a local API (`pnpm dev` in stugig-api) instead of the one in the meta tag.
  const api = location.hostname === 'localhost' ? 'http://localhost:3000' : (document.querySelector('meta[name="gigsiswa-api"]')?.content ?? '');
  const email = document.getElementById('email');
  const error = document.getElementById('join-error');
  const submit = document.getElementById('join-submit');
  const placeholders = { STUDENT: 'you@student.uitm.edu.my', BUSINESS: 'you@yourbusiness.com.my' };
  const audience = () => form.querySelector('input[name="audience"]:checked').value;
  const choose = (value) => {
    const radio = form.querySelector(`input[name="audience"][value="${value}"]`);
    if (radio) radio.checked = true;
    email.placeholder = placeholders[value];
  };

  form.querySelectorAll('input[name="audience"]').forEach((r) => r.addEventListener('change', () => choose(audience())));
  // The hero buttons jump to the form with the right audience picked.
  document.querySelectorAll('a[data-audience]').forEach((a) => a.addEventListener('click', () => choose(a.dataset.audience)));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const value = email.value.trim();
    if (!isEmail(value)) {
      error.textContent = resultFor(400).error;
      email.focus();
      return;
    }
    error.textContent = '';
    submit.disabled = true;
    let status = 0;
    try {
      const res = await fetch(`${api}/api/v1/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, audience: audience(), source: 'landing', website: document.getElementById('website').value }),
      });
      status = res.status;
    } catch {
      status = 0;
    }
    submit.disabled = false;
    const result = resultFor(status);
    if (!result.ok) {
      error.textContent = result.error;
      return;
    }
    document.getElementById('done-msg').textContent = doneMessage(audience(), value);
    document.getElementById('join-fields').hidden = true;
    const done = document.getElementById('join-done');
    done.hidden = false;
    done.focus();
  });
}

if (typeof document !== 'undefined') wire();
