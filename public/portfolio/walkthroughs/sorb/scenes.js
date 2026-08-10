window.WT_SORB_SCENES = {
  subject: `<svg class="sub-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A brand token approved in Figma is re-typed in code, where its value drifts a shade off; a red drift flag ghosts in between and the seam pulses."><g class="panel figPanel" aria-hidden="true"><rect x="70" y="110" width="260" height="280" rx="14" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="92" cy="136" r="5" fill="#f26722"></circle><text x="106" y="140" font-size="11" fill="#8b7e66" font-weight="600">Figma · Variables</text><rect x="90" y="160" width="220" height="1" fill="#4a4a4a"></rect><rect class="figSwatch" x="92" y="188" width="44" height="44" rx="9" fill="#f26722"></rect><text x="150" y="204" font-size="13" fill="#f7f7f7" font-weight="700">--color-brand</text><text x="150" y="224" font-size="12" fill="#8b7e66" font-family="monospace">#f26722</text><g class="approved"><rect x="92" y="270" width="86" height="24" rx="12" fill="#1c2a19" stroke="#4a7a3a"></rect><path d="M104 282 l5 5 l9 -11" fill="none" stroke="#6cc24a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><text x="124" y="286" font-size="11" fill="#8fce6f" font-weight="600">approved</text></g></g><g class="panel codePanel" aria-hidden="true"><rect x="470" y="110" width="260" height="280" rx="14" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="492" cy="136" r="5" fill="#8b7e66"></circle><text x="506" y="140" font-size="11" fill="#8b7e66" font-weight="600" font-family="monospace">theme.css</text><rect x="490" y="160" width="220" height="1" fill="#4a4a4a"></rect><rect x="492" y="180" width="120" height="7" rx="3.5" fill="#3f382d"></rect><rect x="492" y="240" width="150" height="7" rx="3.5" fill="#3f382d"></rect><rect x="492" y="258" width="110" height="7" rx="3.5" fill="#3f382d"></rect><rect class="codeSwatch" x="492" y="200" width="22" height="22" rx="5" fill="#f26722"></rect><text x="524" y="217" font-size="12" fill="#d1d1d1" font-family="monospace">--color-brand:</text><text class="valOrig" x="648" y="217" font-size="12" fill="#f26722" font-family="monospace" font-weight="700">#f26722</text><text class="valDrift" x="648" y="217" font-size="12" fill="#d9622a" font-family="monospace" font-weight="700">#d9622a</text></g><line class="seam" x1="400" y1="130" x2="400" y2="370" stroke="#f26722" stroke-width="2" stroke-dasharray="6 6" stroke-linecap="round"></line><g class="driftFlag" aria-hidden="true"><rect x="336" y="228" width="128" height="44" rx="10" fill="#2a1512" stroke="#ff5a4d" stroke-width="1.5"></rect><path d="M360 262 l11 -20 l11 20 z" fill="none" stroke="#ff5a4d" stroke-width="1.6" stroke-linejoin="round"></path><text x="371" y="258" font-size="12" text-anchor="middle" fill="#ff8578" font-weight="700">!</text><text x="392" y="255" font-size="13" fill="#ff8578" font-weight="700">drift</text></g><text class="caption" x="400" y="416" font-size="12" fill="#8b7e66" text-anchor="middle">approved once · re-typed by hand · quietly drifts</text><style>
        .sub-svg {
          font-family: inherit;
        }
        .panel {
          opacity: 0;
          animation: fade 0.5s ease-out forwards;
          animation-play-state: running;
        }
        .figPanel {
          animation-delay: 0.2s;
        }
        .codePanel {
          animation-delay: 0.4s;
        }
        .figSwatch {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.6);
          animation: pop 0.45s cubic-bezier(0.34, 1.5, 0.64, 1) 0.7s forwards;
          animation-play-state: running;
        }
        .approved {
          opacity: 0;
          animation: fade 0.4s ease-out 1.0s forwards;
          animation-play-state: running;
        }
        .codeSwatch {
          fill: #f26722;
          animation: drift 0.8s ease-in-out 1.7s forwards;
          animation-play-state: running;
        }
        .valOrig {
          animation: fadeOut 0.6s ease-out 1.7s forwards;
          animation-play-state: running;
        }
        .valDrift {
          opacity: 0;
          animation: fade 0.6s ease-out 1.9s forwards;
          animation-play-state: running;
        }
        .seam {
          opacity: 0;
          animation: fade 0.4s ease-out 1.0s forwards, seamPulse 1.6s ease-in-out 1.4s infinite;
          animation-play-state: running;
        }
        .driftFlag {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.85);
          animation: flagIn 0.5s cubic-bezier(0.34, 1.5, 0.64, 1) 2.2s forwards, flagGhost 1.8s ease-in-out 2.9s infinite;
          animation-play-state: running;
        }
        .caption {
          opacity: 0;
          animation: fade 0.5s ease-out 2.6s forwards;
          animation-play-state: running;
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
          }
        }
        @keyframes pop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes drift {
          to {
            fill: #d9622a;
          }
        }
        @keyframes seamPulse {
          0%,
          100% {
            opacity: 0.35;
            stroke-width: 2;
          }
          50% {
            opacity: 1;
            stroke-width: 3;
          }
        }
        @keyframes flagIn {
          to {
            opacity: 0.9;
            transform: scale(1);
          }
        }
        @keyframes flagGhost {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.95;
          }
        }

        
      </style></svg>`,
  architecture: `<svg class="arc-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A shared Core contract slab lays down; four repo cards — Canopy, Juice, Leaf, Seed — grow off it like a tree; a JavaScript-only, esbuild tag pins orange."><g class="jsTag" aria-hidden="true"><rect x="292" y="80" width="216" height="30" rx="15" fill="#1c1712" stroke="#f26722" stroke-width="1.4"></rect><circle cx="312" cy="95" r="5" fill="#f26722"></circle><text x="326" y="99" font-size="12" fill="#f26722" font-weight="600" font-family="monospace">JavaScript only · esbuild</text></g><g fill="none" stroke="#8b7e66" stroke-width="2" aria-hidden="true"><line class="connector c0" x1="165" y1="360" x2="165" y2="272" stroke-linecap="round"></line><line class="connector c1" x1="323" y1="360" x2="323" y2="272" stroke-linecap="round"></line><line class="connector c2" x1="481" y1="360" x2="481" y2="272" stroke-linecap="round"></line><line class="connector c3" x1="639" y1="360" x2="639" y2="272" stroke-linecap="round"></line></g><g class="card k0" aria-hidden="true"><rect x="100" y="152" width="130" height="120" rx="12" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="122" cy="180" r="7" fill="#f26722"></circle><text x="140" y="185" font-size="15" fill="#f7f7f7" font-weight="700">Canopy</text><text x="116" y="220" font-size="11" fill="#8b7e66">Figma plugin</text><rect x="116" y="238" width="98" height="18" rx="5" fill="#1c1712" stroke="#3f382d"></rect><text x="124" y="251" font-size="9" fill="#8b7e66" font-family="monospace">own git repo</text></g><g class="card k1" aria-hidden="true"><rect x="258" y="152" width="130" height="120" rx="12" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="280" cy="180" r="7" fill="#f26722"></circle><text x="298" y="185" font-size="15" fill="#f7f7f7" font-weight="700">Juice</text><text x="274" y="220" font-size="11" fill="#8b7e66">bridge server</text><rect x="274" y="238" width="98" height="18" rx="5" fill="#1c1712" stroke="#3f382d"></rect><text x="282" y="251" font-size="9" fill="#8b7e66" font-family="monospace">own git repo</text></g><g class="card k2" aria-hidden="true"><rect x="416" y="152" width="130" height="120" rx="12" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="438" cy="180" r="7" fill="#f26722"></circle><text x="456" y="185" font-size="15" fill="#f7f7f7" font-weight="700">Leaf</text><text x="432" y="220" font-size="11" fill="#8b7e66">React SDK</text><rect x="432" y="238" width="98" height="18" rx="5" fill="#1c1712" stroke="#3f382d"></rect><text x="440" y="251" font-size="9" fill="#8b7e66" font-family="monospace">own git repo</text></g><g class="card k3" aria-hidden="true"><rect x="574" y="152" width="130" height="120" rx="12" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="596" cy="180" r="7" fill="#f26722"></circle><text x="614" y="185" font-size="15" fill="#f7f7f7" font-weight="700">Seed</text><text x="590" y="220" font-size="11" fill="#8b7e66">capture · resolve</text><rect x="590" y="238" width="98" height="18" rx="5" fill="#1c1712" stroke="#3f382d"></rect><text x="598" y="251" font-size="9" fill="#8b7e66" font-family="monospace">own git repo</text></g><g class="coreSlab" aria-hidden="true"><rect x="150" y="360" width="500" height="60" rx="14" fill="#1c1712" stroke="#f26722" stroke-width="1.6"></rect><text x="176" y="386" font-size="16" fill="#f7f7f7" font-weight="700">Core</text><text x="176" y="404" font-size="11" fill="#8b7e66" font-family="monospace">@sorb/core · shared typedef contract</text><g class="tick tk0"><circle cx="520" cy="390" r="11" fill="#211c15" stroke="#4a7a3a"></circle><path d="M515 390 l4 4 l7 -8" fill="none" stroke="#6cc24a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="tick tk1"><circle cx="560" cy="390" r="11" fill="#211c15" stroke="#4a7a3a"></circle><path d="M555 390 l4 4 l7 -8" fill="none" stroke="#6cc24a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="tick tk2"><circle cx="600" cy="390" r="11" fill="#211c15" stroke="#4a7a3a"></circle><path d="M595 390 l4 4 l7 -8" fill="none" stroke="#6cc24a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></g><text class="caption" x="400" y="446" font-size="12" fill="#8b7e66" text-anchor="middle">one contract · four packages · public or private on their own</text><style>
        .arc-svg {
          font-family: inherit;
        }
        .coreSlab {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: translateY(20px);
          animation: slabIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
          animation-play-state: running;
        }
        .tick {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.4);
          animation: pop 0.4s cubic-bezier(0.34, 1.6, 0.64, 1) forwards;
          animation-play-state: running;
        }
        .tk0 {
          animation-delay: 0.7s;
        }
        .tk1 {
          animation-delay: 0.9s;
        }
        .tk2 {
          animation-delay: 1.1s;
        }
        .connector {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: draw 0.4s ease-out forwards;
          animation-play-state: running;
        }
        .c0 {
          animation-delay: 1.1s;
        }
        .c1 {
          animation-delay: 1.3s;
        }
        .c2 {
          animation-delay: 1.5s;
        }
        .c3 {
          animation-delay: 1.7s;
        }
        .card {
          transform-box: fill-box;
          transform-origin: bottom center;
          opacity: 0;
          transform: translateY(16px) scale(0.9);
          animation: grow 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-play-state: running;
        }
        .k0 {
          animation-delay: 1.2s;
        }
        .k1 {
          animation-delay: 1.4s;
        }
        .k2 {
          animation-delay: 1.6s;
        }
        .k3 {
          animation-delay: 1.8s;
        }
        .jsTag {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.8);
          animation: pop 0.45s cubic-bezier(0.34, 1.5, 0.64, 1) 2.1s forwards;
          animation-play-state: running;
        }
        .caption {
          opacity: 0;
          animation: fade 0.5s ease-out 2.4s forwards;
          animation-play-state: running;
        }
        @keyframes slabIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes grow {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }

        
      </style></svg>`,
  twoModes: `<svg class="tm-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A Juice server cube; a toggle flips from local single-tenant to hosted multi-tenant; auth, entitlements and CORS shields snap on as DATABASE_URL slots in; the cube clones into a tenant grid."><g aria-hidden="true"><rect class="track" x="100" y="118" width="200" height="34" rx="17" fill="#211c15" stroke="#4a4a4a"></rect><circle class="knob" cx="119" cy="135" r="13" fill="#8b7e66"></circle><text class="modeLocal" x="200" y="180" font-size="12" fill="#8b7e66" text-anchor="middle" font-family="monospace">local · dev-dep · single-tenant</text><text class="modeHosted" x="200" y="180" font-size="12" fill="#f26722" text-anchor="middle" font-weight="700" font-family="monospace">hosted · multi-tenant</text></g><g class="cube" aria-hidden="true"><polygon points="120,214 150,188 270,188 240,214" fill="#2a241c" stroke="#f26722" stroke-width="1.4"></polygon><polygon points="240,214 270,188 270,300 240,326" fill="#171310" stroke="#f26722" stroke-width="1.4"></polygon><rect x="120" y="214" width="120" height="112" fill="#211c15" stroke="#f26722" stroke-width="1.4"></rect><text x="180" y="266" font-size="17" fill="#f7f7f7" font-weight="700" text-anchor="middle">Juice</text><text x="180" y="286" font-size="9.5" fill="#8b7e66" text-anchor="middle" font-family="monospace">one binary</text></g><g class="dbChip" aria-hidden="true"><rect x="112" y="344" width="156" height="26" rx="7" fill="#1c1712" stroke="#f26722" stroke-width="1.3"></rect><circle cx="128" cy="357" r="4.5" fill="#f26722"></circle><text x="140" y="361" font-size="11" fill="#f26722" font-family="monospace" font-weight="600">DATABASE_URL</text></g><g class="shield sh0" aria-hidden="true"><path d="M300 196 l16 0 l0 12 c0 8 -8 12 -8 14 c0 -2 -8 -6 -8 -14 z" fill="#1c2a19" stroke="#6cc24a" stroke-width="1.3"></path><path d="M304 207 l3 3 l6 -7" fill="none" stroke="#6cc24a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path><text x="324" y="212" font-size="12" fill="#8fce6f" font-weight="600">auth</text></g><g class="shield sh1" aria-hidden="true"><path d="M300 240 l16 0 l0 12 c0 8 -8 12 -8 14 c0 -2 -8 -6 -8 -14 z" fill="#1c2a19" stroke="#6cc24a" stroke-width="1.3"></path><path d="M304 251 l3 3 l6 -7" fill="none" stroke="#6cc24a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path><text x="324" y="256" font-size="12" fill="#8fce6f" font-weight="600">entitlements</text></g><g class="shield sh2" aria-hidden="true"><path d="M300 284 l16 0 l0 12 c0 8 -8 12 -8 14 c0 -2 -8 -6 -8 -14 z" fill="#1c2a19" stroke="#6cc24a" stroke-width="1.3"></path><path d="M304 295 l3 3 l6 -7" fill="none" stroke="#6cc24a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path><text x="324" y="300" font-size="12" fill="#8fce6f" font-weight="600">CORS</text></g><g class="gcube gc0" aria-hidden="true"><polygon points="480,204 494,190 540,190 526,204" fill="#2a241c" stroke="#4a4a4a"></polygon><polygon points="526,204 540,190 540,250 526,264" fill="#171310" stroke="#4a4a4a"></polygon><rect x="480" y="204" width="46" height="60" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="503" cy="234" r="6" fill="#f26722"></circle></g><g class="gcube gc1" aria-hidden="true"><polygon points="562,204 576,190 622,190 608,204" fill="#2a241c" stroke="#4a4a4a"></polygon><polygon points="608,204 622,190 622,250 608,264" fill="#171310" stroke="#4a4a4a"></polygon><rect x="562" y="204" width="46" height="60" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="585" cy="234" r="6" fill="#f26722"></circle></g><g class="gcube gc2" aria-hidden="true"><polygon points="644,204 658,190 704,190 690,204" fill="#2a241c" stroke="#4a4a4a"></polygon><polygon points="690,204 704,190 704,250 690,264" fill="#171310" stroke="#4a4a4a"></polygon><rect x="644" y="204" width="46" height="60" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="667" cy="234" r="6" fill="#f26722"></circle></g><g class="gcube gc3" aria-hidden="true"><polygon points="480,300 494,286 540,286 526,300" fill="#2a241c" stroke="#4a4a4a"></polygon><polygon points="526,300 540,286 540,346 526,360" fill="#171310" stroke="#4a4a4a"></polygon><rect x="480" y="300" width="46" height="60" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="503" cy="330" r="6" fill="#f26722"></circle></g><g class="gcube gc4" aria-hidden="true"><polygon points="562,300 576,286 622,286 608,300" fill="#2a241c" stroke="#4a4a4a"></polygon><polygon points="608,300 622,286 622,346 608,360" fill="#171310" stroke="#4a4a4a"></polygon><rect x="562" y="300" width="46" height="60" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="585" cy="330" r="6" fill="#f26722"></circle></g><g class="gcube gc5" aria-hidden="true"><polygon points="644,300 658,286 704,286 690,300" fill="#2a241c" stroke="#4a4a4a"></polygon><polygon points="690,300 704,286 704,346 690,360" fill="#171310" stroke="#4a4a4a"></polygon><rect x="644" y="300" width="46" height="60" fill="#211c15" stroke="#4a4a4a"></rect><circle cx="667" cy="330" r="6" fill="#f26722"></circle></g><text class="gridLabel" x="602" y="360" font-size="12" fill="#8b7e66" text-anchor="middle">tenants</text><style>
        .tm-svg {
          font-family: inherit;
        }
        .cube {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.85);
          animation: pop 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 0.2s forwards;
          animation-play-state: running;
        }
        .knob {
          transform-box: fill-box;
          transform-origin: center;
          animation: slideKnob 0.6s cubic-bezier(0.4, 0, 0.2, 1) 1.0s forwards;
          animation-play-state: running;
        }
        .modeLocal {
          animation: fadeOut 0.5s ease-out 1.0s forwards;
          animation-play-state: running;
        }
        .modeHosted {
          opacity: 0;
          animation: fade 0.5s ease-out 1.2s forwards;
          animation-play-state: running;
        }
        .dbChip {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translateX(-70px);
          animation: slotIn 0.6s cubic-bezier(0.34, 1.3, 0.64, 1) 1.6s forwards;
          animation-play-state: running;
        }
        .shield {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.4);
          animation: pop 0.4s cubic-bezier(0.34, 1.6, 0.64, 1) forwards;
          animation-play-state: running;
        }
        .sh0 {
          animation-delay: 2.1s;
        }
        .sh1 {
          animation-delay: 2.25s;
        }
        .sh2 {
          animation-delay: 2.4s;
        }
        .gcube {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.5);
          animation: pop 0.4s cubic-bezier(0.34, 1.5, 0.64, 1) forwards;
          animation-play-state: running;
        }
        .gc0 {
          animation-delay: 2.7s;
        }
        .gc1 {
          animation-delay: 2.82s;
        }
        .gc2 {
          animation-delay: 2.94s;
        }
        .gc3 {
          animation-delay: 3.06s;
        }
        .gc4 {
          animation-delay: 3.18s;
        }
        .gc5 {
          animation-delay: 3.3s;
        }
        .gridLabel {
          opacity: 0;
          animation: fade 0.5s ease-out 3.5s forwards;
          animation-play-state: running;
        }
        @keyframes pop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideKnob {
          to {
            transform: translateX(162px);
          }
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
          }
        }
        @keyframes slotIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        
      </style></svg>`,
  agents: `<svg class="ag-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="An MCP socket clips onto the Juice cube; an agent proposes a token change routed through a WCAG contrast checker then a human Approve gate; a three-beat AI-proposes, human-reviews, app-verifies loop pins."><defs><marker id="agArrow" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto"><path d="M0 0 L8 4.5 L0 9 Z" fill="#8b7e66"></path></marker><marker id="agArrowHot" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto"><path d="M0 0 L8 4.5 L0 9 Z" fill="#f26722"></path></marker></defs><g class="cube" aria-hidden="true"><polygon points="72,150 96,128 186,128 162,150" fill="#2a241c" stroke="#f26722" stroke-width="1.3"></polygon><polygon points="162,150 186,128 186,236 162,258" fill="#171310" stroke="#f26722" stroke-width="1.3"></polygon><rect x="72" y="150" width="90" height="108" fill="#211c15" stroke="#f26722" stroke-width="1.3"></rect><text x="117" y="200" font-size="14" fill="#f7f7f7" font-weight="700" text-anchor="middle">Juice</text></g><g class="mcp" aria-hidden="true"><rect x="92" y="96" width="70" height="26" rx="6" fill="#1c1712" stroke="#f26722" stroke-width="1.3"></rect><text x="127" y="113" font-size="11" fill="#f26722" font-weight="700" text-anchor="middle" font-family="monospace">MCP</text><rect x="106" y="120" width="6" height="10" fill="#f26722"></rect><rect x="142" y="120" width="6" height="10" fill="#f26722"></rect></g><g class="agent" aria-hidden="true"><circle cx="150" cy="322" r="26" fill="#211c15" stroke="#8b7e66" stroke-width="1.4"></circle><circle cx="141" cy="316" r="3.5" fill="#d1d1d1"></circle><circle cx="159" cy="316" r="3.5" fill="#d1d1d1"></circle><path d="M139 332 q11 8 22 0" fill="none" stroke="#8b7e66" stroke-width="2" stroke-linecap="round"></path><text x="150" y="372" font-size="11" fill="#8b7e66" text-anchor="middle">agent</text></g><path class="feed f0" d="M186 316 h96" fill="none" stroke="#8b7e66" stroke-width="1.6" marker-end="url(#agArrow)" aria-hidden="true"></path><g class="proposeChip" aria-hidden="true"><rect x="196" y="256" width="176" height="26" rx="7" fill="#f7f7f7"></rect><rect x="206" y="266" width="10" height="7" rx="2" fill="#d9622a"></rect><text x="224" y="273" font-size="10.5" fill="#1c1712" font-family="monospace" font-weight="700">--color-brand → #f26722</text></g><g class="checker" aria-hidden="true"><rect x="300" y="288" width="188" height="118" rx="12" fill="#1c1712" stroke="#4a4a4a"></rect><text x="318" y="312" font-size="12" fill="#f7f7f7" font-weight="700">WCAG contrast</text><text x="318" y="334" font-size="10.5" fill="#8b7e66" font-family="monospace">text #1c1712 on #f26722</text><text x="318" y="356" font-size="12" fill="#d1d1d1" font-family="monospace">ratio = 4.9 : 1</text><g class="pass"><rect x="318" y="368" width="120" height="24" rx="12" fill="#1c2a19" stroke="#6cc24a"></rect><path d="M330 380 l5 5 l9 -11" fill="none" stroke="#6cc24a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><text x="350" y="384" font-size="11" fill="#8fce6f" font-weight="700">AA · pass</text></g></g><path class="feed f1" d="M488 344 h56" fill="none" stroke="#8b7e66" stroke-width="1.6" marker-end="url(#agArrow)" aria-hidden="true"></path><g class="gate" aria-hidden="true"><rect x="556" y="288" width="180" height="118" rx="12" fill="#211c15" stroke="#f26722" stroke-width="1.4"></rect><circle cx="586" cy="320" r="11" fill="#8b7e66"></circle><path d="M572 348 q14 -18 28 0 z" fill="#8b7e66"></path><text x="612" y="316" font-size="12" fill="#f7f7f7" font-weight="700">Human</text><text x="612" y="332" font-size="10.5" fill="#8b7e66">reviews · decides</text><g class="approveBtn"><rect x="574" y="362" width="120" height="30" rx="8" fill="#f26722"></rect><text x="634" y="382" font-size="13" fill="#1c1712" font-weight="700" text-anchor="middle">Approve</text></g></g><text class="noAuto" x="400" y="150" font-size="12" fill="#8b7e66" text-anchor="middle">the judge is deterministic math — no auto-apply</text><g class="beat bt0" aria-hidden="true"><rect x="120" y="440" width="150" height="34" rx="17" fill="#1c1712" stroke="#f26722" stroke-width="1.2"></rect><text x="195" y="461" font-size="12" fill="#f26722" font-weight="600" text-anchor="middle">AI proposes</text></g><g class="beat bt1" aria-hidden="true"><rect x="340" y="440" width="150" height="34" rx="17" fill="#1c1712" stroke="#f26722" stroke-width="1.2"></rect><text x="415" y="461" font-size="12" fill="#f26722" font-weight="600" text-anchor="middle">human reviews</text></g><g class="beat bt2" aria-hidden="true"><rect x="560" y="440" width="150" height="34" rx="17" fill="#1c1712" stroke="#f26722" stroke-width="1.2"></rect><text x="635" y="461" font-size="12" fill="#f26722" font-weight="600" text-anchor="middle">app verifies</text></g><g class="loopArrows" fill="none" stroke="#f26722" stroke-width="1.6" aria-hidden="true"><path d="M270 457 h64" marker-end="url(#agArrowHot)"></path><path d="M490 457 h64" marker-end="url(#agArrowHot)"></path></g><style>
        .ag-svg {
          font-family: inherit;
        }
        .cube {
          opacity: 0;
          animation: fade 0.5s ease-out 0.2s forwards;
          animation-play-state: running;
        }
        .mcp {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translateY(-24px);
          animation: clipOn 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 0.6s forwards;
          animation-play-state: running;
        }
        .agent {
          opacity: 0;
          animation: fade 0.5s ease-out 0.9s forwards;
          animation-play-state: running;
        }
        .proposeChip {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translateX(-40px) scale(0.9);
          animation: chipTravel 0.7s cubic-bezier(0.4, 0, 0.2, 1) 1.3s forwards;
          animation-play-state: running;
        }
        .feed {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: draw 0.4s ease-out forwards;
          animation-play-state: running;
        }
        .f0 {
          animation-delay: 1.2s;
        }
        .f1 {
          animation-delay: 2.4s;
        }
        .checker {
          opacity: 0;
          animation: fade 0.5s ease-out 1.7s forwards;
          animation-play-state: running;
        }
        .pass {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.6);
          animation: pop 0.45s cubic-bezier(0.34, 1.6, 0.64, 1) 2.0s forwards;
          animation-play-state: running;
        }
        .gate {
          opacity: 0;
          animation: fade 0.5s ease-out 2.4s forwards;
          animation-play-state: running;
        }
        .approveBtn {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.7);
          animation: pop 0.45s cubic-bezier(0.34, 1.5, 0.64, 1) 2.7s forwards;
          animation-play-state: running;
        }
        .noAuto {
          opacity: 0;
          animation: fade 0.5s ease-out 3.0s forwards;
          animation-play-state: running;
        }
        .beat {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translateY(10px);
          animation: beatIn 0.4s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
          animation-play-state: running;
        }
        .bt0 {
          animation-delay: 3.2s;
        }
        .bt1 {
          animation-delay: 3.4s;
        }
        .bt2 {
          animation-delay: 3.6s;
        }
        .loopArrows {
          opacity: 0;
          animation: fade 0.4s ease-out 3.8s forwards;
          animation-play-state: running;
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }
        @keyframes clipOn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes chipTravel {
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes beatIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        
      </style></svg>`,
};
