const routes = {
  stress: {
    tag: 'High volume, low urgency',
    title: 'Start with a peer listener.',
    text:
      'The student gets an anonymous check-in, practical coping tips, and a direct option to book a counselor if the issue persists.',
    steps: ['Anonymous check-in', 'Peer support and grounding', 'Optional counselor booking'],
  },
  loneliness: {
    tag: 'Connection first',
    title: 'Match to a trained peer and a group option.',
    text:
      'The platform reduces isolation by pairing the student with a peer, then offering low-pressure group circles or regular follow-up.',
    steps: ['Private intro', 'Peer match', 'Small support circle'],
  },
  panic: {
    tag: 'Urgent support',
    title: 'Escalate to crisis-safe handling immediately.',
    text:
      'The route bypasses normal queueing, shows stabilization prompts, and alerts the right human support based on consent and policy.',
    steps: ['Immediate safety prompt', 'Crisis escalation', 'Campus and clinical handoff'],
  },
  relationship: {
    tag: 'Moderate urgency',
    title: 'Offer reflective support and boundary planning.',
    text:
      'The route focuses on emotional processing, communication templates, and a counselor referral if the issue is affecting daily function.',
    steps: ['Reflection prompt', 'Supportive listening', 'Decision on next step'],
  },
};

const routeTag = document.getElementById('route-tag');
const routeTitle = document.getElementById('route-title');
const routeText = document.getElementById('route-text');
const routeSteps = document.getElementById('route-steps');
const choices = document.querySelectorAll('.choice');
const intakeForm = document.getElementById('intake-form');
const concernType = document.getElementById('concern-type');
const identityMode = document.getElementById('identity-mode');
const supportMode = document.getElementById('support-mode');
const firstResponse = document.getElementById('first-response');
const escalationPath = document.getElementById('escalation-path');
const waitTime = document.getElementById('wait-time');
const roleButtons = document.querySelectorAll('.role-btn');
const roleKicker = document.getElementById('role-kicker');
const roleTitle = document.getElementById('role-title');
const roleCopy = document.getElementById('role-copy');
const trustPill = document.getElementById('trust-pill');
const trustFill = document.getElementById('trust-fill');
const roleActionA = document.getElementById('role-action-a');
const roleActionB = document.getElementById('role-action-b');
const roleActionC = document.getElementById('role-action-c');
const roleDetailA = document.getElementById('role-detail-a');
const roleDetailB = document.getElementById('role-detail-b');
const roleDetailC = document.getElementById('role-detail-c');
const engineButtons = document.querySelectorAll('.node');
const engineKicker = document.getElementById('engine-kicker');
const engineTitle = document.getElementById('engine-title');
const engineScore = document.getElementById('engine-score');
const engineCopy = document.getElementById('engine-copy');
const engineAction = document.getElementById('engine-action');
const engineValue = document.getElementById('engine-value');
const counters = document.querySelectorAll('.counter');
const campusButtons = document.querySelectorAll('.campus-btn');
const campusKicker = document.getElementById('campus-kicker');
const campusTitle = document.getElementById('campus-title');
const campusStatus = document.getElementById('campus-status');
const campusDemand = document.getElementById('campus-demand');
const campusQueue = document.getElementById('campus-queue');
const campusTrust = document.getElementById('campus-trust');
const demandFill = document.getElementById('demand-fill');
const queueFill = document.getElementById('queue-fill');
const trustFillCockpit = document.getElementById('trust-fill-cockpit');
const signalList = document.getElementById('signal-list');

const responseMap = {
  stress: 'Anonymous peer check-in',
  loneliness: 'Matched peer conversation',
  panic: 'Immediate safety triage',
  relationship: 'Reflective support session',
};

const escalationMap = {
  peer: 'Peer support with optional counselor follow-up',
  counselor: 'Direct counselor handoff',
  group: 'Small group support booking',
  campus: 'Campus help desk and referral loop',
};

const waitMap = {
  panic: 'Immediate',
  stress: 'Under 3 minutes',
  loneliness: 'Under 5 minutes',
  relationship: 'Under 10 minutes',
};

const roleMap = {
  student: {
    kicker: 'Private entry and safe routing',
    title: 'A student sees one calm front door.',
    copy:
      'The platform protects anonymity, explains choices in plain language, and keeps the path to help short.',
    trust: 92,
    actionA: 'Anonymous intake',
    detailA: 'The student can start without revealing identity.',
    actionB: 'Smart matching',
    detailB: 'The system recommends a trusted helper based on urgency and preference.',
    actionC: 'Safe escalation',
    detailC: 'Crisis routes bypass queues and reach the right human immediately.',
  },
  peer: {
    kicker: 'Peer-led support layer',
    title: 'Peers become the first trustworthy human.',
    copy:
      'Trained student allies absorb hesitation, normalize help-seeking, and decide whether the next step should stay local or escalate.',
    trust: 88,
    actionA: 'Warm introduction',
    detailA: 'Peers open the conversation without clinical pressure.',
    actionB: 'Guided listening',
    detailB: 'A lightweight script keeps the conversation safe and useful.',
    actionC: 'Bridge to care',
    detailC: 'Peers hand off only when the student is ready or risk increases.',
  },
  counselor: {
    kicker: 'Clinical care workspace',
    title: 'Counselors see context, not chaos.',
    copy:
      'The system packages consent, urgency, and conversation history so counseling time is spent on care rather than repetition.',
    trust: 95,
    actionA: 'Triage summary',
    detailA: 'Counselors see the minimum useful context before meeting the student.',
    actionB: 'Scheduling intelligence',
    detailB: 'Appointments and follow-ups are suggested automatically.',
    actionC: 'Outcome tracking',
    detailC: 'The platform measures support quality without exposing private notes.',
  },
  campus: {
    kicker: 'Institutional response layer',
    title: 'Campuses gain continuity without surveillance.',
    copy:
      'Administrators see utilization, bottlenecks, and risk trends so they can act on service gaps rather than guess at them.',
    trust: 84,
    actionA: 'Service heatmap',
    detailA: 'See where demand peaks across campuses and time windows.',
    actionB: 'Policy routing',
    detailB: 'Escalation rules align with campus procedures and compliance.',
    actionC: 'Resource planning',
    detailC: 'The platform highlights where to invest in staff, rooms, and partners.',
  },
};

const engineMap = {
  student: {
    kicker: 'First contact',
    title: 'A student opens the conversation.',
    score: 92,
    copy:
      'The network starts with a private entry point that reduces fear and captures just enough context to route the case safely.',
    action: 'Anonymous intake with consent',
    value: 'The platform keeps help-seeking low-friction and stigma-free.',
  },
  peer: {
    kicker: 'Human trust layer',
    title: 'A peer converts hesitation into action.',
    score: 89,
    copy:
      'Trained student allies create a safe conversation, stabilize the moment, and decide whether the student needs more formal care.',
    action: 'Warm listening and reassurance',
    value: 'Peers make the system feel reachable before it feels clinical.',
  },
  triage: {
    kicker: 'Decision layer',
    title: 'Triage identifies the right path fast.',
    score: 94,
    copy:
      'The platform narrows urgency, support type, and consent level so the case does not get lost in a generic queue.',
    action: 'Structured routing and urgency scoring',
    value: 'The right help is surfaced without unnecessary delay.',
  },
  counselor: {
    kicker: 'Clinical care',
    title: 'Counselors receive a clean handoff.',
    score: 95,
    copy:
      'Care arrives with context, history, and consent so the counselor can spend time on support instead of re-asking the basics.',
    action: 'Counselor review and session booking',
    value: 'Clinical time is used efficiently and respectfully.',
  },
  campus: {
    kicker: 'Institutional continuity',
    title: 'The campus sees what it can fix.',
    score: 84,
    copy:
      'Administrators get aggregated service signals, escalation requirements, and workload patterns without exposing private student details.',
    action: 'Policy routing and resource planning',
    value: 'The institution can improve services without becoming intrusive.',
  },
  followup: {
    kicker: 'Aftercare loop',
    title: 'Follow-up keeps support from disappearing.',
    score: 91,
    copy:
      'The platform checks back in, confirms resolution, and reopens the path if the student needs more help later.',
    action: 'Check-in nudges and outcome tracking',
    value: 'Support becomes continuous rather than one-off.',
  },
};

const campusMap = {
  north: {
    kicker: 'North campus demand',
    title: 'High afternoon pressure, steady trust.',
    status: 'Stable',
    demand: 78,
    queueLabel: '5 active',
    queue: 5,
    trust: 91,
    demandWidth: 78,
    queueWidth: 56,
    trustWidth: 91,
    signals: [
      { title: 'Peak window', value: '2:00 PM - 6:00 PM', note: 'After classes and before commute.' },
      { title: 'Top theme', value: 'Academic overload', note: 'Exam prep and missed deadlines spike.' },
      { title: 'Recommended move', value: 'Add peer coverage', note: 'Route more first-contact help this window.' },
    ],
  },
  central: {
    kicker: 'Central campus demand',
    title: 'Balanced load with a few urgent spikes.',
    status: 'Watch',
    demand: 61,
    queueLabel: '3 active',
    queue: 3,
    trust: 94,
    demandWidth: 61,
    queueWidth: 34,
    trustWidth: 94,
    signals: [
      { title: 'Peak window', value: 'Late morning', note: 'Short bursts between lectures.' },
      { title: 'Top theme', value: 'Loneliness', note: 'First-year students ask for check-ins.' },
      { title: 'Recommended move', value: 'Promote group sessions', note: 'Convert recurring cases into circles.' },
    ],
  },
  south: {
    kicker: 'South campus demand',
    title: 'Lower volume, higher escalation risk.',
    status: 'Escalating',
    demand: 84,
    queueLabel: '7 active',
    queue: 7,
    trust: 87,
    demandWidth: 84,
    queueWidth: 72,
    trustWidth: 87,
    signals: [
      { title: 'Peak window', value: 'Evening', note: 'Late requests after hostel hours.' },
      { title: 'Top theme', value: 'Panic / crisis', note: 'Urgent cases need faster routing.' },
      { title: 'Recommended move', value: 'Trigger counselor standby', note: 'Reduce wait time and queue churn.' },
    ],
  },
};

function renderRoute(key) {
  const route = routes[key];

  routeTag.textContent = route.tag;
  routeTitle.textContent = route.title;
  routeText.textContent = route.text;
  routeSteps.innerHTML = route.steps
    .map((step, index) => `<div><strong>Step ${index + 1}</strong><span>${step}</span></div>`)
    .join('');
}

function renderIntakePlan() {
  const concern = concernType.value;
  const support = supportMode.value;
  const identity = identityMode.value;

  firstResponse.textContent = `${responseMap[concern]} (${identity})`;
  escalationPath.textContent = escalationMap[support];
  waitTime.textContent = waitMap[concern] || 'Under 5 minutes';
}

function renderRole(role) {
  const view = roleMap[role];

  roleKicker.textContent = view.kicker;
  roleTitle.textContent = view.title;
  roleCopy.textContent = view.copy;
  trustPill.textContent = `Trust score: ${view.trust}%`;
  trustFill.style.width = `${view.trust}%`;
  roleActionA.textContent = view.actionA;
  roleActionB.textContent = view.actionB;
  roleActionC.textContent = view.actionC;
  roleDetailA.textContent = view.detailA;
  roleDetailB.textContent = view.detailB;
  roleDetailC.textContent = view.detailC;
}

function renderEngine(node) {
  const view = engineMap[node];

  engineKicker.textContent = view.kicker;
  engineTitle.textContent = view.title;
  engineScore.textContent = `${view.score} trust`;
  engineCopy.textContent = view.copy;
  engineAction.textContent = view.action;
  engineValue.textContent = view.value;
}

function renderCampus(campus) {
  const view = campusMap[campus];

  campusKicker.textContent = view.kicker;
  campusTitle.textContent = view.title;
  campusStatus.textContent = view.status;
  campusDemand.textContent = `${view.demand}%`;
  campusQueue.textContent = view.queueLabel;
  campusTrust.textContent = `${view.trust}%`;
  demandFill.style.width = `${view.demandWidth}%`;
  queueFill.style.width = `${view.queueWidth}%`;
  trustFillCockpit.style.width = `${view.trustWidth}%`;
  signalList.innerHTML = view.signals
    .map(
      (signal) => `
        <article>
          <strong>${signal.title}</strong>
          <span>${signal.value}</span>
          <p>${signal.note}</p>
        </article>
      `,
    )
    .join('');
}

function animateCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(target * progress);
      counter.textContent = String(value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  });
}

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    choices.forEach((item) => item.classList.remove('active'));
    choice.classList.add('active');
    renderRoute(choice.dataset.route);
  });
});

intakeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderIntakePlan();
  document.getElementById('intake-result').querySelector('.result-badge').textContent = 'Generated';
});

[concernType, identityMode, supportMode].forEach((field) => {
  field.addEventListener('change', renderIntakePlan);
});

roleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    roleButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderRole(button.dataset.role);
  });
});

engineButtons.forEach((button) => {
  button.addEventListener('click', () => {
    engineButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderEngine(button.dataset.node);
  });
});

campusButtons.forEach((button) => {
  button.addEventListener('click', () => {
    campusButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderCampus(button.dataset.campus);
  });
});

renderRoute('stress');
renderIntakePlan();
renderRole('student');
renderEngine('student');
renderCampus('north');
animateCounters();
