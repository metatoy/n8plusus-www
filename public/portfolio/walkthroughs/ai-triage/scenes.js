window.WT_AI_TRIAGE_SCENES = {
  land: `<svg class="land-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Support requests arrive in a Slack-style #help channel and one becomes a raw, unsorted ticket card."><g aria-hidden="true"><rect x="80" y="80" width="270" height="340" rx="16" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><text x="102" y="120" font-size="18" fill="#8b7e66" font-weight="700">#</text><text x="120" y="119" font-size="15" fill="#f7f7f7" font-weight="700">help</text><line x1="80" y1="136" x2="350" y2="136" stroke="#4a4a4a" stroke-width="1"></line></g><g class="bubble b1" aria-hidden="true"><circle cx="108" cy="172" r="11" fill="#8b7e66"></circle><rect x="128" y="158" width="198" height="46" rx="10" fill="#2e281f"></rect><rect x="140" y="170" width="120" height="7" rx="3.5" fill="#6f6553"></rect><rect x="140" y="184" width="160" height="7" rx="3.5" fill="#4a4335"></rect></g><g class="bubble b2" aria-hidden="true"><circle cx="108" cy="234" r="11" fill="#8b7e66"></circle><rect x="128" y="220" width="198" height="46" rx="10" fill="#2e281f"></rect><rect x="140" y="232" width="150" height="7" rx="3.5" fill="#6f6553"></rect><rect x="140" y="246" width="108" height="7" rx="3.5" fill="#4a4335"></rect></g><g class="bubble b3" aria-hidden="true"><circle cx="108" cy="296" r="11" fill="#8b7e66"></circle><rect x="128" y="282" width="198" height="46" rx="10" fill="#2e281f"></rect><rect x="140" y="294" width="168" height="7" rx="3.5" fill="#6f6553"></rect><rect x="140" y="308" width="128" height="7" rx="3.5" fill="#4a4335"></rect></g><g aria-hidden="true"><rect x="510" y="250" width="200" height="150" rx="12" fill="#3a342b" opacity="0.4"></rect><rect class="stackGrow" x="498" y="236" width="200" height="150" rx="12" fill="#3a342b" opacity="0"></rect></g><g class="ticket"><rect x="486" y="222" width="200" height="150" rx="12" fill="#f7f7f7"></rect><rect x="486" y="222" width="200" height="30" rx="12" fill="#d1d1d1"></rect><circle cx="508" cy="237" r="5" fill="#8b7e66"></circle><rect x="522" y="233" width="86" height="8" rx="4" fill="#8b7e66"></rect><rect x="506" y="274" width="150" height="9" rx="4.5" fill="#d1d1d1"></rect><rect x="506" y="296" width="168" height="9" rx="4.5" fill="#d1d1d1"></rect><rect x="506" y="318" width="104" height="9" rx="4.5" fill="#d1d1d1"></rect></g><style>
        .land-svg {
          font-family: inherit;
        }
        .bubble {
          opacity: 0;
          transform: translateY(12px);
          animation: msgIn 0.45s ease-out forwards;
          animation-play-state: running;
        }
        .b1 {
          animation-delay: 0.25s;
        }
        .b2 {
          animation-delay: 0.6s;
        }
        .b3 {
          animation-delay: 0.95s;
        }
        .ticket {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translate(-330px, 34px) scale(0.34);
          animation: emerge 1.2s cubic-bezier(0.22, 1, 0.36, 1) 1.5s forwards;
          animation-play-state: running;
        }
        .stackGrow {
          animation: stackIn 0.5s ease-out 2.5s forwards;
          animation-play-state: running;
        }
        @keyframes msgIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes emerge {
          0% {
            opacity: 0;
            transform: translate(-330px, 34px) scale(0.34);
          }
          30% {
            opacity: 1;
          }
          82% {
            transform: translate(0, -10px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes stackIn {
          to {
            opacity: 0.45;
          }
        }

        
      </style></svg>`,
  hypothesis: `<svg class="hyp-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A rulebook stamps a quick hypothesis onto the ticket: likely config change, severity high."><g aria-hidden="true"><rect x="110" y="150" width="220" height="200" rx="10" fill="#f7f7f7"></rect><rect x="110" y="150" width="220" height="30" rx="10" fill="#d1d1d1"></rect><circle cx="132" cy="165" r="5" fill="#8b7e66"></circle><rect x="146" y="161" width="90" height="8" rx="4" fill="#8b7e66"></rect><rect x="128" y="202" width="170" height="9" rx="4.5" fill="#d1d1d1"></rect><rect x="128" y="224" width="150" height="9" rx="4.5" fill="#d1d1d1"></rect><rect x="128" y="246" width="184" height="9" rx="4.5" fill="#d1d1d1"></rect><rect x="128" y="268" width="120" height="9" rx="4.5" fill="#d1d1d1"></rect></g><g class="book" aria-hidden="true"><rect x="556" y="96" width="70" height="52" rx="5" fill="#8b7e66"></rect><rect x="556" y="96" width="14" height="52" rx="5" fill="#6f6553"></rect><rect x="578" y="108" width="38" height="5" rx="2.5" fill="#f7f7f7" opacity="0.7"></rect><rect x="578" y="120" width="38" height="5" rx="2.5" fill="#f7f7f7" opacity="0.55"></rect><rect x="578" y="132" width="26" height="5" rx="2.5" fill="#f7f7f7" opacity="0.4"></rect><rect class="bookMark" x="600" y="90" width="10" height="24" rx="1" fill="#f26722"></rect></g><circle class="stamp" cx="530" cy="250" r="46" fill="none" stroke="#f26722" stroke-width="4" opacity="0"></circle><g class="panel"><rect x="400" y="192" width="290" height="116" rx="10" fill="#f7f7f7"></rect><text x="418" y="216" font-size="11" fill="#8b7e66" font-weight="700" letter-spacing="0.06em">HYPOTHESIS</text><g class="line hl1"><text x="418" y="248" font-size="14" fill="#4a4a4a">Likely: config change</text></g><g class="line hl2"><text x="418" y="278" font-size="14" fill="#4a4a4a">Severity: </text><text x="486" y="278" font-size="14" fill="#f26722" font-weight="700">High</text></g></g><style>
        .hyp-svg {
          font-family: inherit;
        }
        .book {
          transform-box: fill-box;
          transform-origin: center;
          animation: bookPulse 0.5s ease-out 0.3s;
          animation-play-state: running;
        }
        .bookMark {
          transform-box: fill-box;
          transform-origin: center top;
          transform: scaleY(0);
          animation: markDrop 0.35s ease-out 0.45s forwards;
          animation-play-state: running;
        }
        .stamp {
          transform-box: fill-box;
          transform-origin: center;
          animation: stampPress 0.5s ease-out 0.75s forwards;
          animation-play-state: running;
        }
        .panel {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.9);
          animation: crystallize 0.45s cubic-bezier(0.34, 1.4, 0.64, 1) 0.95s forwards;
          animation-play-state: running;
        }
        .line {
          opacity: 0;
          animation: lineIn 0.35s ease-out forwards;
          animation-play-state: running;
        }
        .hl1 {
          animation-delay: 1.25s;
        }
        .hl2 {
          animation-delay: 1.55s;
        }
        @keyframes bookPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes markDrop {
          to {
            transform: scaleY(1);
          }
        }
        @keyframes stampPress {
          0% {
            opacity: 0;
            transform: scale(1.9);
          }
          55% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
        @keyframes crystallize {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes lineIn {
          to {
            opacity: 1;
          }
        }

        
      </style></svg>`,
  investigation: `<svg class="inv-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="An agent digs through logs, config, and past tickets, testing the hypothesis while a progress bar fills."><g aria-hidden="true" stroke="#4a4a4a" stroke-width="1.5" fill="none"><path class="wire w1" d="M400 250 L212 168"></path><path class="wire w2" d="M400 250 L612 168"></path><path class="wire w3" d="M400 250 L212 356"></path><path class="wire w4" d="M400 250 L612 356"></path></g><g aria-hidden="true"><rect x="92" y="108" width="220" height="120" rx="10" fill="#211c15" stroke="#4a4a4a"></rect><text x="108" y="130" font-size="11" fill="#8b7e66" font-weight="700">logs</text><g font-family="ui-monospace, monospace"><rect class="log lg1" x="108" y="142" width="150" height="6" rx="3" fill="#6f6553"></rect><rect class="log lg2" x="108" y="156" width="180" height="6" rx="3" fill="#6f6553"></rect><rect class="log lg3" x="108" y="170" width="120" height="6" rx="3" fill="#f26722"></rect><rect class="log lg4" x="108" y="184" width="168" height="6" rx="3" fill="#6f6553"></rect><rect class="log lg5" x="108" y="198" width="140" height="6" rx="3" fill="#6f6553"></rect><rect class="log lg6" x="108" y="212" width="110" height="6" rx="3" fill="#6f6553"></rect></g></g><g aria-hidden="true"><rect x="512" y="108" width="200" height="120" rx="10" fill="#211c15" stroke="#4a4a4a"></rect><text x="528" y="130" font-size="11" fill="#8b7e66" font-weight="700">config</text><rect x="528" y="144" width="120" height="7" rx="3.5" fill="#4a4335"></rect><rect class="cfgHit" x="528" y="160" width="150" height="14" rx="4" fill="#f26722" opacity="0.18"></rect><rect x="536" y="163" width="110" height="7" rx="3.5" fill="#f26722"></rect><rect x="528" y="184" width="96" height="7" rx="3.5" fill="#4a4335"></rect><rect x="528" y="200" width="130" height="7" rx="3.5" fill="#4a4335"></rect></g><g aria-hidden="true"><rect x="92" y="288" width="220" height="120" rx="10" fill="#211c15" stroke="#4a4a4a"></rect><text x="108" y="310" font-size="11" fill="#8b7e66" font-weight="700">past tickets</text><rect x="108" y="324" width="188" height="20" rx="5" fill="#2e281f"></rect><rect x="108" y="350" width="188" height="20" rx="5" fill="#2e281f"></rect><rect x="108" y="376" width="188" height="20" rx="5" fill="#2e281f"></rect></g><g aria-hidden="true"><rect x="512" y="288" width="200" height="120" rx="10" fill="#211c15" stroke="#4a4a4a"></rect><text x="528" y="310" font-size="11" fill="#8b7e66" font-weight="700">testing hypothesis</text><rect x="528" y="330" width="168" height="10" rx="5" fill="#2e281f"></rect><rect class="prog" x="528" y="330" width="168" height="10" rx="5" fill="#f26722"></rect><rect x="528" y="356" width="120" height="6" rx="3" fill="#4a4335"></rect><rect x="528" y="370" width="150" height="6" rx="3" fill="#4a4335"></rect></g><g aria-hidden="true"><circle class="agentRing" cx="400" cy="250" r="46" fill="none" stroke="#f26722" stroke-width="2" opacity="0.5"></circle><circle cx="400" cy="250" r="34" fill="#1c1712" stroke="#8b7e66" stroke-width="1.5"></circle><circle class="agentCore" cx="400" cy="250" r="9" fill="#f26722"></circle><text x="400" y="298" font-size="12" fill="#d1d1d1" text-anchor="middle" font-weight="700">agent</text></g><style>
        .inv-svg {
          font-family: inherit;
        }
        .wire {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: drawWire 0.6s ease-out forwards;
          animation-play-state: running;
        }
        .w1 {
          animation-delay: 0.3s;
        }
        .w2 {
          animation-delay: 0.5s;
        }
        .w3 {
          animation-delay: 0.7s;
        }
        .w4 {
          animation-delay: 0.9s;
        }
        .log {
          opacity: 0;
          transform: translateX(-8px);
          animation: logIn 0.28s ease-out forwards;
          animation-play-state: running;
        }
        .lg1 {
          animation-delay: 1.0s;
        }
        .lg2 {
          animation-delay: 1.25s;
        }
        .lg3 {
          animation-delay: 1.5s;
        }
        .lg4 {
          animation-delay: 1.75s;
        }
        .lg5 {
          animation-delay: 2.0s;
        }
        .lg6 {
          animation-delay: 2.25s;
        }
        .cfgHit {
          opacity: 0;
          animation: hitIn 0.4s ease-out 2.0s forwards;
          animation-play-state: running;
        }
        .prog {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: fill 3.0s ease-in-out 1.0s forwards;
          animation-play-state: running;
        }
        .agentCore {
          transform-box: fill-box;
          transform-origin: center;
          animation: corePulse 1.1s ease-in-out infinite;
          animation-play-state: running;
        }
        .agentRing {
          transform-box: fill-box;
          transform-origin: center;
          animation: ringPulse 1.8s ease-in-out infinite;
          animation-play-state: running;
        }
        @keyframes drawWire {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes logIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes hitIn {
          to {
            opacity: 1;
          }
        }
        @keyframes fill {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes corePulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.75;
          }
        }
        @keyframes ringPulse {
          0%,
          100% {
            transform: scale(0.92);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.2;
          }
        }

        
      </style></svg>`,
  resource: `<svg class="res-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A central agent connects to real tools: GitHub, Datadog, Wiki, Code, APIs, and a helper agent."><g fill="none" aria-hidden="true"><line class="link link-gh" x1="400" y1="256" x2="400" y2="96" stroke="#f26722" stroke-width="2" style="animation-delay:0.5s"></line><line class="link link-dd" x1="400" y1="256" x2="604" y2="168" stroke="#f26722" stroke-width="2" style="animation-delay:0.7s"></line><line class="link link-wiki" x1="400" y1="256" x2="604" y2="344" stroke="#f26722" stroke-width="2" style="animation-delay:0.9s"></line><line class="link link-code" x1="400" y1="256" x2="400" y2="416" stroke="#f26722" stroke-width="2" style="animation-delay:1.1s"></line><line class="link link-api" x1="400" y1="256" x2="196" y2="344" stroke="#f26722" stroke-width="2" style="animation-delay:1.3s"></line><line class="link link-helper" x1="400" y1="256" x2="196" y2="168" stroke="#f26722" stroke-width="2" style="animation-delay:1.5s"></line></g><g class="node node-gh" style="animation-delay:0.65s" aria-hidden="true"><circle cx="400" cy="96" r="30" fill="#211c15" stroke="#8b7e66" stroke-width="1.5"></circle><circle cx="400" cy="96" r="6" fill="#8b7e66"></circle><text x="400" y="144" font-size="12.5" fill="#f7f7f7" text-anchor="middle" font-weight="700">GitHub</text><text x="400" y="160" font-size="10" fill="#8b7e66" text-anchor="middle">recent changes</text></g><g class="node node-dd" style="animation-delay:0.85s" aria-hidden="true"><circle cx="604" cy="168" r="30" fill="#211c15" stroke="#8b7e66" stroke-width="1.5"></circle><circle cx="604" cy="168" r="6" fill="#8b7e66"></circle><text x="604" y="216" font-size="12.5" fill="#f7f7f7" text-anchor="middle" font-weight="700">Datadog</text><text x="604" y="232" font-size="10" fill="#8b7e66" text-anchor="middle">logs</text></g><g class="node node-wiki" style="animation-delay:1.05s" aria-hidden="true"><circle cx="604" cy="344" r="30" fill="#211c15" stroke="#8b7e66" stroke-width="1.5"></circle><circle cx="604" cy="344" r="6" fill="#8b7e66"></circle><text x="604" y="392" font-size="12.5" fill="#f7f7f7" text-anchor="middle" font-weight="700">Wiki</text><text x="604" y="408" font-size="10" fill="#8b7e66" text-anchor="middle">docs</text></g><g class="node node-code" style="animation-delay:1.25s" aria-hidden="true"><circle cx="400" cy="416" r="30" fill="#211c15" stroke="#8b7e66" stroke-width="1.5"></circle><circle cx="400" cy="416" r="6" fill="#8b7e66"></circle><text x="400" y="464" font-size="12.5" fill="#f7f7f7" text-anchor="middle" font-weight="700">Code</text></g><g class="node node-api" style="animation-delay:1.45s" aria-hidden="true"><circle cx="196" cy="344" r="30" fill="#211c15" stroke="#8b7e66" stroke-width="1.5"></circle><circle cx="196" cy="344" r="6" fill="#8b7e66"></circle><text x="196" y="392" font-size="12.5" fill="#f7f7f7" text-anchor="middle" font-weight="700">APIs</text></g><g class="node node-helper" style="animation-delay:1.65s" aria-hidden="true"><circle cx="196" cy="168" r="30" fill="#211c15" stroke="#8b7e66" stroke-width="1.5"></circle><circle cx="196" cy="168" r="6" fill="#8b7e66"></circle><text x="196" y="216" font-size="12.5" fill="#f7f7f7" text-anchor="middle" font-weight="700">Helper agent</text></g><g aria-hidden="true"><circle class="hub" cx="400" cy="256" r="42" fill="#1c1712" stroke="#f26722" stroke-width="2"></circle><circle class="hubCore" cx="400" cy="256" r="10" fill="#f26722"></circle><text x="400" y="260" font-size="11" fill="#f7f7f7" text-anchor="middle" font-weight="700" dy="14">investigator</text></g><style>
        .res-svg {
          font-family: inherit;
        }
        .link {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          opacity: 0.85;
          animation: lightUp 0.55s ease-out forwards;
          animation-play-state: running;
        }
        .node {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.6);
          animation: nodeIn 0.4s cubic-bezier(0.34, 1.5, 0.64, 1) forwards;
          animation-play-state: running;
        }
        .hub {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.6);
          animation: hubIn 0.5s cubic-bezier(0.34, 1.5, 0.64, 1) 0.1s forwards;
          animation-play-state: running;
        }
        .hubCore {
          transform-box: fill-box;
          transform-origin: center;
          animation: hubPulse 1.4s ease-in-out 1s infinite;
          animation-play-state: running;
        }
        @keyframes lightUp {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes nodeIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes hubIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes hubPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        
      </style></svg>`,
  draft: `<svg class="draft-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A draft spec with root cause, evidence citations, and a recommended fix attaches to the ticket, pending review."><g aria-hidden="true"><rect x="96" y="176" width="170" height="150" rx="10" fill="#f7f7f7"></rect><rect x="96" y="176" width="170" height="26" rx="10" fill="#d1d1d1"></rect><circle cx="116" cy="189" r="4.5" fill="#8b7e66"></circle><rect x="128" y="185" width="78" height="7" rx="3.5" fill="#8b7e66"></rect><rect x="112" y="220" width="130" height="8" rx="4" fill="#d1d1d1"></rect><rect x="112" y="238" width="110" height="8" rx="4" fill="#d1d1d1"></rect><rect x="112" y="256" width="138" height="8" rx="4" fill="#d1d1d1"></rect></g><path class="clip" d="M266 250 q28 0 40 0" fill="none" stroke="#8b7e66" stroke-width="2.5" stroke-linecap="round"></path><g class="doc"><rect x="312" y="96" width="378" height="308" rx="12" fill="#f7f7f7"></rect><rect x="312" y="96" width="378" height="38" rx="12" fill="#e7e2d6"></rect><text x="332" y="121" font-size="13" fill="#4a4a4a" font-weight="700">Draft spec</text><g class="pending"><rect x="596" y="106" width="78" height="20" rx="10" fill="#211c15"></rect><text x="608" y="120" font-size="10" fill="#f26722" font-weight="700">PENDING</text></g><text x="332" y="164" font-size="11" fill="#8b7e66" font-weight="700" letter-spacing="0.05em">ROOT CAUSE</text><g class="line r1"><rect x="332" y="174" width="300" height="9" rx="4.5" fill="#4a4a4a"></rect></g><g class="line r2"><rect x="332" y="190" width="240" height="9" rx="4.5" fill="#4a4a4a"></rect></g><text x="332" y="230" font-size="11" fill="#8b7e66" font-weight="700" letter-spacing="0.05em">EVIDENCE</text><g class="chip chip-code" style="animation-delay:1.9s"><rect x="348" y="240" width="50" height="24" rx="12" fill="#1c1712" stroke="#8b7e66" stroke-width="1"></rect><circle cx="361" cy="252" r="3.5" fill="#f26722"></circle><text x="370" y="256" font-size="10.5" fill="#d1d1d1">code</text></g><g class="chip chip-change" style="animation-delay:2.08s"><rect x="410" y="240" width="64" height="24" rx="12" fill="#1c1712" stroke="#8b7e66" stroke-width="1"></rect><circle cx="423" cy="252" r="3.5" fill="#f26722"></circle><text x="432" y="256" font-size="10.5" fill="#d1d1d1">change</text></g><g class="chip chip-log" style="animation-delay:2.26s"><rect x="486" y="240" width="43" height="24" rx="12" fill="#1c1712" stroke="#8b7e66" stroke-width="1"></rect><circle cx="499" cy="252" r="3.5" fill="#f26722"></circle><text x="508" y="256" font-size="10.5" fill="#d1d1d1">log</text></g><g class="chip chip-wiki" style="animation-delay:2.44s"><rect x="540" y="240" width="50" height="24" rx="12" fill="#1c1712" stroke="#8b7e66" stroke-width="1"></rect><circle cx="553" cy="252" r="3.5" fill="#f26722"></circle><text x="562" y="256" font-size="10.5" fill="#d1d1d1">wiki</text></g><text x="332" y="300" font-size="11" fill="#8b7e66" font-weight="700" letter-spacing="0.05em">RECOMMENDED FIX</text><g class="line f1"><rect x="332" y="310" width="280" height="9" rx="4.5" fill="#4a4a4a"></rect></g><g class="line f2"><rect x="332" y="326" width="200" height="9" rx="4.5" fill="#4a4a4a"></rect></g><g class="line f3"><rect x="332" y="360" width="150" height="26" rx="6" fill="none" stroke="#f26722" stroke-width="1.4"></rect><text x="352" y="377" font-size="11" fill="#f26722" font-weight="600">Roll back config</text></g></g><style>
        .draft-svg {
          font-family: inherit;
        }
        .doc {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translateY(14px) scale(0.97);
          animation: docIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
          animation-play-state: running;
        }
        .clip {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: clipIn 0.4s ease-out 0.75s forwards;
          animation-play-state: running;
        }
        .line rect {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: reveal 0.45s ease-out forwards;
          animation-play-state: running;
        }
        .line {
          animation-play-state: running;
        }
        .r1 rect {
          animation-delay: 0.9s;
        }
        .r2 rect {
          animation-delay: 1.15s;
        }
        .f1 rect {
          animation-delay: 2.75s;
        }
        .f2 rect {
          animation-delay: 3.0s;
        }
        .f3 {
          opacity: 0;
          animation: fixIn 0.4s ease-out 3.35s forwards;
          animation-play-state: running;
        }
        .chip {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.5);
          animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-play-state: running;
        }
        .pending {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: pendIn 0.4s ease-out 3.7s forwards;
          animation-play-state: running;
        }
        @keyframes docIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes clipIn {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes reveal {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes pop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fixIn {
          to {
            opacity: 1;
          }
        }
        @keyframes pendIn {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }
          60% {
            opacity: 1;
            transform: scale(1.12);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        
      </style></svg>`,
  approve: `<svg class="apr-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="In a #triage channel, the team reviews a recommended-action summary and a cursor clicks Approve."><g aria-hidden="true"><rect x="150" y="78" width="500" height="344" rx="16" fill="#211c15" stroke="#4a4a4a"></rect><text x="176" y="116" font-size="18" fill="#8b7e66" font-weight="700">#</text><text x="194" y="115" font-size="15" fill="#f7f7f7" font-weight="700">triage</text><line x1="150" y1="132" x2="650" y2="132" stroke="#4a4a4a"></line></g><g class="post"><circle cx="192" cy="176" r="13" fill="#f26722"></circle><circle cx="192" cy="176" r="4.5" fill="#1c1712"></circle><text x="216" y="164" font-size="12" fill="#8b7e66" font-weight="700">triage-agent</text><rect x="216" y="176" width="404" height="130" rx="10" fill="#f7f7f7"></rect><text x="234" y="200" font-size="11" fill="#8b7e66" font-weight="700" letter-spacing="0.05em">RECOMMENDED</text><rect x="234" y="212" width="300" height="9" rx="4.5" fill="#4a4a4a"></rect><rect x="234" y="230" width="230" height="9" rx="4.5" fill="#4a4a4a"></rect><g class="approveBtn"><rect class="approveBg" x="234" y="258" width="120" height="34" rx="8" fill="#f26722"></rect><text class="approveLabel" x="294" y="280" font-size="13" fill="#1c1712" font-weight="700" text-anchor="middle">Approve</text></g><g><rect x="368" y="258" width="130" height="34" rx="8" fill="none" stroke="#8b7e66" stroke-width="1.4"></rect><text x="386" y="280" font-size="12" fill="#8b7e66">Dig deeper</text></g></g><g aria-hidden="true"><circle class="rev rev1" cx="216" cy="360" r="15" fill="#8b7e66"></circle><circle class="rev rev2" cx="250" cy="360" r="15" fill="#6f6553"></circle><circle class="rev rev3" cx="284" cy="360" r="15" fill="#4a4335"></circle><text class="rev rev3" x="312" y="365" font-size="12" fill="#8b7e66">reviewing…</text></g><g class="approved"><rect x="446" y="384" width="150" height="32" rx="16" fill="#211c15" stroke="#f26722" stroke-width="1.4"></rect><path d="M468 400 l6 6 l12 -13" fill="none" stroke="#f26722" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path><text x="496" y="405" font-size="12" fill="#f7f7f7" font-weight="700">Approved</text></g><g class="cursor" aria-hidden="true"><path d="M0 0 L0 16 L4.5 12.5 L7.5 18.5 L10 17.2 L7 11.2 L12 11 Z" fill="#f7f7f7" stroke="#2b2b2b" stroke-width="0.8"></path></g><style>
        .apr-svg {
          font-family: inherit;
        }
        .post {
          opacity: 0;
          transform: translateY(16px);
          animation: postIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
          animation-play-state: running;
        }
        .rev {
          opacity: 0;
          animation: revIn 0.4s ease-out forwards;
          animation-play-state: running;
        }
        .rev1 {
          animation-delay: 1.0s;
        }
        .rev2 {
          animation-delay: 1.2s;
        }
        .rev3 {
          animation-delay: 1.4s;
        }
        .cursor {
          transform-box: view-box;
          transform-origin: 0 0;
          opacity: 0;
          animation: cursorPath 2.2s cubic-bezier(0.45, 0, 0.2, 1) 1.6s forwards;
          animation-play-state: running;
        }
        .approveBtn {
          transform-box: fill-box;
          transform-origin: center;
          animation: click 0.3s ease-out 3.5s forwards;
          animation-play-state: running;
        }
        .approved {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.7);
          animation: apprIn 0.4s cubic-bezier(0.34, 1.5, 0.64, 1) 3.85s forwards;
          animation-play-state: running;
        }
        @keyframes postIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes revIn {
          to {
            opacity: 1;
          }
        }
        @keyframes cursorPath {
          0% {
            opacity: 0;
            transform: translate(520px, 120px);
          }
          20% {
            opacity: 1;
          }
          70% {
            transform: translate(300px, 300px);
          }
          88% {
            transform: translate(292px, 274px);
          }
          100% {
            opacity: 1;
            transform: translate(292px, 274px) scale(0.85);
          }
        }
        @keyframes click {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.93);
          }
        }
        @keyframes apprIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        
      </style></svg>`,
  resolve: `<svg class="rsl-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Three dispositions are weighed and the ticket is decisively stamped Urgent."><g aria-hidden="true"><rect x="250" y="96" width="300" height="150" rx="10" fill="#f7f7f7"></rect><rect x="250" y="96" width="300" height="30" rx="10" fill="#d1d1d1"></rect><circle cx="272" cy="111" r="5" fill="#8b7e66"></circle><rect x="286" y="107" width="100" height="8" rx="4" fill="#8b7e66"></rect><rect x="270" y="148" width="200" height="9" rx="4.5" fill="#d1d1d1"></rect><rect x="270" y="170" width="170" height="9" rx="4.5" fill="#d1d1d1"></rect><rect x="270" y="192" width="220" height="9" rx="4.5" fill="#d1d1d1"></rect></g><g class="stamp"><rect x="424" y="132" width="118" height="40" rx="7" fill="none" stroke="#f26722" stroke-width="3" transform="rotate(-8 483 152)"></rect><text x="483" y="159" font-size="20" fill="#f26722" font-weight="800" text-anchor="middle" letter-spacing="0.06em" transform="rotate(-8 483 152)">URGENT</text></g><g class="opt opt1"><rect x="150" y="330" width="150" height="70" rx="12" fill="#211c15" stroke="#4a4a4a" stroke-width="1.5"></rect><text x="225" y="360" font-size="13" fill="#d1d1d1" text-anchor="middle" font-weight="700">Won&#x27;t fix</text><text x="225" y="380" font-size="10" fill="#8b7e66" text-anchor="middle">close</text></g><g class="opt opt2 chosen"><rect class="chosenBox" x="325" y="322" width="150" height="86" rx="12" fill="#1c1712" stroke="#f26722" stroke-width="2"></rect><text x="400" y="356" font-size="15" fill="#f26722" text-anchor="middle" font-weight="800">Urgent</text><text x="400" y="378" font-size="10" fill="#d1d1d1" text-anchor="middle">act now</text></g><g class="opt opt3"><rect x="500" y="330" width="150" height="70" rx="12" fill="#211c15" stroke="#4a4a4a" stroke-width="1.5"></rect><text x="575" y="356" font-size="13" fill="#d1d1d1" text-anchor="middle" font-weight="700">Will fix</text><text x="575" y="376" font-size="10" fill="#8b7e66" text-anchor="middle">backlog</text></g><rect class="sweep" x="150" y="326" width="150" height="78" rx="12" fill="none" stroke="#f7f7f7" stroke-width="2" opacity="0"></rect><style>
        .rsl-svg {
          font-family: inherit;
        }
        .opt {
          opacity: 0;
          transform: translateY(12px);
          animation: optIn 0.4s ease-out forwards;
          animation-play-state: running;
        }
        .opt1 {
          animation-delay: 0.3s;
        }
        .opt2 {
          animation-delay: 0.5s;
        }
        .opt3 {
          animation-delay: 0.7s;
        }
        /* non-chosen options dim after the decision */
        .opt1,
        .opt3 {
          animation: optIn 0.4s ease-out forwards, dim 0.5s ease-out 2.9s forwards;
          animation-play-state: running;
        }
        .opt1 {
          animation-delay: 0.3s, 2.9s;
        }
        .opt3 {
          animation-delay: 0.7s, 2.9s;
        }
        .chosenBox {
          transform-box: fill-box;
          transform-origin: center;
          animation: chosenPulse 0.5s ease-out 2.9s;
          animation-play-state: running;
        }
        .sweep {
          animation: sweepMove 1.6s ease-in-out 1.1s forwards;
          animation-play-state: running;
        }
        .stamp {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(2.1) rotate(4deg);
          animation: stampIn 0.45s cubic-bezier(0.3, 1.2, 0.5, 1) 3.05s forwards;
          animation-play-state: running;
        }
        @keyframes optIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dim {
          to {
            opacity: 0.32;
          }
        }
        @keyframes chosenPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }
        @keyframes sweepMove {
          0% {
            opacity: 0.9;
            transform: translate(0, 0);
          }
          28% {
            transform: translate(175px, -4px);
          }
          60% {
            opacity: 0.9;
            transform: translate(350px, 0);
          }
          80% {
            transform: translate(175px, -4px);
          }
          100% {
            opacity: 0;
            transform: translate(175px, -4px);
          }
        }
        @keyframes stampIn {
          0% {
            opacity: 0;
            transform: scale(2.1) rotate(4deg);
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        
      </style></svg>`,
  learn: `<svg class="learn-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A learning flywheel compares hypothesis against the actual resolution and refines the rulebook, which gets sharper."><g aria-hidden="true"><path class="loop" d="M 520 250 A 120 120 0 1 1 519 244" fill="none" stroke="#4a4a4a" stroke-width="3"></path><path class="loopHot" d="M 520 250 A 120 120 0 1 1 519 244" fill="none" stroke="#f26722" stroke-width="3" stroke-linecap="round" marker-end="url(#learnArrow)"></path><g class="orbit"><circle cx="400" cy="130" r="6" fill="#f26722"></circle></g></g><defs><marker id="learnArrow" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="#f26722"></path></marker></defs><g aria-hidden="true"><circle class="glow" cx="400" cy="250" r="70" fill="#f26722" opacity="0"></circle><rect x="356" y="200" width="88" height="100" rx="6" fill="#8b7e66"></rect><rect x="356" y="200" width="18" height="100" rx="6" fill="#6f6553"></rect><rect class="newPage" x="380" y="210" width="52" height="80" rx="3" fill="#f7f7f7"></rect><rect x="388" y="224" width="38" height="5" rx="2.5" fill="#8b7e66" opacity="0.6"></rect><rect x="388" y="236" width="38" height="5" rx="2.5" fill="#8b7e66" opacity="0.45"></rect><rect class="newRule" x="388" y="248" width="38" height="5" rx="2.5" fill="#f26722"></rect><rect x="388" y="260" width="30" height="5" rx="2.5" fill="#8b7e66" opacity="0.3"></rect><rect class="bookMark" x="410" y="194" width="12" height="28" rx="1.5" fill="#f26722"></rect><text x="400" y="330" font-size="12" fill="#d1d1d1" text-anchor="middle" font-weight="700">rulebook</text></g><g aria-hidden="true"><text x="400" y="158" font-size="12" fill="#8b7e66" text-anchor="middle">rules</text><text class="countOld" x="400" y="186" font-size="24" fill="#8b7e66" text-anchor="middle" font-weight="800">24</text><text class="countNew" x="400" y="186" font-size="24" fill="#f26722" text-anchor="middle" font-weight="800">25</text></g><g class="diff"><rect x="70" y="196" width="210" height="108" rx="10" fill="#f7f7f7"></rect><text x="86" y="218" font-size="10.5" fill="#8b7e66" font-weight="700" letter-spacing="0.05em">HYPOTHESIS vs ACTUAL</text><circle cx="92" cy="242" r="4" fill="#8b7e66"></circle><text x="104" y="246" font-size="12" fill="#4a4a4a">config change</text><circle cx="92" cy="270" r="4" fill="#f26722"></circle><text x="104" y="274" font-size="12" fill="#f26722" font-weight="700">config rollback</text><path class="feedArrow" d="M286 250 q30 0 44 0" fill="none" stroke="#f26722" stroke-width="2.5" stroke-linecap="round" marker-end="url(#learnArrow)"></path></g><style>
        .learn-svg {
          font-family: inherit;
        }
        .loopHot {
          stroke-dasharray: 760;
          stroke-dashoffset: 760;
          animation: drawLoop 1.4s ease-out 0.3s forwards;
          animation-play-state: running;
        }
        .orbit {
          transform-box: view-box;
          transform-origin: 400px 250px;
          animation: orbit 3.4s linear 1.6s infinite;
          animation-play-state: running;
        }
        .diff {
          opacity: 0;
          transform: translateX(-24px);
          animation: diffIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
          animation-play-state: running;
        }
        .feedArrow {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: feed 0.5s ease-out 1.3s forwards;
          animation-play-state: running;
        }
        .newPage {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: pageIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.9s forwards;
          animation-play-state: running;
        }
        .newRule {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: ruleWrite 0.5s ease-out 2.5s forwards;
          animation-play-state: running;
        }
        .glow {
          transform-box: fill-box;
          transform-origin: center;
          animation: glowPulse 0.9s ease-out 2.3s;
          animation-play-state: running;
        }
        .countOld {
          animation: fadeOut 0.3s ease-out 2.5s forwards;
          animation-play-state: running;
        }
        .countNew {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: translateY(10px);
          animation: countUp 0.4s cubic-bezier(0.34, 1.5, 0.64, 1) 2.55s forwards;
          animation-play-state: running;
        }
        .bookMark {
          transform-box: fill-box;
          transform-origin: center top;
          transform: scaleY(0);
          animation: markIn 0.35s ease-out 2.1s forwards;
          animation-play-state: running;
        }
        @keyframes drawLoop {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes orbit {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes diffIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes feed {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pageIn {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes ruleWrite {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes glowPulse {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          40% {
            opacity: 0.35;
          }
          100% {
            opacity: 0;
            transform: scale(1.1);
          }
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
          }
        }
        @keyframes countUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes markIn {
          to {
            transform: scaleY(1);
          }
        }

        
      </style></svg>`,
};
