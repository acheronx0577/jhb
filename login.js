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
      document.getElementById('card').classList.add('ready');

      const items = document.querySelectorAll('.ritem');
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 120 + i * 70);
      });

      updatePill();

      // Sign-in is the default tab — expand the identifier field immediately
      document.getElementById('identifier-step-wrap').classList.add('identifier-expanded');
    });
  });
});

// ── Refs ──
const tabs             = document.querySelectorAll('.tab');
const tabsWrap         = document.getElementById('tabs-wrap');
const signupFields     = document.getElementById('signup-fields');
const heading          = document.getElementById('form-heading');
const sub              = document.getElementById('form-sub');
const btn              = document.getElementById('form-btn');
const identifierLabel  = document.getElementById('identifier-label');
const identifierInput  = document.getElementById('identifier-input');
const identifierWrap   = document.getElementById('identifier-step-wrap');
const identifierLocked = document.getElementById('identifier-locked');
const identifierLockedValue = document.getElementById('identifier-locked-value');
const identifierEdit   = document.getElementById('identifier-edit');
const tileRow          = document.getElementById('tile-row');
const card             = document.getElementById('card');
const passwordInput    = document.getElementById('password-input');
const passwordStep     = document.getElementById('password-step');
const strengthBar      = document.getElementById('strength-bar');
const strengthText     = document.getElementById('strength-text');
const strengthWrap     = document.getElementById('strength-wrap');
const hero             = document.getElementById('hero');
const leftPanel        = document.getElementById('left-panel');
const forgotWrap       = document.getElementById('forgot-wrap');

// ── Step state ──
let step = 'identifier';

const states = {
  signin: {
    heading              : 'Welcome <span>Back.</span>',
    sub                  : 'Sign in to continue your journey',
    btn_step1            : 'Continue \u2192',
    btn_step2            : 'Enter \u2192',
    identifierLabel      : 'Email, phone or username',
    identifierPlaceholder: 'Enter your email, phone or username',
    identifierType       : 'text',
  },
  signup: {
    heading              : 'Create <span>Account.</span>',
    sub                  : 'Start your wellness journey today',
    btn_step1            : 'Continue \u2192',
    btn_step2            : 'Join Now \u2192',
    identifierLabel      : 'Email',
    identifierPlaceholder: 'you@lifeplus.com',
    identifierType       : 'email',
  },
};

let currentMode = 'signin';

// ── Saved sign-in state (persists across tab switches) ──
let savedSignin = { identifier: '', step: 'identifier' };

// ── Update pill position ──
function updatePill() {
  const activeTab = document.querySelector('.tab.on');
  const pill = document.querySelector('.tab-pill');
  if (activeTab && pill) {
    pill.style.left  = activeTab.offsetLeft + 'px';
    pill.style.width = activeTab.offsetWidth + 'px';
  }
}

// ── Shake animation for empty field ──
function shakeField(input) {
  const frames = [0, -6, 6, -4, 4, -2, 2, 0];
  let i = 0;
  const shake = () => {
    if (i < frames.length) {
      input.style.transform = 'translateX(' + frames[i] + 'px)';
      i++;
      setTimeout(shake, 50);
    } else {
      input.style.transform = '';
    }
  };
  shake();
}

// ── Go to step 1 (identifier) ──
function goToStep1() {
  step = 'identifier';

  identifierWrap.classList.remove('identifier-locked');
  identifierInput.value = '';
  identifierLockedValue.textContent = '';

  passwordInput.value = '';
  setStrength(0, '', '');

  if (currentMode === 'signup') {
    // Signup: always show password, no two-step flow
    passwordStep.classList.add('visible');
    strengthWrap.classList.add('visible');
    step = 'all'; // treat form as single step
    btn.textContent = states[currentMode].btn_step2;
    forgotWrap.classList.remove('visible');
    identifierWrap.classList.remove('identifier-expanded');
  } else {
    // Signin: hide password until step 2, expand identifier field
    passwordStep.classList.remove('visible');
    strengthWrap.classList.remove('visible');
    btn.textContent = states[currentMode].btn_step1;
    forgotWrap.classList.add('visible');
    identifierWrap.classList.add('identifier-expanded');
  }

  setTimeout(() => identifierInput.focus(), 50);
}

// ── Go to step 2 (password) ──
function goToStep2() {
  const val = identifierInput.value.trim();
  if (!val) {
    shakeField(identifierInput);
    identifierInput.focus();
    return;
  }

  step = 'password';

  identifierLockedValue.textContent = val;
  identifierWrap.classList.add('identifier-locked');
  identifierWrap.classList.remove('identifier-expanded');

  passwordStep.classList.add('visible');

  if (currentMode === 'signup') {
    strengthWrap.classList.add('visible');
  }

  forgotWrap.classList.remove('visible');
  btn.textContent = states[currentMode].btn_step2;

  setTimeout(() => passwordInput.focus(), 460);
}

// ── Tab switching ──
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const mode     = tab.dataset.tab;
    const isSignup = mode === 'signup';

    // Save current sign-in state before leaving
    if (currentMode === 'signin' && mode === 'signup') {
      savedSignin.identifier = identifierInput.value || identifierLockedValue.textContent;
      savedSignin.step = step;
    }

    currentMode = mode;

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
    identifierLabel.childNodes[0].textContent = s.identifierLabel;
    identifierInput.placeholder               = s.identifierPlaceholder;
    identifierInput.type                      = s.identifierType;

    goToStep1();

    // Restore sign-in state when switching back
    if (!isSignup && savedSignin.identifier) {
      identifierInput.value = savedSignin.identifier;
      if (savedSignin.step === 'password') {
        goToStep2();
      }
    }

    if (isSignup) {
      signupFields.classList.add('visible');
      tileRow.classList.add('expanded');
      card.classList.add('expanded');
    } else {
      signupFields.classList.remove('visible');
      tileRow.classList.remove('expanded');
      card.classList.remove('expanded');
    }
  });
});

// ── Edit (pencil) button ──
identifierEdit.addEventListener('click', goToStep1);

// ── CTA button ──
btn.addEventListener('click', () => {
  if (step === 'identifier') {
    goToStep2();
  }
  // step === 'all' (signup) or step === 'password': real submit logic would go here
});

btn.addEventListener('mousedown', () => btn.classList.add('pressed'));
btn.addEventListener('mouseup',   () => btn.classList.remove('pressed'));
btn.addEventListener('mouseleave',() => btn.classList.remove('pressed'));

// ── Enter key on identifier ──
identifierInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') goToStep2();
});

// ── Social buttons ──
document.querySelectorAll('.sb').forEach(sb => {
  sb.addEventListener('mousedown', () => sb.classList.add('pressed'));
  sb.addEventListener('mouseup',   () => sb.classList.remove('pressed'));
  sb.addEventListener('mouseleave',() => sb.classList.remove('pressed'));
});

// ── Hero parallax ──
let leftRect = leftPanel.getBoundingClientRect();
let isTicking = false;
window.addEventListener('resize', () => { leftRect = leftPanel.getBoundingClientRect(); });
leftPanel.addEventListener('mousemove', (e) => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      const xStrength = currentMode === 'signup' ? 55 : 28;
      const yStrength = currentMode === 'signup' ? 35 : 18;
      const x = ((e.clientX - leftRect.left)  / leftRect.width  - .5) * xStrength;
      const y = ((e.clientY - leftRect.top)   / leftRect.height - .5) * yStrength;
      hero.style.cssText = 'animation:none; transform:translate(' + x + 'px,' + y + 'px)';
      isTicking = false;
    });
    isTicking = true;
  }
});
leftPanel.addEventListener('mouseleave', () => { hero.style.cssText = ''; });

// ── Password visibility toggle ──
const pwToggle = document.getElementById('pw-toggle');
pwToggle.addEventListener('click', () => {
  const isVisible = passwordInput.type === 'text';
  passwordInput.type = isVisible ? 'password' : 'text';
  pwToggle.classList.toggle('visible', !isVisible);
  pwToggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
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
  if (currentMode === 'signup') scorePassword(passwordInput.value);
});
