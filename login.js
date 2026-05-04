// ── Wait for fonts + first paint, THEN trigger entrance ──
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Card slides in
      document.getElementById('card').classList.add('ready');

      // Stagger right-panel items
      const items = document.querySelectorAll('.ritem');
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 120 + i * 70);
      });
    });
  });
});

// ── Refs ──
const tabs            = document.querySelectorAll('.tab');
const tabsWrap        = document.getElementById('tabs-wrap');
const signupFields    = document.getElementById('signup-fields');
const heading         = document.getElementById('form-heading');
const sub             = document.getElementById('form-sub');
const btn             = document.getElementById('form-btn');
const identifierLabel = document.getElementById('identifier-label');
const identifierInput = document.getElementById('identifier-input');
const tileRow         = document.getElementById('tile-row');
const card            = document.getElementById('card');
const passwordInput   = document.getElementById('password-input');
const strengthBar     = document.getElementById('strength-bar');
const strengthText    = document.getElementById('strength-text');
const strengthWrap    = document.getElementById('strength-wrap');
const hero            = document.getElementById('hero');
const leftPanel       = document.getElementById('left-panel');

const states = {
  signin: {
    heading              : 'Welcome <span>Back.</span>',
    sub                  : 'Sign in to continue your journey',
    btn                  : 'Enter →',
    identifierLabel      : 'Email, phone or username',
    identifierPlaceholder: 'Enter your email, phone or username',
    identifierType       : 'text',
  },
  signup: {
    heading              : 'Create <span>Account.</span>',
    sub                  : 'Start your wellness journey today',
    btn                  : 'Join Now →',
    identifierLabel      : 'Email',
    identifierPlaceholder: 'you@lifeplus.com',
    identifierType       : 'email',
  },
};

// ── Tab switching ──
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const mode     = tab.dataset.tab;
    const isSignup = mode === 'signup';

    tabs.forEach(t => {
      t.classList.toggle('on',  t.dataset.tab === mode);
      t.classList.toggle('off', t.dataset.tab !== mode);
      t.setAttribute('aria-pressed', String(t.dataset.tab === mode));
    });

    tabsWrap.dataset.active = mode;

    const s = states[mode];
    heading.innerHTML                         = s.heading;
    sub.textContent                           = s.sub;
    btn.textContent                           = s.btn;
    identifierLabel.childNodes[0].textContent = s.identifierLabel;
    identifierInput.placeholder               = s.identifierPlaceholder;
    identifierInput.type                      = s.identifierType;

    if (isSignup) {
      signupFields.classList.add('visible');
      tileRow.classList.add('expanded');
      card.classList.add('expanded');
      strengthWrap.style.display = 'block';
      identifierInput.value = '';
      passwordInput.value = '';
      setStrength(0, '', '');
    } else {
      signupFields.classList.remove('visible');
      tileRow.classList.remove('expanded');
      card.classList.remove('expanded');
      strengthWrap.style.display = 'none';
      passwordInput.value = '';
      document.getElementById('username-input').value = '';
      document.getElementById('phone-input').value = '';
      setStrength(0, '', '');
    }
  });
});

// ── CTA button — same press style as social buttons ──
btn.addEventListener('mousedown', () => btn.classList.add('pressed'));
btn.addEventListener('mouseup',   () => btn.classList.remove('pressed'));
btn.addEventListener('mouseleave',() => btn.classList.remove('pressed'));

// ── Social buttons — subtle press ──
document.querySelectorAll('.sb').forEach(sb => {
  sb.addEventListener('mousedown', () => sb.classList.add('pressed'));
  sb.addEventListener('mouseup',   () => sb.classList.remove('pressed'));
  sb.addEventListener('mouseleave',() => sb.classList.remove('pressed'));
});

// ── Hero parallax — stronger follow ──
leftPanel.addEventListener('mousemove', (e) => {
  const rect = leftPanel.getBoundingClientRect();
  const x = ((e.clientX - rect.left)  / rect.width  - .5) * 28;
  const y = ((e.clientY - rect.top)   / rect.height - .5) * 18;
  hero.style.cssText = `animation:none; transform:translate(${x}px,${y}px)`;
});
leftPanel.addEventListener('mouseleave', () => {
  hero.style.cssText = '';
});

// ── Password strength ──
function setStrength(pct, label, color) {
  strengthBar.style.width      = pct + '%';
  strengthBar.style.background = color;
  strengthBar.setAttribute('aria-valuenow', pct);
  strengthText.textContent     = label;
  strengthText.style.color     = color;
}
function scorePassword(pw) {
  if (!pw) return setStrength(0, '', '');
  let score = 0;
  if (pw.length >= 8)           score++;
  if (pw.length >= 12)          score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return setStrength(25,  'Weak',   '#ED6A5A');
  if (score === 2) return setStrength(50,  'Fair',   '#F4B942');
  if (score === 3) return setStrength(75,  'Good',   '#9BC1BC');
  return setStrength(100, 'Strong', '#5DB87A');
}
passwordInput.addEventListener('input', () => {
  if (card.classList.contains('expanded')) scorePassword(passwordInput.value);
});
