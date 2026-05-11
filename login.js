/**
 * Life+ login UI — portable mount API
 *
 * Another project:
 *   <div id="login"></div>
 *   <link rel="stylesheet" href="path/to/login.css"/>
 *   <script src="path/to/login.js"></script>
 *   <script>LifePlusLogin.mount(document.getElementById('login'));</script>
 *
 * Options: { stylesheet: 'login.css' | false, fonts: true | false }
 */
const LOGIN_CARD_HTML = `<div class="card" id="card">
  <div class="left" id="left-panel">
    <div class="badge"><div class="dot"></div>Member Portal · 2026</div>
    <div class="hero" id="hero">FEEL<br><span class="outline">YOUR</span><br><span class="coral">BEST.</span></div>
    <div class="tile-row" id="tile-row">
      <div class="tile" role="img" aria-label="Vitals tracker"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9BC1BC" stroke-width="2" stroke-linecap="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg><span class="tlabel">Vitals</span></div>
      <div class="tile" role="img" aria-label="Progress tracker"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ED6A5A" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 20V10M12 20V4M6 20v-6"/></svg><span class="tlabel">Progress</span></div>
      <div class="tile" role="img" aria-label="Streak tracker"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F4F1BB" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span class="tlabel">Streak</span></div>
      <div class="tile" role="img" aria-label="Community"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9BC1BC" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg><span class="tlabel">Community</span></div>
    </div>
    <p class="left-foot">Life+Plus+ · Feel your best every day</p>
  </div>
  <div class="right">
    <div class="ritem">
      <p class="heading" id="form-heading">Welcome <span>Back.</span></p>
      <p class="sub" id="form-sub">Sign in to continue your journey</p>
    </div>
    <div class="tabs ritem" id="tabs-wrap" data-active="signin">
      <div class="tab-pill" aria-hidden="true"></div>
      <button type="button" class="tab on" data-tab="signin" aria-pressed="true">Sign In</button>
      <button type="button" class="tab off" data-tab="signup" aria-pressed="false">Sign Up</button>
    </div>
    <div class="social-row ritem">
      <button type="button" class="sb sb-g" aria-label="Continue with Google"><svg class="g-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Google</button>
      <button type="button" class="sb sb-a" aria-label="Continue with Apple"><svg class="a-ico" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>Apple</button>
    </div>
    <div class="divider ritem">or email</div>
    <div class="field ritem">
      <label for="identifier-input" id="identifier-label">Email, phone or username</label>
      <div class="step-wrap" id="identifier-step-wrap">
        <input class="fi" id="identifier-input" type="text" placeholder="Enter your email, phone or username" autocomplete="username"/>
        <div class="fi-locked" id="identifier-locked" aria-hidden="true">
          <span id="identifier-locked-value"></span>
          <button class="lock-edit" id="identifier-edit" type="button" aria-label="Edit identifier"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        </div>
      </div>
    </div>
    <div class="signup-fields" id="signup-fields">
      <div class="field"><label for="username-input">Username <span class="optional">optional</span></label><input class="fi" id="username-input" type="text" placeholder="@yourhandle" autocomplete="username"/></div>
      <div class="field"><label for="phone-input">Phone number <span class="optional">optional</span></label><input class="fi" id="phone-input" type="tel" placeholder="+1 (000) 000-0000" autocomplete="tel"/></div>
    </div>
    <div class="password-step" id="password-step">
      <div class="field">
        <label for="password-input">Password</label>
        <div class="pw-wrap">
          <input class="fi" id="password-input" type="password" placeholder="••••••••" autocomplete="current-password"/>
          <button class="pw-toggle" id="pw-toggle" type="button" aria-label="Toggle password visibility">
            <svg class="eye-on" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="eye-off" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          </button>
        </div>
      </div>
      <div id="strength-wrap" aria-live="polite"><div class="strength-track"><div id="strength-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div></div><div id="strength-text"></div></div>
    </div>
    <button class="btn ritem" id="form-btn" type="button">Continue →</button>
    <div class="forgot-wrap ritem" id="forgot-wrap"><a href="#" class="forgot-link">Forgot password?</a></div>
  </div>
</div>`;

function injectLoginAssets(options) {
  const sheet = options.stylesheet !== false ? (options.stylesheet || 'login.css') : null;
  if (sheet) {
    const href = typeof sheet === 'string' ? sheet : 'login.css';
    const dup = [...document.querySelectorAll('link[rel="stylesheet"]')].some(l => {
      try {
        return l.href.endsWith(href) || l.getAttribute('href') === href;
      } catch (e) {
        return l.getAttribute('href') === href;
      }
    });
    if (!dup) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }
  if (options.fonts !== false) {
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2"]')) {
      const preG = document.createElement('link');
      preG.rel = 'preconnect';
      preG.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preG);
      const preS = document.createElement('link');
      preS.rel = 'preconnect';
      preS.href = 'https://fonts.gstatic.com';
      preS.crossOrigin = 'anonymous';
      document.head.appendChild(preS);
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href =
        'https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap';
      document.head.appendChild(fontLink);
    }
  }
}

function mountLifePlusLogin(host, options) {
  if (!host || !(host instanceof Element)) {
    throw new TypeError('LifePlusLogin.mount(host): host must be a DOM element');
  }
  const opts = options || {};
  injectLoginAssets(opts);
  host.classList.add('lifeplus-login-host');
  host.innerHTML = LOGIN_CARD_HTML;

  const $ = sel => host.querySelector(sel);
  const tabs = host.querySelectorAll('.tab');
  const tabsWrap = $('#tabs-wrap');
  const signupFields = $('#signup-fields');
  const heading = $('#form-heading');
  const sub = $('#form-sub');
  const btn = $('#form-btn');
  const identifierLabel = $('#identifier-label');
  const identifierInput = $('#identifier-input');
  const identifierWrap = $('#identifier-step-wrap');
  const identifierLockedValue = $('#identifier-locked-value');
  const identifierEdit = $('#identifier-edit');
  const tileRow = $('#tile-row');
  const card = $('#card');
  const passwordInput = $('#password-input');
  const passwordStep = $('#password-step');
  const strengthBar = $('#strength-bar');
  const strengthText = $('#strength-text');
  const strengthWrap = $('#strength-wrap');
  const hero = $('#hero');
  const leftPanel = $('#left-panel');
  const forgotWrap = $('#forgot-wrap');

  let step = 'identifier';
  const states = {
    signin: {
      heading: 'Welcome <span>Back.</span>',
      sub: 'Sign in to continue your journey',
      btn_step1: 'Continue \u2192',
      btn_step2: 'Enter \u2192',
      identifierLabel: 'Email, phone or username',
      identifierPlaceholder: 'Enter your email, phone or username',
      identifierType: 'text',
    },
    signup: {
      heading: 'Create <span>Account.</span>',
      sub: 'Start your wellness journey today',
      btn_step1: 'Continue \u2192',
      btn_step2: 'Join Now \u2192',
      identifierLabel: 'Email',
      identifierPlaceholder: 'you@lifeplus.com',
      identifierType: 'email',
    },
  };
  let currentMode = 'signin';
  let savedSignin = { identifier: '', step: 'identifier' };

  function updatePill() {
    const activeTab = host.querySelector('.tab.on');
    const pill = host.querySelector('.tab-pill');
    if (activeTab && pill) {
      pill.style.left = activeTab.offsetLeft + 'px';
      pill.style.width = activeTab.offsetWidth + 'px';
    }
  }

  function addPressFeedback(el) {
    el.addEventListener('mousedown', () => el.classList.add('pressed'));
    el.addEventListener('mouseup', () => el.classList.remove('pressed'));
    el.addEventListener('mouseleave', () => el.classList.remove('pressed'));
  }

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

  function goToStep1() {
    step = 'identifier';
    identifierWrap.classList.remove('identifier-locked');
    identifierInput.value = '';
    identifierLockedValue.textContent = '';
    passwordInput.value = '';
    setStrength(0, '', '');
    if (currentMode === 'signup') {
      passwordStep.classList.add('visible');
      strengthWrap.classList.add('visible');
      step = 'all';
      btn.textContent = states[currentMode].btn_step2;
      forgotWrap.classList.remove('visible');
      identifierWrap.classList.remove('identifier-expanded');
    } else {
      passwordStep.classList.remove('visible');
      strengthWrap.classList.remove('visible');
      btn.textContent = states[currentMode].btn_step1;
      forgotWrap.classList.add('visible');
      identifierWrap.classList.add('identifier-expanded');
    }
    setTimeout(() => identifierInput.focus(), 50);
  }

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
      forgotWrap.classList.remove('visible');
    } else {
      forgotWrap.classList.add('visible');
    }
    btn.textContent = states[currentMode].btn_step2;
    setTimeout(() => passwordInput.focus(), 460);
  }

  Promise.all([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    }),
  ]).then(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add('ready');
        host.querySelectorAll('.ritem').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), 120 + i * 70);
        });
        updatePill();
        identifierWrap.classList.add('identifier-expanded');
      });
    });
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.tab;
      const isSignup = mode === 'signup';
      if (currentMode === 'signin' && mode === 'signup') {
        savedSignin.identifier = identifierInput.value || identifierLockedValue.textContent;
        savedSignin.step = step;
      }
      currentMode = mode;
      tabs.forEach(t => {
        t.classList.toggle('on', t.dataset.tab === mode);
        t.classList.toggle('off', t.dataset.tab !== mode);
        t.setAttribute('aria-pressed', String(t.dataset.tab === mode));
      });
      updatePill();
      tabsWrap.dataset.active = mode;
      const s = states[mode];
      heading.innerHTML = s.heading;
      sub.textContent = s.sub;
      identifierLabel.childNodes[0].textContent = s.identifierLabel;
      identifierInput.placeholder = s.identifierPlaceholder;
      identifierInput.type = s.identifierType;
      goToStep1();
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

  identifierEdit.addEventListener('click', goToStep1);
  btn.addEventListener('click', () => {
    if (step === 'identifier') {
      goToStep2();
    }
  });
  addPressFeedback(btn);
  identifierInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') goToStep2();
  });
  host.querySelectorAll('.sb').forEach(addPressFeedback);

  let leftRect = leftPanel.getBoundingClientRect();
  let isTicking = false;
  const onResize = () => {
    leftRect = leftPanel.getBoundingClientRect();
  };
  window.addEventListener('resize', onResize);
  const onMove = e => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const xStrength = currentMode === 'signup' ? 55 : 28;
        const yStrength = currentMode === 'signup' ? 35 : 18;
        const x = ((e.clientX - leftRect.left) / leftRect.width - 0.5) * xStrength;
        const y = ((e.clientY - leftRect.top) / leftRect.height - 0.5) * yStrength;
        hero.style.cssText = 'animation:none; transform:translate(' + x + 'px,' + y + 'px)';
        isTicking = false;
      });
      isTicking = true;
    }
  };
  leftPanel.addEventListener('mousemove', onMove);
  const onLeave = () => {
    hero.style.cssText = '';
  };
  leftPanel.addEventListener('mouseleave', onLeave);

  const pwToggle = $('#pw-toggle');
  pwToggle.addEventListener('click', () => {
    const isVisible = passwordInput.type === 'text';
    passwordInput.type = isVisible ? 'password' : 'text';
    pwToggle.classList.toggle('visible', !isVisible);
    pwToggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
  });

  function setStrength(pct, label, color) {
    strengthBar.style.width = pct + '%';
    strengthBar.style.background = color;
    strengthBar.setAttribute('aria-valuenow', pct);
    strengthText.textContent = label;
    strengthText.style.color = color;
  }
  function scorePassword(pw) {
    if (!pw) return setStrength(0, '', '');
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return setStrength(25, 'Weak', '#ED6A5A');
    if (score === 2) return setStrength(50, 'Fair', '#F4B942');
    if (score === 3) return setStrength(75, 'Good', '#9BC1BC');
    return setStrength(100, 'Strong', '#5DB87A');
  }
  passwordInput.addEventListener('input', () => {
    if (currentMode === 'signup') scorePassword(passwordInput.value);
  });

  return function destroy() {
    window.removeEventListener('resize', onResize);
    leftPanel.removeEventListener('mousemove', onMove);
    leftPanel.removeEventListener('mouseleave', onLeave);
    host.innerHTML = '';
    host.classList.remove('lifeplus-login-host');
  };
}

const LifePlusLogin = {
  mount: mountLifePlusLogin,
  /** Raw card markup (same as mount injects). Useful if you prefer innerHTML yourself. */
  template: LOGIN_CARD_HTML,
};

if (typeof window !== 'undefined') {
  window.LifePlusLogin = LifePlusLogin;
}
