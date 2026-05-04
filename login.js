// ── Wait for fonts + first paint, THEN trigger entrance ──
Promise.all([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  })
]).then(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Card slides in
      document.getElementById('card').classList.add('ready');

      // Stagger right-panel items
      const items = document.querySelectorAll('.ritem');
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 120 + i * 70);
      });

      // Initialize pill position
      updatePill();
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

// ── Update pill position ──
function updatePill() {
  const activeTab = document.querySelector('.tab.on');
  const pill = document.querySelector('.tab-pill');
  if (activeTab && pill) {
    const pill_left = activeTab.offsetLeft;
    const pill_width = activeTab.offsetWidth;
    pill.style.left = pill_left + 'px';
    pill.style.width = pill_width + 'px';
  }
}

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

    updatePill();

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
      strengthWrap.classList.add('visible');
      identifierInput.value = '';
      passwordInput.value = '';
      setStrength(0, '', '');
    } else {
      signupFields.classList.remove('visible');
      tileRow.classList.remove('expanded');
      card.classList.remove('expanded');
      strengthWrap.classList.remove('visible');
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
let leftRect = leftPanel.getBoundingClientRect();
let isTicking = false;
window.addEventListener('resize', () => {
  leftRect = leftPanel.getBoundingClientRect();
});
leftPanel.addEventListener('mousemove', (e) => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      const x = ((e.clientX - leftRect.left)  / leftRect.width  - .5) * 28;
      const y = ((e.clientY - leftRect.top)   / leftRect.height - .5) * 18;
      hero.style.cssText = `animation:none; transform:translate(${x}px,${y}px)`;
      isTicking = false;
    });
    isTicking = true;
  }
});
leftPanel.addEventListener('mouseleave', () => {
  hero.style.cssText = '';
});

// ── Password visibility toggle ──
const pwToggle = document.getElementById('pw-toggle');
pwToggle.addEventListener('click', () => {
  const isVisible = passwordInput.type === 'text';
  passwordInput.type = isVisible ? 'password' : 'text';
  pwToggle.classList.toggle('visible', !isVisible);
  pwToggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
});
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
