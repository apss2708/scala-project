(() => {
  'use strict';

  const outputEl = document.getElementById('output');
  const terminalEl = document.getElementById('terminal');
  const terminalWindow = document.getElementById('terminal-window');
  const inputEl = document.getElementById('command-input');
  const showcaseBtn = document.getElementById('run-showcase');
  const clearBtn = document.getElementById('clear-terminal');
  const showcaseLabel = showcaseBtn.querySelector('span');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const REPO = 'https://github.com/apss2708/scala-project';
  const SITE = 'https://apss2708.github.io/scala-project/';
  const PROMPT =
    '<span class="prompt-user">ayush@AMBA</span> <span class="prompt-path">scala-project</span> <span class="prompt-pct">%</span>';

  const state = {
    history: [],
    historyIndex: 0,
    busy: false,
  };

  const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, reducedMotion.matches ? 0 : ms));

  const escapeHtml = (value) =>
    value.replace(
      /[&<>"']/g,
      (character) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[character],
    );

  const scrollBottom = () => {
    outputEl.scrollTop = outputEl.scrollHeight;
  };

  const addLine = (html = '', className = '') => {
    const line = document.createElement('div');
    line.className = 'line' + (className ? ` ${className}` : '');
    line.innerHTML = html;
    outputEl.appendChild(line);
    return line;
  };

  const addLines = (lines) => {
    const fragment = document.createDocumentFragment();

    for (const [html, className = ''] of lines) {
      const line = document.createElement('div');
      line.className = 'line' + (className ? ` ${className}` : '');
      line.innerHTML = html;
      fragment.appendChild(line);
    }

    outputEl.appendChild(fragment);
    scrollBottom();
  };

  const blank = () => addLine('&nbsp;', 'blank');

  const addCommandLine = (command = '') => {
    const line = document.createElement('div');
    line.className = 'line command';
    line.innerHTML = `<span class="prompt">${PROMPT}</span> <span class="cmd"></span>`;
    const commandSpan = line.querySelector('.cmd');
    commandSpan.textContent = command;
    outputEl.appendChild(line);
    scrollBottom();
    return commandSpan;
  };

  const addInterruptLine = (partial) => {
    const line = document.createElement('div');
    line.className = 'line command';
    line.innerHTML = `<span class="prompt">${PROMPT}</span> <span class="cmd"></span><span class="red">^C</span>`;
    line.querySelector('.cmd').textContent = partial;
    outputEl.appendChild(line);
    scrollBottom();
  };

  const clearOutput = () => {
    outputEl.innerHTML = '';
  };

  const updateInputWidth = () => {
    const length = Array.from(inputEl.value).length;
    inputEl.style.width = `${Math.max(1, length + 0.3)}ch`;
  };

  const setInputValue = (value) => {
    inputEl.value = value;
    updateInputWidth();
    inputEl.focus({ preventScroll: true });
    const end = value.length;
    inputEl.setSelectionRange(end, end);
  };

  const resetInput = () => {
    inputEl.value = '';
    updateInputWidth();
  };

  const focusInput = (force = false) => {
    if (state.busy) return;
    if (force || finePointer.matches) {
      inputEl.focus({ preventScroll: true });
    }
  };

  const setBusy = (busy) => {
    state.busy = busy;
    terminalWindow.classList.toggle('is-busy', busy);
    inputEl.disabled = busy;
    showcaseBtn.disabled = busy;
    clearBtn.disabled = busy;

    for (const chip of document.querySelectorAll('.chip')) {
      chip.disabled = busy;
    }

    if (!busy) {
      focusInput();
    }
  };

  const addHistory = (command) => {
    if (command && state.history[state.history.length - 1] !== command) {
      state.history.push(command);
    }
    state.historyIndex = state.history.length;
  };

  const normalize = (raw) => {
    let command = raw.trim().replace(/\s+/g, ' ');

    const aliases = {
      '?': 'help',
      h: 'help',
      test: 'scala-cli test .',
      tests: 'scala-cli test .',
      run: 'scala-cli run .',
      demo: 'scala-cli run .',
      readme: 'cat README.md',
      repo: 'github',
      source: 'github',
    };

    command = aliases[command] || command;

    if (command === 'scala-cli test') command = 'scala-cli test .';
    if (command === 'scala-cli run') command = 'scala-cli run .';

    return command;
  };

  // ---------------------------------------------------------------------------
  // Recorded output
  // ---------------------------------------------------------------------------

  const helpLines = () => [
    ['', 'blank'],
    ['<span class="bold">COMMANDS</span>', ''],
    ['', 'blank'],
    ['  <span class="cyan">help</span>                 Show this command list', ''],
    ['  <span class="cyan">scala-cli test .</span>     Run the 17-test MUnit suite', ''],
    ['  <span class="cyan">scala-cli run .</span>      Run the notification demo', ''],
    ['  <span class="cyan">sbt test</span>             Run the suite through sbt', ''],
    ['  <span class="cyan">sbt run</span>              Run the demo through sbt', ''],
    ['  <span class="cyan">tree</span>                 Show the project structure', ''],
    ['  <span class="cyan">ls</span>                   List top-level files', ''],
    ['  <span class="cyan">cat README.md</span>        Read the project overview', ''],
    ['  <span class="cyan">architecture</span>         Print the design overview', ''],
    ['  <span class="cyan">roadmap</span>              Show planned extensions', ''],
    ['  <span class="cyan">github</span>               Print the repository link', ''],
    ['  <span class="cyan">history</span>              Show commands from this session', ''],
    ['  <span class="cyan">pwd</span> / <span class="cyan">whoami</span>        Show the current shell context', ''],
    ['  <span class="cyan">clear</span>                Clear the terminal', ''],
    ['', 'blank'],
    ['<span class="dim">Shortcuts: ↑/↓ history · Tab completion · Ctrl+L clear · Ctrl+C cancel</span>', ''],
    ['<span class="dim">Try an alias: test, run, demo, readme, repo</span>', ''],
    ['', 'blank'],
  ];

  const testLines = () => {
    const warningPath =
      'file:/Users/ayush/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/scala-library/3.9.0/scala-library-3.9.0.jar';

    return [
      ['WARNING: A terminally deprecated method in sun.misc.Unsafe has been called', 'warning'],
      [
        `WARNING: sun.misc.Unsafe::objectFieldOffset has been called by scala.runtime.LazyVals$ (${warningPath})`,
        'warning',
      ],
      [
        'WARNING: Please consider reporting this to the maintainers of class scala.runtime.LazyVals$',
        'warning',
      ],
      [
        'WARNING: sun.misc.Unsafe::objectFieldOffset will be removed in a future release',
        'warning',
      ],
      ['', 'blank'],
      [
        'Test run <span class="cyan">com.example.notifications.ChannelSpec</span> started',
        '',
      ],
      [
        '<span class="cyan">com.example.notifications.ChannelSpec</span>: finished <span class="dim">0.041s</span>',
        '',
      ],
      [
        'Test run <span class="cyan">com.example.notifications.ChannelSpec</span> finished: <span class="green">0 failed</span>, 0 ignored, <span class="green">9 total</span> <span class="dim">0.049s</span>',
        '',
      ],
      [
        'Test run <span class="cyan">com.example.notifications.NotificationServiceSpec</span> started',
        '',
      ],
      [
        '<span class="cyan">com.example.notifications.NotificationServiceSpec</span>: finished <span class="dim">0.008s</span>',
        '',
      ],
      [
        'Test run <span class="cyan">com.example.notifications.NotificationServiceSpec</span> finished: <span class="green">0 failed</span>, 0 ignored, <span class="green">8 total</span> <span class="dim">0.008s</span>',
        '',
      ],
      ['', 'blank'],
    ];
  };

  const runLines = () => [
    ['=== Scala Notification System ===', 'bold'],
    ['Trait-based channels | case-class messages | typed delivery failures', 'dim'],
    ['', 'blank'],
    [
      '   <span class="dim">[transport:console]</span> email to=ada@example.com subject="Welcome aboard" :: Thanks for joining the notification demo.',
      '',
    ],
    [
      '   <span class="dim">[transport:console]</span> sms to=+14155550100 :: Your verification code is 424242.',
      '',
    ],
    [
      '   <span class="dim">[transport:console]</span> push to=device-token-abc123 subject="New message" :: You have a new message waiting.',
      '',
    ],
    ['', 'blank'],
    ['<span class="bold">-&gt; EMAIL to ada@example.com</span>', ''],
    [
      '   <span class="green">DELIVERED</span> id=<span class="dim">console-db39294e-ff2f-421d-9438-07de8aca2840</span> attempt=1',
      '',
    ],
    ['', 'blank'],
    ['<span class="bold">-&gt; SMS to +14155550100</span>', ''],
    [
      '   <span class="green">DELIVERED</span> id=<span class="dim">console-8ef084bf-6c16-41de-8448-2513634c28bc</span> attempt=1',
      '',
    ],
    ['', 'blank'],
    ['<span class="bold">-&gt; PUSH to device-token-abc123</span>', ''],
    [
      '   <span class="green">DELIVERED</span> id=<span class="dim">console-970dd7b3-38eb-486c-a04e-168b48943d8d</span> attempt=1',
      '',
    ],
    ['', 'blank'],
    ['<span class="bold">-&gt; EMAIL to not-an-email</span>', ''],
    [
      '   <span class="red">FAILED</span> InvalidRecipientException: Invalid email recipient &#39;not-an-email&#39;: expected a valid email address',
      '',
    ],
    ['', 'blank'],
    ['Demo complete.', 'green'],
    ['', 'blank'],
  ];

  const sbtTestLines = () => [
    ['<span class="cyan">[info]</span> welcome to sbt 1.13.1 (Homebrew Java 27.0.1.0.3)', ''],
    [
      '<span class="cyan">[info]</span> loading project definition from /Users/ayush/scala-project/project',
      '',
    ],
    [
      '<span class="cyan">[info]</span> loading settings for project root from build.sbt...',
      '',
    ],
    [
      '<span class="cyan">[info]</span> set current project to scala-notification-system (in build file:/Users/ayush/scala-project/)',
      '',
    ],
    [
      '<span class="cyan">[info]</span> compiling 18 Scala sources to /Users/ayush/scala-project/target/scala-3.9.0/classes ...',
      '',
    ],
    ['<span class="cyan">[info]</span> done compiling', ''],
    [
      '<span class="cyan">[info]</span> compiling 4 Scala sources to /Users/ayush/scala-project/target/scala-3.9.0/test-classes ...',
      '',
    ],
    ['<span class="cyan">[info]</span> done compiling', ''],
    ['Test run <span class="cyan">com.example.notifications.ChannelSpec</span> started', ''],
    [
      '<span class="cyan">com.example.notifications.ChannelSpec</span>: finished <span class="dim">0.037s</span>',
      '',
    ],
    [
      'Test run <span class="cyan">com.example.notifications.ChannelSpec</span> finished: <span class="green">0 failed</span>, 0 ignored, <span class="green">9 total</span> <span class="dim">0.051s</span>',
      '',
    ],
    [
      'Test run <span class="cyan">com.example.notifications.NotificationServiceSpec</span> started',
      '',
    ],
    [
      '<span class="cyan">com.example.notifications.NotificationServiceSpec</span>: finished <span class="dim">0.007s</span>',
      '',
    ],
    [
      'Test run <span class="cyan">com.example.notifications.NotificationServiceSpec</span> finished: <span class="green">0 failed</span>, 0 ignored, <span class="green">8 total</span> <span class="dim">0.007s</span>',
      '',
    ],
    [
      '<span class="cyan">[info]</span> <span class="green">Passed: Total 17, Failed 0, Errors 0, Passed 17</span>',
      '',
    ],
    [
      '<span class="green">[success]</span> Total time: 25 s, completed Nov 18, 2026, 10:15:28 AM',
      '',
    ],
    ['', 'blank'],
  ];

  const sbtRunLines = () => [
    [
      '<span class="cyan">[info]</span> running <span class="cyan">com.example.notifications.notificationDemo</span>',
      '',
    ],
    ['', 'blank'],
    ...runLines(),
    ['<span class="green">[success]</span> Total time: 1 s', ''],
    ['', 'blank'],
  ];

  const treeLines = () => [
    ['<span class="blue">scala-project/</span>', ''],
    ['├── README.md', ''],
    ['├── ROADMAP.md', ''],
    ['├── build.sbt', ''],
    ['├── project.scala', ''],
    ['├── <span class="blue">docs/</span>                 <span class="dim">← this terminal site</span>', ''],
    ['└── <span class="blue">src/</span>', ''],
    ['    ├── <span class="blue">main/scala/com/example/notifications/</span>', ''],
    ['    │   ├── Main.scala', ''],
    ['    │   ├── <span class="blue">channel/</span>', ''],
    ['    │   │   ├── NotificationChannel.scala   <span class="dim">← the trait</span>', ''],
    ['    │   │   ├── EmailChannel.scala', ''],
    ['    │   │   ├── SmsChannel.scala', ''],
    ['    │   │   └── PushChannel.scala', ''],
    ['    │   ├── <span class="blue">error/</span>NotificationException.scala', ''],
    ['    │   ├── <span class="blue">model/</span>NotificationMessage.scala', ''],
    ['    │   ├── <span class="blue">service/</span>NotificationService.scala', ''],
    ['    │   └── <span class="blue">transport/</span>{Transport, ConsoleTransport}.scala', ''],
    ['    └── <span class="blue">test/scala/com/example/notifications/</span>', ''],
    ['        ├── ChannelSpec.scala', ''],
    ['        └── NotificationServiceSpec.scala', ''],
    ['', 'blank'],
    ['<span class="dim">20 Scala source files · 17 tests · 0 failures</span>', ''],
    ['', 'blank'],
  ];

  const lsLines = () => [
    [
      'README.md   ROADMAP.md   build.sbt   <span class="blue">docs</span>   <span class="blue">project</span>   project.scala   <span class="blue">src</span>',
      '',
    ],
    ['', 'blank'],
  ];

  const readmeLines = () => [
    ['<span class="blue"># SCALA Project — Notification System</span>', ''],
    ['', 'blank'],
    ['A compact Scala 3 notification service built to demonstrate:', ''],
    ['', 'blank'],
    ['  • a <span class="cyan">NotificationChannel</span> trait implemented by email, SMS, and push channels', ''],
    ['  • immutable <span class="cyan">case classes</span> for messages', ''],
    ['  • <span class="cyan">custom exceptions</span> for failed deliveries', ''],
    ['  • retries with exponential back-off', ''],
    ['  • 17 MUnit tests', ''],
    ['', 'blank'],
    [
      `Live demo   <a href="${SITE}" target="_blank" rel="noreferrer">${SITE.replace('https://', '')}</a>`,
      '',
    ],
    [
      `Source      <a href="${REPO}" target="_blank" rel="noreferrer">${REPO.replace('https://', '')}</a>`,
      '',
    ],
    ['', 'blank'],
    ['<span class="dim">[excerpt — the full README is in the repository]</span>', ''],
    ['', 'blank'],
  ];

  const roadmapLines = () => [
    ['<span class="bold">ROADMAP · WHAT CAN BE BUILT NEXT</span>', ''],
    ['<span class="dim">────────────────────────────────────────</span>', ''],
    ['', 'blank'],
    ['  <span class="green">01</span>  Providers        SMTP · SES · SendGrid · Twilio · FCM · APNs', ''],
    ['  <span class="green">02</span>  Reliability      rate limits · circuit breakers · dead-letter queue', ''],
    ['  <span class="green">03</span>  Persistence      PostgreSQL · transactional outbox · Kafka/SQS', ''],
    ['  <span class="green">04</span>  Interfaces       REST · GraphQL · CLI · admin dashboard', ''],
    ['  <span class="green">05</span>  Observability    metrics · tracing · audit logs', ''],
    ['  <span class="green">06</span>  Security         secrets · PII encryption · GDPR · tenant isolation', ''],
    ['  <span class="green">07</span>  Delivery         templates · scheduling · preferences · opt-out', ''],
    ['  <span class="green">08</span>  Testing          ScalaCheck · WireMock · Testcontainers · Gatling', ''],
    ['', 'blank'],
    ['  Full checklist → <span class="cyan">ROADMAP.md</span>', ''],
    ['', 'blank'],
  ];

  const architectureLines = () => [
    ['<span class="bold">DESIGN OVERVIEW</span>', ''],
    ['', 'blank'],
    ['                    <span class="cyan">NotificationService</span>', ''],
    ['                    routing · retries · typed results', ''],
    ['                              <span class="dim">│</span>', ''],
    ['          <span class="dim">┌───────────────────┼───────────────────┐</span>', ''],
    ['          <span class="dim">│</span>                   <span class="dim">│</span>                   <span class="dim">│</span>', ''],
    [
      '    <span class="blue">EmailChannel</span>        <span class="blue">SmsChannel</span>         <span class="blue">PushChannel</span>',
      '',
    ],
    ['          <span class="dim">│</span>                   <span class="dim">│</span>                   <span class="dim">│</span>', ''],
    ['          <span class="dim">└───────────────────┼───────────────────┘</span>', ''],
    ['                              <span class="dim">│</span>', ''],
    ['                         <span class="cyan">Transport</span>   <span class="dim">← pluggable provider boundary</span>', ''],
    ['                              <span class="dim">│</span>', ''],
    ['                     <span class="blue">ConsoleTransport</span>', ''],
    ['', 'blank'],
    ['  <span class="cyan">Trait</span>        one contract, three channel implementations', ''],
    ['  <span class="cyan">Messages</span>     sealed case classes with generated ids and timestamps', ''],
    ['  <span class="cyan">Failures</span>     custom exception hierarchy with a retryable flag', ''],
    ['  <span class="cyan">Results</span>      Either[NotificationException, DeliveryReceipt]', ''],
    ['  <span class="cyan">Tests</span>        17 MUnit specs across channels and service behavior', ''],
    ['', 'blank'],
  ];

  const githubLines = () => [
    [`<span class="green">→</span> <a href="${REPO}" target="_blank" rel="noreferrer">${REPO}</a>`, ''],
    ['  Scala 3 · trait-based channels · immutable messages · 17 MUnit tests', ''],
    [
      '  <span class="dim">git clone https://github.com/apss2708/scala-project.git</span>',
      '',
    ],
    ['', 'blank'],
  ];

  const historyLines = () => {
    if (state.history.length === 0) {
      return [
        ['<span class="dim">No commands yet.</span>', ''],
        ['', 'blank'],
      ];
    }

    const lines = [['<span class="bold">SESSION HISTORY</span>', ''], ['', 'blank']];

    state.history.forEach((command, index) => {
      const number = String(index + 1).padStart(4, ' ');
      lines.push([
        `<span class="dim">${number}</span>  ${escapeHtml(command)}`,
        '',
      ]);
    });

    lines.push(['', 'blank']);
    return lines;
  };

  const linesFor = (command) => {
    switch (command) {
      case 'help':
        return helpLines();
      case 'scala-cli test .':
        return testLines();
      case 'scala-cli run .':
        return runLines();
      case 'sbt test':
        return sbtTestLines();
      case 'sbt run':
        return sbtRunLines();
      case 'tree':
        return treeLines();
      case 'ls':
        return lsLines();
      case 'cat README.md':
        return readmeLines();
      case 'cat ROADMAP.md':
      case 'roadmap':
        return roadmapLines();
      case 'architecture':
        return architectureLines();
      case 'github':
        return githubLines();
      case 'pwd':
        return [['/Users/ayush/scala-project', ''], ['', 'blank']];
      case 'whoami':
        return [['ayush', ''], ['', 'blank']];
      case 'history':
        return historyLines();
      case 'exit':
        return [
          ['There is no exit from a good demo. Try <span class="cyan">github</span>.', 'note'],
          ['', 'blank'],
        ];
      default:
        if (command === 'cat') {
          return [['cat: missing file operand', 'red'], ['', 'blank']];
        }
        if (command.startsWith('cat ')) {
          return [
            [`cat: ${escapeHtml(command.slice(4))}: No such file or directory`, 'red'],
            ['', 'blank'],
          ];
        }
        if (command.startsWith('echo ')) {
          return [[escapeHtml(command.slice(5)), ''], ['', 'blank']];
        }
        return [
          [`zsh: command not found: ${escapeHtml(command)}`, 'red'],
          ['', 'blank'],
        ];
    }
  };

  // ---------------------------------------------------------------------------
  // Rendering actions
  // ---------------------------------------------------------------------------

  const typeCommand = async (command) => {
    const commandSpan = addCommandLine('');

    if (reducedMotion.matches) {
      commandSpan.textContent = command;
      scrollBottom();
      return;
    }

    for (const character of command) {
      commandSpan.textContent += character;
      scrollBottom();
      await wait(26 + Math.random() * 16);
    }
  };

  const runAnimatedCommand = async (command) => {
    if (state.busy) return;

    setBusy(true);

    try {
      resetInput();
      addHistory(command);
      await typeCommand(command);
      await wait(300);
      addLines(linesFor(command));
      scrollBottom();
    } finally {
      setBusy(false);
    }
  };

  const execute = (raw) => {
    if (state.busy) return;

    const command = normalize(raw);
    if (!command) return;

    resetInput();

    if (command === 'clear') {
      addHistory(command);
      clearOutput();
      focusInput();
      return;
    }

    addHistory(command);
    addCommandLine(command);
    addLines(linesFor(command));
    scrollBottom();
    focusInput();
  };

  const runShowcase = async () => {
    if (state.busy) return;

    setBusy(true);
    showcaseLabel.textContent = 'Running…';

    try {
      clearOutput();
      resetInput();

      await typeCommand('scala-cli test .');
      addHistory('scala-cli test .');
      await wait(340);
      addLines(testLines());
      scrollBottom();

      await wait(850);

      await typeCommand('scala-cli run .');
      addHistory('scala-cli run .');
      await wait(340);
      addLines(runLines());
      scrollBottom();

      await wait(300);
      addLine(
        '<span class="dim">Tip: type <span class="key">help</span> to explore the other commands.</span>',
      );
      scrollBottom();
    } finally {
      showcaseLabel.textContent = 'Run showcase';
      setBusy(false);
    }
  };

  const clearTerminal = () => {
    if (state.busy) return;
    clearOutput();
    resetInput();
    focusInput(true);
  };

  const navigateHistory = (direction) => {
    if (state.history.length === 0) return;

    state.historyIndex = Math.max(
      0,
      Math.min(state.history.length, state.historyIndex + direction),
    );

    const value =
      state.historyIndex === state.history.length
        ? ''
        : state.history[state.historyIndex];

    setInputValue(value);
  };

  const completions = [
    'help',
    'scala-cli test .',
    'scala-cli run .',
    'sbt test',
    'sbt run',
    'tree',
    'ls',
    'cat README.md',
    'cat ROADMAP.md',
    'architecture',
    'roadmap',
    'github',
    'history',
    'pwd',
    'whoami',
    'clear',
    'exit',
  ];

  const completeInput = () => {
    const value = inputEl.value;
    if (!value.trim()) return;

    const matches = completions.filter((command) => command.startsWith(value));

    if (matches.length === 0) return;

    if (matches.length === 1) {
      setInputValue(matches[0]);
      return;
    }

    addLine(`<span class="dim">${matches.map(escapeHtml).join('   ')}</span>`);
    scrollBottom();
  };

  const boot = () => {
    clearOutput();
    addLines([
      [
        '<span class="boot-title">SCALA PROJECT <span class="boot-slash">/</span> notification system</span>',
        '',
      ],
      [
        '<span class="boot-meta">Scala 3.9.0  ·  sbt 1.13.1  ·  MUnit 1.3.6  ·  17 tests passing</span>',
        '',
      ],
      ['<span class="boot-rule"></span>', ''],
      ['', 'blank'],
      [
        '<span class="note">Interactive showcase — outputs recorded from a real local run.</span>',
        '',
      ],
      [
        'Type <span class="key">help</span> for commands, or press <span class="key">Run showcase</span> to watch the full demo.',
        'note',
      ],
      ['', 'blank'],
    ]);
    scrollBottom();
  };

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  inputEl.addEventListener('input', () => {
    updateInputWidth();
    state.historyIndex = state.history.length;
  });

  inputEl.addEventListener('keydown', (event) => {
    if (state.busy) {
      event.preventDefault();
      return;
    }

    const key = event.key.toLowerCase();

    if (event.key === 'Enter') {
      if (event.isComposing) return;
      event.preventDefault();
      execute(inputEl.value);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      navigateHistory(-1);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      navigateHistory(1);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      completeInput();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      resetInput();
      return;
    }

    if ((event.ctrlKey && key === 'l') || (event.metaKey && key === 'k')) {
      event.preventDefault();
      clearOutput();
      focusInput();
      return;
    }

    if (
      event.ctrlKey &&
      key === 'c' &&
      inputEl.selectionStart === inputEl.selectionEnd
    ) {
      event.preventDefault();
      addInterruptLine(inputEl.value);
      resetInput();
      scrollBottom();
      return;
    }
  });

  terminalEl.addEventListener('click', (event) => {
    if (event.target.closest('a, button, input')) return;
    focusInput(true);
  });

  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      if (state.busy) return;
      runAnimatedCommand(chip.dataset.command);
    });
  });

  showcaseBtn.addEventListener('click', () => {
    if (state.busy) return;
    runShowcase();
  });

  clearBtn.addEventListener('click', clearTerminal);

  boot();

  if (new URLSearchParams(window.location.search).get('autoplay') === '1') {
    window.setTimeout(() => {
      if (!state.busy) runShowcase();
    }, 900);
  } else if (finePointer.matches) {
    window.setTimeout(() => focusInput(true), 650);
  }
})();
