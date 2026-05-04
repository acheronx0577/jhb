const tabs            = document.querySelectorAll('.tab');
const signupFields    = document.getElementById('signup-fields');
const heading         = document.getElementById('form-heading');
const sub             = document.getElementById('form-sub');
const btn             = document.getElementById('form-btn');
const identifierLabel = document.getElementById('identifier-label');
const identifierInput = document.getElementById('identifier-input');
const tileRow         = document.querySelector('.tile-row');
const card            = document.querySelector('.card');

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

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const mode     = tab.dataset.tab;
    const isSignup = mode === 'signup';

    // Update tab styles
    tabs.forEach(t => {
      t.classList.toggle('on',  t.dataset.tab === mode);
      t.classList.toggle('off', t.dataset.tab !== mode);
    });

    // Swap copy & identifier field immediately
    const s = states[mode];
    heading.innerHTML                         = s.heading;
    sub.textContent                           = s.sub;
    btn.textContent                           = s.btn;
    identifierLabel.childNodes[0].textContent = s.identifierLabel;
    identifierInput.placeholder               = s.identifierPlaceholder;
    identifierInput.type                      = s.identifierType;

    if (isSignup) {
      // Expand: tiles first, then show fields
      tileRow.classList.add('expanded');
      card.classList.add('expanded');
      signupFields.classList.add('visible');
    } else {
      // Collapse: hide fields and shrink tiles simultaneously
      signupFields.classList.remove('visible');
      tileRow.classList.remove('expanded');
      card.classList.remove('expanded');
    }
  });
});
