window.WT_MIGRATION_SCENES = {
  subject: `<svg class="sub-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="The PubHub app on an aging Tornado stack must migrate to Next.js; an empty arrow spans the gap and a faint &#x27;no prior art&#x27; stamp sits beneath it."><defs><marker id="subArrow" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto"><path d="M0 0 L9 5 L0 10 Z" fill="#8b7e66"></path></marker></defs><g class="src" aria-hidden="true"><rect x="96" y="168" width="220" height="164" rx="14" fill="#211c15" stroke="#4a4a4a"></rect><rect x="96" y="168" width="220" height="34" rx="14" fill="#2a241c"></rect><circle cx="116" cy="185" r="4" fill="#8b7e66"></circle><circle cx="130" cy="185" r="4" fill="#8b7e66"></circle><text x="206" y="245" font-size="22" fill="#f7f7f7" font-weight="800" text-anchor="middle">PubHub</text><text x="206" y="270" font-size="11" fill="#8b7e66" text-anchor="middle">social publishing</text><g class="tornadoTag"><rect x="151" y="290" width="110" height="24" rx="12" fill="#1c1712" stroke="#8b7e66"></rect><text x="206" y="306" font-size="11" fill="#8b7e66" text-anchor="middle" font-weight="600">Tornado</text></g></g><path class="gapArrow" d="M330 250 h130" fill="none" stroke="#8b7e66" stroke-width="2.5" marker-end="url(#subArrow)" aria-hidden="true"></path><g class="tgt" aria-hidden="true"><rect x="484" y="168" width="220" height="164" rx="14" fill="#1c1712" stroke="#f26722" stroke-width="1.5" stroke-dasharray="7 5"></rect><text x="594" y="245" font-size="22" fill="#f26722" font-weight="800" text-anchor="middle">Next.js</text><text x="594" y="270" font-size="11" fill="#8b7e66" text-anchor="middle">target stack</text><g class="tgtTag"><rect x="539" y="290" width="110" height="24" rx="12" fill="#211c15" stroke="#f26722"></rect><text x="594" y="306" font-size="11" fill="#f26722" text-anchor="middle" font-weight="600">behavior-matched</text></g></g><g class="ghost" aria-hidden="true"><rect x="322" y="356" width="156" height="40" rx="8" fill="none" stroke="#8b7e66" stroke-width="2" transform="rotate(-6 400 376)"></rect><text x="400" y="382" font-size="15" fill="#8b7e66" font-weight="700" text-anchor="middle" letter-spacing="0.04em" transform="rotate(-6 400 376)">no prior art</text></g><text class="caption" x="400" y="126" font-size="14" fill="#f7f7f7" text-anchor="middle" font-weight="600">Tornado → Next.js — a first, here</text><style>
        .sub-svg {
          font-family: inherit;
        }
        .src {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translateX(-24px);
          animation: slideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
          animation-play-state: running;
        }
        .gapArrow {
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
          animation: draw 0.6s ease-out 0.9s forwards;
          animation-play-state: running;
        }
        .tgt {
          opacity: 0;
          animation: fade 0.6s ease-out 1.3s forwards;
          animation-play-state: running;
        }
        .ghost {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(1.3);
          animation: ghostIn 0.7s ease-out 1.9s forwards;
          animation-play-state: running;
        }
        .caption {
          opacity: 0;
          animation: fade 0.5s ease-out 0.1s forwards;
          animation-play-state: running;
        }
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes ghostIn {
          to {
            opacity: 0.5;
            transform: scale(1);
          }
        }

        
      </style></svg>`,
  spec: `<svg class="spc-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A plan card unfolds into thirteen numbered task chips with a goal line, a 61-hour estimate, a migration-agent persona badge, and a legacy-untouched rule."><g class="card" aria-hidden="true"><rect x="88" y="96" width="624" height="322" rx="14" fill="#211c15" stroke="#4a4a4a"></rect><rect x="88" y="96" width="624" height="70" rx="14" fill="#1c1712"></rect><rect x="88" y="150" width="624" height="16" fill="#1c1712"></rect><text x="112" y="128" font-size="15" fill="#f7f7f7" font-weight="800">Migration plan</text><text x="112" y="150" font-size="11" fill="#8b7e66">goal: behavior-matched Next.js port</text></g><g class="estTag" aria-hidden="true"><rect x="500" y="110" width="92" height="30" rx="15" fill="#211c15" stroke="#f26722" stroke-width="1.5"></rect><text x="546" y="130" font-size="14" fill="#f26722" font-weight="800" text-anchor="middle">est. 61h</text></g><g class="persona" aria-hidden="true"><rect x="600" y="110" width="98" height="30" rx="8" fill="#1c1712" stroke="#8b7e66"></rect><circle cx="618" cy="125" r="6" fill="#f26722"></circle><text x="630" y="129" font-size="8.5" fill="#d1d1d1" font-weight="600">Dev_Migration</text></g><g class="chip chip0" style="animation-delay:0.7s" aria-hidden="true"><rect x="120" y="206" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="137" cy="221" r="10" fill="#f26722"></circle><text x="137" y="225" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">1</text><text x="154" y="225" font-size="10.5" fill="#d1d1d1">scaffold</text></g><g class="chip chip1" style="animation-delay:0.7799999999999999s" aria-hidden="true"><rect x="316" y="206" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="333" cy="221" r="10" fill="#f26722"></circle><text x="333" y="225" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">2</text><text x="350" y="225" font-size="10.5" fill="#d1d1d1">mount</text></g><g class="chip chip2" style="animation-delay:0.86s" aria-hidden="true"><rect x="512" y="206" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="529" cy="221" r="10" fill="#f26722"></circle><text x="529" y="225" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">3</text><text x="546" y="225" font-size="10.5" fill="#d1d1d1">SSO</text></g><g class="chip chip3" style="animation-delay:0.94s" aria-hidden="true"><rect x="120" y="248" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="137" cy="263" r="10" fill="#f26722"></circle><text x="137" y="267" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">4</text><text x="154" y="267" font-size="10.5" fill="#d1d1d1">API gateway</text></g><g class="chip chip4" style="animation-delay:1.02s" aria-hidden="true"><rect x="316" y="248" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="333" cy="263" r="10" fill="#f26722"></circle><text x="333" y="267" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">5</text><text x="350" y="267" font-size="10.5" fill="#d1d1d1">imagebuilder</text></g><g class="chip chip5" style="animation-delay:1.1s" aria-hidden="true"><rect x="512" y="248" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="529" cy="263" r="10" fill="#f26722"></circle><text x="529" y="267" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">6</text><text x="546" y="267" font-size="10.5" fill="#d1d1d1">SSR bootstrap</text></g><g class="chip chip6" style="animation-delay:1.18s" aria-hidden="true"><rect x="120" y="290" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="137" cy="305" r="10" fill="#f26722"></circle><text x="137" y="309" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">7</text><text x="154" y="309" font-size="10.5" fill="#d1d1d1">routing</text></g><g class="chip chip7" style="animation-delay:1.26s" aria-hidden="true"><rect x="316" y="290" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="333" cy="305" r="10" fill="#f26722"></circle><text x="333" y="309" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">8</text><text x="350" y="309" font-size="10.5" fill="#d1d1d1">state</text></g><g class="chip chip8" style="animation-delay:1.3399999999999999s" aria-hidden="true"><rect x="512" y="290" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="529" cy="305" r="10" fill="#f26722"></circle><text x="529" y="309" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">9</text><text x="546" y="309" font-size="10.5" fill="#d1d1d1">styles</text></g><g class="chip chip9" style="animation-delay:1.42s" aria-hidden="true"><rect x="120" y="332" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="137" cy="347" r="10" fill="#f26722"></circle><text x="137" y="351" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">10</text><text x="154" y="351" font-size="10.5" fill="#d1d1d1">assets</text></g><g class="chip chip10" style="animation-delay:1.5s" aria-hidden="true"><rect x="316" y="332" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="333" cy="347" r="10" fill="#f26722"></circle><text x="333" y="351" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">11</text><text x="350" y="351" font-size="10.5" fill="#d1d1d1">tests</text></g><g class="chip chip11" style="animation-delay:1.58s" aria-hidden="true"><rect x="512" y="332" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="529" cy="347" r="10" fill="#f26722"></circle><text x="529" y="351" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">12</text><text x="546" y="351" font-size="10.5" fill="#d1d1d1">proxies</text></g><g class="chip chip12" style="animation-delay:1.66s" aria-hidden="true"><rect x="120" y="374" width="168" height="30" rx="7" fill="#1c1712" stroke="#4a4a4a"></rect><circle cx="137" cy="389" r="10" fill="#f26722"></circle><text x="137" y="393" font-size="10" fill="#1c1712" font-weight="800" text-anchor="middle">13</text><text x="154" y="393" font-size="10.5" fill="#d1d1d1">cutover</text></g><g class="rule"><rect x="200" y="440" width="400" height="34" rx="17" fill="#1c1712" stroke="#f26722" stroke-width="1.5"></rect><text x="400" y="462" font-size="12.5" fill="#f26722" text-anchor="middle" font-weight="700">lift-and-shift · legacy untouched</text></g><style>
        .spc-svg {
          font-family: inherit;
        }
        .card {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.94);
          animation: stampIn 0.5s cubic-bezier(0.34, 1.3, 0.64, 1) 0.15s forwards;
          animation-play-state: running;
        }
        .estTag {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.7);
          animation: popIn 0.4s cubic-bezier(0.34, 1.5, 0.64, 1) 0.55s forwards;
          animation-play-state: running;
        }
        .persona {
          opacity: 0;
          transform: translateY(-8px);
          animation: clipOn 0.4s ease-out 1.85s forwards;
          animation-play-state: running;
        }
        .chip {
          opacity: 0;
          transform: translateY(8px);
          animation: chipIn 0.32s ease-out forwards;
          animation-play-state: running;
        }
        .rule {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.85);
          animation: popIn 0.45s cubic-bezier(0.34, 1.5, 0.64, 1) 2.05s forwards;
          animation-play-state: running;
        }
        @keyframes stampIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes popIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes clipOn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes chipIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        
      </style></svg>`,
  execute: `<svg class="exe-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A glowing _migration_source folder streams port lines into a growing Next.js file tree; a moon marks after-hours autonomy while a slice counter ticks up."><defs><marker id="exeArrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 Z" fill="#f26722"></path></marker><clipPath id="exeReelClip"><rect x="300" y="430" width="70" height="30"></rect></clipPath></defs><g aria-hidden="true"><g class="folder"><path d="M96 168 h50 l14 16 h84 a10 10 0 0 1 10 10 v104 a10 10 0 0 1 -10 10 h-148 a10 10 0 0 1 -10 -10 v-120 a10 10 0 0 1 10 -10 z" fill="#211c15" stroke="#f26722" stroke-width="1.5"></path><text x="180" y="248" font-size="10.5" fill="#f26722" text-anchor="middle" font-weight="700">_migration_source/</text><text x="180" y="266" font-size="9" fill="#8b7e66" text-anchor="middle">legacy reference</text></g></g><g fill="none" stroke="#f26722" stroke-width="1.6" aria-hidden="true"><path class="stream s0" d="M262 214 C330 214, 360 160, 430 160" marker-end="url(#exeArrow)"></path><path class="stream s1" d="M262 226 C330 226, 360 232, 430 232" marker-end="url(#exeArrow)"></path><path class="stream s2" d="M262 238 C330 238, 360 300, 430 300" marker-end="url(#exeArrow)"></path></g><g aria-hidden="true"><rect x="430" y="120" width="278" height="248" rx="12" fill="#1c1712" stroke="#4a4a4a"></rect><text x="450" y="142" font-size="10.5" fill="#8b7e66" font-weight="600">next-app/</text><g class="row row0" style="animation-delay:1s"><rect x="452" y="150" width="14" height="14" rx="3" fill="#f26722"></rect><rect x="474" y="153" width="150" height="8" rx="4" fill="#5a5245"></rect></g><g class="row row1" style="animation-delay:1.28s"><rect x="452" y="184" width="14" height="14" rx="3" fill="#f26722"></rect><rect x="474" y="187" width="190" height="8" rx="4" fill="#5a5245"></rect></g><g class="row row2" style="animation-delay:1.56s"><rect x="452" y="218" width="14" height="14" rx="3" fill="#f26722"></rect><rect x="474" y="221" width="130" height="8" rx="4" fill="#5a5245"></rect></g><g class="row row3" style="animation-delay:1.84s"><rect x="452" y="252" width="14" height="14" rx="3" fill="#f26722"></rect><rect x="474" y="255" width="210" height="8" rx="4" fill="#5a5245"></rect></g><g class="row row4" style="animation-delay:2.12s"><rect x="452" y="286" width="14" height="14" rx="3" fill="#f26722"></rect><rect x="474" y="289" width="168" height="8" rx="4" fill="#5a5245"></rect></g><g class="row row5" style="animation-delay:2.4000000000000004s"><rect x="452" y="320" width="14" height="14" rx="3" fill="#f26722"></rect><rect x="474" y="323" width="196" height="8" rx="4" fill="#5a5245"></rect></g></g><g class="moon" aria-hidden="true"><circle cx="642" cy="96" r="20" fill="#2a241c" stroke="#8b7e66"></circle><path d="M636 84 a16 16 0 1 0 12 24 a13 13 0 1 1 -12 -24 z" fill="#d1d1d1"></path><circle class="z z0" cx="676" cy="78" r="2.5" fill="#8b7e66"></circle><circle class="z z1" cx="688" cy="66" r="2" fill="#8b7e66"></circle></g><text class="afterHours" x="642" y="140" font-size="10" fill="#8b7e66" text-anchor="middle">after hours · unattended</text><g aria-hidden="true"><text x="290" y="452" font-size="14" fill="#d1d1d1" text-anchor="end">slices ported</text><g clip-path="url(#exeReelClip)"><g class="reel"><text x="316" y="452" font-size="20" fill="#f26722" font-weight="800">0</text><text x="316" y="482" font-size="20" fill="#f26722" font-weight="800">3</text><text x="316" y="512" font-size="20" fill="#f26722" font-weight="800">7</text><text x="316" y="542" font-size="20" fill="#f26722" font-weight="800">10</text><text x="316" y="572" font-size="20" fill="#f26722" font-weight="800">13</text></g></g></g><style>
        .exe-svg {
          font-family: inherit;
        }
        .folder {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: translateX(-16px);
          animation: slideIn 0.5s ease-out 0.2s forwards, glow 2.4s ease-in-out 0.9s infinite;
          animation-play-state: running;
        }
        .stream {
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
          opacity: 0;
          animation: streamIn 1.1s ease-out infinite;
          animation-play-state: running;
        }
        .s0 {
          animation-delay: 1.0s;
        }
        .s1 {
          animation-delay: 1.5s;
        }
        .s2 {
          animation-delay: 2.0s;
        }
        .row {
          opacity: 0;
          transform: translateX(-8px);
          animation: rowIn 0.35s ease-out forwards;
          animation-play-state: running;
        }
        .moon {
          opacity: 0;
          animation: fade 0.5s ease-out 0.5s forwards;
          animation-play-state: running;
        }
        .z {
          opacity: 0;
          animation: twinkle 2.2s ease-in-out infinite;
          animation-play-state: running;
        }
        .z0 {
          animation-delay: 1.0s;
        }
        .z1 {
          animation-delay: 1.6s;
        }
        .afterHours {
          opacity: 0;
          animation: fade 0.5s ease-out 0.9s forwards;
          animation-play-state: running;
        }
        .reel {
          transform: translateY(0);
          animation: roll 2.6s steps(1) 1.0s forwards;
          animation-play-state: running;
        }
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 0 rgba(242, 103, 34, 0));
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(242, 103, 34, 0.55));
          }
        }
        @keyframes streamIn {
          0% {
            opacity: 0;
            stroke-dashoffset: 220;
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
            stroke-dashoffset: 0;
          }
        }
        @keyframes rowIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes roll {
          0% {
            transform: translateY(0);
          }
          20% {
            transform: translateY(-30px);
          }
          45% {
            transform: translateY(-60px);
          }
          70% {
            transform: translateY(-90px);
          }
          100% {
            transform: translateY(-120px);
          }
        }

        
      </style></svg>`,
  gate: `<svg class="gat-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="An overnight decision queue drains into a review; three options fan out and a cursor approves one; a decision ledger stacks toward 71 with zero abandoned."><defs><clipPath id="gatReelClip"><rect x="612" y="120" width="86" height="34"></rect></clipPath></defs><g aria-hidden="true"><text x="128" y="120" font-size="11" fill="#8b7e66" text-anchor="middle">overnight queue</text><g class="qcard q0" style="animation-delay:0.3s"><rect x="68" y="138" width="120" height="18" rx="5" fill="#211c15" stroke="#4a4a4a"></rect><rect x="78" y="143" width="70" height="7" rx="3.5" fill="#5a5245"></rect></g><g class="qcard q1" style="animation-delay:0.55s"><rect x="74" y="160" width="120" height="18" rx="5" fill="#211c15" stroke="#4a4a4a"></rect><rect x="84" y="165" width="70" height="7" rx="3.5" fill="#5a5245"></rect></g><g class="qcard q2" style="animation-delay:0.8s"><rect x="80" y="182" width="120" height="18" rx="5" fill="#211c15" stroke="#4a4a4a"></rect><rect x="90" y="187" width="70" height="7" rx="3.5" fill="#5a5245"></rect></g><g class="qcard q3" style="animation-delay:1.05s"><rect x="86" y="204" width="120" height="18" rx="5" fill="#211c15" stroke="#4a4a4a"></rect><rect x="96" y="209" width="70" height="7" rx="3.5" fill="#5a5245"></rect></g></g><g class="decision" aria-hidden="true"><rect x="262" y="150" width="276" height="210" rx="14" fill="#1c1712" stroke="#f26722" stroke-width="1.5"></rect><text x="400" y="182" font-size="13" fill="#f7f7f7" text-anchor="middle" font-weight="800">Decision #42</text><text x="400" y="202" font-size="10" fill="#8b7e66" text-anchor="middle">SSR bootstrap: hydrate or defer?</text></g><g class="opt o0" aria-hidden="true"><rect x="282" y="222" width="236" height="34" rx="8" fill="#211c15" stroke="#4a4a4a"></rect><text x="300" y="244" font-size="11" fill="#d1d1d1">A · defer to client</text></g><g class="opt o1" aria-hidden="true"><rect class="approveBox" x="282" y="264" width="236" height="34" rx="8" fill="#211c15" stroke="#f26722" stroke-width="2"></rect><text x="300" y="286" font-size="11" fill="#f26722" font-weight="800">B · hydrate on server</text><text class="approveTag" x="502" y="286" font-size="10" fill="#f26722" text-anchor="end" font-weight="700">Approve</text></g><g class="opt o2" aria-hidden="true"><rect x="282" y="306" width="236" height="34" rx="8" fill="#211c15" stroke="#4a4a4a"></rect><text x="300" y="328" font-size="11" fill="#d1d1d1">C · rebuild state layer</text></g><g transform="translate(300,360)" aria-hidden="true"><g class="cursor"><path d="M0 0 L0 20 L5 15 L9 23 L12 21 L8 14 L15 14 Z" fill="#f7f7f7" stroke="#1c1712" stroke-width="1"></path></g></g><g aria-hidden="true"><rect x="588" y="150" width="150" height="220" rx="12" fill="#211c15" stroke="#4a4a4a"></rect><text x="602" y="176" font-size="10.5" fill="#8b7e66" font-weight="600">decision log</text><g class="lrow l0" style="animation-delay:1.4s"><circle cx="608" cy="197" r="4" fill="#f26722"></circle><rect x="620" y="192" width="100" height="9" rx="4.5" fill="#3f382d"></rect></g><g class="lrow l1" style="animation-delay:1.5799999999999998s"><circle cx="608" cy="223" r="4" fill="#f26722"></circle><rect x="620" y="218" width="100" height="9" rx="4.5" fill="#3f382d"></rect></g><g class="lrow l2" style="animation-delay:1.7599999999999998s"><circle cx="608" cy="249" r="4" fill="#f26722"></circle><rect x="620" y="244" width="100" height="9" rx="4.5" fill="#3f382d"></rect></g><g class="lrow l3" style="animation-delay:1.94s"><circle cx="608" cy="275" r="4" fill="#f26722"></circle><rect x="620" y="270" width="100" height="9" rx="4.5" fill="#3f382d"></rect></g><g class="lrow l4" style="animation-delay:2.12s"><circle cx="608" cy="301" r="4" fill="#f26722"></circle><rect x="620" y="296" width="100" height="9" rx="4.5" fill="#3f382d"></rect></g></g><g aria-hidden="true"><g clip-path="url(#gatReelClip)"><g class="reel"><text x="655" y="146" font-size="26" fill="#f26722" font-weight="800" text-anchor="middle">0</text><text x="655" y="180" font-size="26" fill="#f26722" font-weight="800" text-anchor="middle">26</text><text x="655" y="214" font-size="26" fill="#f26722" font-weight="800" text-anchor="middle">53</text><text x="655" y="248" font-size="26" fill="#f26722" font-weight="800" text-anchor="middle">71</text></g></g><text x="655" y="392" font-size="10.5" fill="#8b7e66" text-anchor="middle">decisions logged</text></g><g class="abandoned"><rect x="300" y="418" width="200" height="34" rx="17" fill="#1c1712" stroke="#8b7e66"></rect><text x="400" y="440" font-size="12.5" fill="#d1d1d1" text-anchor="middle" font-weight="700">0 abandoned</text></g><style>
        .gat-svg {
          font-family: inherit;
        }
        .qcard {
          opacity: 0;
          transform: translateX(0);
          animation: drain 1.0s ease-in-out forwards;
          animation-play-state: running;
        }
        .decision {
          opacity: 0;
          transform: translateY(10px);
          animation: rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.0s forwards;
          animation-play-state: running;
        }
        .opt {
          opacity: 0;
          transform: translateX(-10px);
          animation: fanOut 0.4s ease-out forwards;
          animation-play-state: running;
        }
        .o0 {
          animation-delay: 1.4s;
        }
        .o1 {
          animation-delay: 1.6s;
        }
        .o2 {
          animation-delay: 1.8s;
        }
        .approveBox {
          transform-box: fill-box;
          transform-origin: center;
          animation: approvePulse 0.5s ease-out 2.9s;
          animation-play-state: running;
        }
        .approveTag {
          opacity: 0;
          animation: fade 0.3s ease-out 2.9s forwards;
          animation-play-state: running;
        }
        .o0,
        .o2 {
          animation: fanOut 0.4s ease-out forwards, dim 0.4s ease-out 2.9s forwards;
        }
        .o0 {
          animation-delay: 1.4s, 2.9s;
        }
        .o2 {
          animation-delay: 1.8s, 2.9s;
        }
        .cursor {
          transform: translate(0, 0);
          animation: track 1.3s cubic-bezier(0.4, 0, 0.2, 1) 1.9s forwards;
          animation-play-state: running;
        }
        .lrow {
          opacity: 0;
          transform: translateY(6px);
          animation: lrowIn 0.3s ease-out forwards;
          animation-play-state: running;
        }
        .reel {
          transform: translateY(0);
          animation: roll 2.4s steps(1) 1.4s forwards;
          animation-play-state: running;
        }
        .abandoned {
          opacity: 0;
          animation: fade 0.6s ease-out 3.3s forwards;
          animation-play-state: running;
        }
        @keyframes drain {
          0% {
            opacity: 0;
            transform: translateX(0);
          }
          25% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(150px);
          }
        }
        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fanOut {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes dim {
          to {
            opacity: 0.35;
          }
        }
        @keyframes approvePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }
        @keyframes track {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(190px, -78px);
          }
        }
        @keyframes lrowIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes roll {
          0% {
            transform: translateY(0);
          }
          33% {
            transform: translateY(-34px);
          }
          66% {
            transform: translateY(-68px);
          }
          100% {
            transform: translateY(-102px);
          }
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }

        
      </style></svg>`,
  verify: `<svg class="ver-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A browser under an inspecting reticle; test rows flip green one by one; a coverage meter fills; a 2,306 passing badge pops."><g aria-hidden="true"><rect x="80" y="110" width="330" height="256" rx="12" fill="#211c15" stroke="#4a4a4a"></rect><rect x="80" y="110" width="330" height="30" rx="12" fill="#2a241c"></rect><rect x="80" y="128" width="330" height="12" fill="#2a241c"></rect><circle cx="100" cy="125" r="4" fill="#8b7e66"></circle><circle cx="114" cy="125" r="4" fill="#8b7e66"></circle><circle cx="128" cy="125" r="4" fill="#8b7e66"></circle><rect x="150" y="119" width="240" height="12" rx="6" fill="#1c1712"></rect><rect x="104" y="160" width="140" height="12" rx="6" fill="#5a5245"></rect><rect x="104" y="184" width="282" height="8" rx="4" fill="#3f382d"></rect><rect x="104" y="200" width="282" height="8" rx="4" fill="#3f382d"></rect><rect x="104" y="216" width="220" height="8" rx="4" fill="#3f382d"></rect><rect x="104" y="248" width="96" height="26" rx="8" fill="#f26722"></rect><rect x="104" y="292" width="180" height="8" rx="4" fill="#3f382d"></rect><rect x="104" y="308" width="240" height="8" rx="4" fill="#3f382d"></rect></g><g class="reticle" aria-hidden="true"><circle cx="0" cy="0" r="34" fill="none" stroke="#f26722" stroke-width="2"></circle><circle cx="0" cy="0" r="3" fill="#f26722"></circle><path d="M0 -44 v14 M0 44 v-14 M-44 0 h14 M44 0 h-14" stroke="#f26722" stroke-width="2"></path><g transform="translate(24,24)"><rect x="0" y="0" width="12" height="3" rx="1.5" fill="#f26722" transform="rotate(45 6 1.5)"></rect></g></g><g aria-hidden="true"><rect x="446" y="110" width="274" height="196" rx="12" fill="#1c1712" stroke="#4a4a4a"></rect><text x="466" y="134" font-size="11" fill="#8b7e66" font-weight="600">test suite</text><g class="trow t0" style="animation-delay:1s"><rect x="466" y="126" width="234" height="22" rx="6" fill="#211c15" stroke="#4a4a4a"></rect><rect class="pass" x="466" y="126" width="234" height="22" rx="6" fill="#1e3a26" stroke="#57c084"></rect><circle class="check" cx="482" cy="137" r="8" fill="#57c084"></circle><path class="checkMark" d="M478 137 l3 3 l6 -6" fill="none" stroke="#0f1a12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><rect x="500" y="133" width="120" height="8" rx="4" fill="#5a5245"></rect></g><g class="trow t1" style="animation-delay:1.3s"><rect x="466" y="152" width="234" height="22" rx="6" fill="#211c15" stroke="#4a4a4a"></rect><rect class="pass" x="466" y="152" width="234" height="22" rx="6" fill="#1e3a26" stroke="#57c084"></rect><circle class="check" cx="482" cy="163" r="8" fill="#57c084"></circle><path class="checkMark" d="M478 163 l3 3 l6 -6" fill="none" stroke="#0f1a12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><rect x="500" y="159" width="120" height="8" rx="4" fill="#5a5245"></rect></g><g class="trow t2" style="animation-delay:1.6s"><rect x="466" y="178" width="234" height="22" rx="6" fill="#211c15" stroke="#4a4a4a"></rect><rect class="pass" x="466" y="178" width="234" height="22" rx="6" fill="#1e3a26" stroke="#57c084"></rect><circle class="check" cx="482" cy="189" r="8" fill="#57c084"></circle><path class="checkMark" d="M478 189 l3 3 l6 -6" fill="none" stroke="#0f1a12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><rect x="500" y="185" width="120" height="8" rx="4" fill="#5a5245"></rect></g><g class="trow t3" style="animation-delay:1.9s"><rect x="466" y="204" width="234" height="22" rx="6" fill="#211c15" stroke="#4a4a4a"></rect><rect class="pass" x="466" y="204" width="234" height="22" rx="6" fill="#1e3a26" stroke="#57c084"></rect><circle class="check" cx="482" cy="215" r="8" fill="#57c084"></circle><path class="checkMark" d="M478 215 l3 3 l6 -6" fill="none" stroke="#0f1a12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><rect x="500" y="211" width="120" height="8" rx="4" fill="#5a5245"></rect></g><g class="trow t4" style="animation-delay:2.2s"><rect x="466" y="230" width="234" height="22" rx="6" fill="#211c15" stroke="#4a4a4a"></rect><rect class="pass" x="466" y="230" width="234" height="22" rx="6" fill="#1e3a26" stroke="#57c084"></rect><circle class="check" cx="482" cy="241" r="8" fill="#57c084"></circle><path class="checkMark" d="M478 241 l3 3 l6 -6" fill="none" stroke="#0f1a12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><rect x="500" y="237" width="120" height="8" rx="4" fill="#5a5245"></rect></g></g><g aria-hidden="true"><text x="466" y="342" font-size="11" fill="#8b7e66">coverage</text><rect x="466" y="350" width="234" height="16" rx="8" fill="#211c15" stroke="#4a4a4a"></rect><rect class="coverFill" x="466" y="350" width="234" height="16" rx="8" fill="#57c084"></rect><text class="coverPct" x="683" y="362" font-size="10" fill="#0f1a12" text-anchor="end" font-weight="800">94%</text></g><g class="badge"><rect x="230" y="404" width="340" height="52" rx="26" fill="#1c1712" stroke="#57c084" stroke-width="2"></rect><circle cx="266" cy="430" r="14" fill="#57c084"></circle><path d="M259 430 l5 5 l9 -10" fill="none" stroke="#0f1a12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><text x="298" y="437" font-size="19" fill="#57c084" font-weight="800">2,306 passing</text></g><style>
        .ver-svg {
          font-family: inherit;
        }
        .reticle {
          transform: translate(180px, 200px);
          animation: scan 2.4s cubic-bezier(0.45, 0, 0.55, 1) 0.3s forwards;
          animation-play-state: running;
        }
        .pass,
        .check,
        .checkMark {
          opacity: 0;
          animation: flip 0.35s ease-out forwards;
          animation-play-state: running;
        }
        .t0 .pass,
        .t0 .check,
        .t0 .checkMark {
          animation-delay: 1.0s;
        }
        .t1 .pass,
        .t1 .check,
        .t1 .checkMark {
          animation-delay: 1.3s;
        }
        .t2 .pass,
        .t2 .check,
        .t2 .checkMark {
          animation-delay: 1.6s;
        }
        .t3 .pass,
        .t3 .check,
        .t3 .checkMark {
          animation-delay: 1.9s;
        }
        .t4 .pass,
        .t4 .check,
        .t4 .checkMark {
          animation-delay: 2.2s;
        }
        .coverFill {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: fill 1.4s cubic-bezier(0.4, 0, 0.2, 1) 1.2s forwards;
          animation-play-state: running;
        }
        .coverPct {
          opacity: 0;
          animation: fade 0.4s ease-out 2.6s forwards;
          animation-play-state: running;
        }
        .badge {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.8);
          animation: pop 0.5s cubic-bezier(0.34, 1.5, 0.64, 1) 2.9s forwards;
          animation-play-state: running;
        }
        @keyframes scan {
          0% {
            transform: translate(180px, 200px);
          }
          35% {
            transform: translate(300px, 165px);
          }
          70% {
            transform: translate(200px, 300px);
          }
          100% {
            transform: translate(245px, 238px);
          }
        }
        @keyframes flip {
          to {
            opacity: 1;
          }
        }
        @keyframes fill {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }
        @keyframes pop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        
      </style></svg>`,
  result: `<svg class="res-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Stat tiles show 910 files, 70k lines, 71 gates; a bar race pits 61 hours estimated against about 5 human hours for roughly 92% less human time; two clocks tick in parallel."><g class="stat st0" style="animation-delay:0.2s" aria-hidden="true"><rect x="78" y="72" width="200" height="96" rx="14" fill="#211c15" stroke="#4a4a4a"></rect><text x="178" y="128" font-size="40" fill="#f26722" font-weight="800" text-anchor="middle">910</text><text x="178" y="152" font-size="12" fill="#8b7e66" text-anchor="middle">files</text></g><g class="stat st1" style="animation-delay:0.38s" aria-hidden="true"><rect x="300" y="72" width="200" height="96" rx="14" fill="#211c15" stroke="#4a4a4a"></rect><text x="400" y="128" font-size="40" fill="#f26722" font-weight="800" text-anchor="middle">70k</text><text x="400" y="152" font-size="12" fill="#8b7e66" text-anchor="middle">lines</text></g><g class="stat st2" style="animation-delay:0.56s" aria-hidden="true"><rect x="522" y="72" width="200" height="96" rx="14" fill="#211c15" stroke="#4a4a4a"></rect><text x="622" y="128" font-size="40" fill="#f26722" font-weight="800" text-anchor="middle">71</text><text x="622" y="152" font-size="12" fill="#8b7e66" text-anchor="middle">gates</text></g><g aria-hidden="true"><text x="90" y="210" font-size="11" fill="#8b7e66">estimated vs. actual human time</text><rect x="90" y="222" width="420" height="30" rx="8" fill="#211c15" stroke="#4a4a4a"></rect><rect class="barEst" x="90" y="222" width="420" height="30" rx="8" fill="#4a4a4a"></rect><text x="500" y="242" font-size="12" fill="#d1d1d1" text-anchor="end" font-weight="700">61h estimated</text><rect x="90" y="262" width="420" height="30" rx="8" fill="#211c15" stroke="#4a4a4a"></rect><rect class="barHuman" x="90" y="262" width="52" height="30" rx="8" fill="#f26722"></rect><text class="humanLabel" x="152" y="282" font-size="12" fill="#f26722" font-weight="800">~5h human</text></g><g class="pct"><rect x="90" y="312" width="240" height="42" rx="21" fill="#1c1712" stroke="#f26722" stroke-width="2"></rect><text x="210" y="340" font-size="17" fill="#f26722" text-anchor="middle" font-weight="800">≈92% less human time</text></g><g transform="translate(590,250)" aria-hidden="true"><g class="clockA"><circle cx="0" cy="0" r="48" fill="#211c15" stroke="#f26722" stroke-width="2"></circle><circle cx="0" cy="0" r="3" fill="#f26722"></circle><g transform="translate(0,0)"><g class="handA"><line x1="0" y1="0" x2="0" y2="-34" stroke="#f26722" stroke-width="3" stroke-linecap="round"></line></g></g></g><text x="0" y="72" font-size="11" fill="#f7f7f7" text-anchor="middle" font-weight="700">my time</text><text x="0" y="88" font-size="10" fill="#8b7e66" text-anchor="middle">~5h</text></g><g transform="translate(710,250)" aria-hidden="true"><g class="clockB"><circle cx="0" cy="0" r="48" fill="#1c1712" stroke="#8b7e66" stroke-width="2"></circle><circle cx="0" cy="0" r="3" fill="#8b7e66"></circle><g transform="translate(0,0)"><g class="handB"><line x1="0" y1="0" x2="0" y2="-34" stroke="#d1d1d1" stroke-width="3" stroke-linecap="round"></line></g></g><path class="moonB" d="M14 -18 a10 10 0 1 0 8 15 a8 8 0 1 1 -8 -15 z" fill="#8b7e66"></path></g><text x="0" y="72" font-size="11" fill="#f7f7f7" text-anchor="middle" font-weight="700">agent</text><text x="0" y="88" font-size="10" fill="#8b7e66" text-anchor="middle">after hours</text></g><style>
        .res-svg {
          font-family: inherit;
        }
        .stat {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.8) translateY(10px);
          animation: pop 0.5s cubic-bezier(0.34, 1.5, 0.64, 1) forwards;
          animation-play-state: running;
        }
        .barEst {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: grow 1.1s cubic-bezier(0.4, 0, 0.2, 1) 1.0s forwards;
          animation-play-state: running;
        }
        .barHuman {
          transform-box: fill-box;
          transform-origin: left center;
          transform: scaleX(0);
          animation: grow 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.0s forwards;
          animation-play-state: running;
        }
        .humanLabel {
          opacity: 0;
          animation: fade 0.4s ease-out 2.4s forwards;
          animation-play-state: running;
        }
        .pct {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.85);
          animation: pop 0.5s cubic-bezier(0.34, 1.5, 0.64, 1) 2.7s forwards;
          animation-play-state: running;
        }
        .handA {
          transform-origin: 0 0;
          animation: spinA 2.2s linear 0.6s infinite;
          animation-play-state: running;
        }
        .handB {
          transform-origin: 0 0;
          animation: spinB 1.1s linear 0.6s infinite;
          animation-play-state: running;
        }
        @keyframes pop {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes grow {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes fade {
          to {
            opacity: 1;
          }
        }
        @keyframes spinA {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spinB {
          to {
            transform: rotate(360deg);
          }
        }

        
      </style></svg>`,
  learn: `<svg class="lrn-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A red problem card flips to a green solution card and files onto a growing learnings shelf whose count ticks up; a later slice auto-resolves from the shelf with a fast check."><defs><marker id="lrnArrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 Z" fill="#57c084"></path></marker><clipPath id="lrnReelClip"><rect x="684" y="100" width="58" height="28"></rect></clipPath></defs><g class="problem" aria-hidden="true"><rect x="92" y="140" width="300" height="150" rx="14" fill="#2a1613" stroke="#e0553f" stroke-width="1.5"></rect><circle cx="122" cy="170" r="12" fill="#e0553f"></circle><text x="122" y="176" font-size="15" fill="#1c1712" text-anchor="middle" font-weight="800">!</text><text x="146" y="176" font-size="13" fill="#e0553f" font-weight="800">problem</text><text x="112" y="212" font-size="11" fill="#d1d1d1">SSR hydration mismatch</text><rect x="112" y="228" width="240" height="8" rx="4" fill="#5a3a35"></rect><rect x="112" y="244" width="200" height="8" rx="4" fill="#5a3a35"></rect></g><g class="solution" aria-hidden="true"><rect x="92" y="140" width="300" height="150" rx="14" fill="#12261a" stroke="#57c084" stroke-width="1.5"></rect><circle cx="122" cy="170" r="12" fill="#57c084"></circle><path d="M116 170 l4 4 l8 -9" fill="none" stroke="#0f1a12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><text x="146" y="176" font-size="13" fill="#57c084" font-weight="800">solution</text><text x="112" y="212" font-size="11" fill="#d1d1d1">defer hydration to effect</text><rect x="112" y="228" width="240" height="8" rx="4" fill="#2f5540"></rect><rect x="112" y="244" width="200" height="8" rx="4" fill="#2f5540"></rect></g><path class="fileArrow" d="M396 200 C470 200, 500 175, 588 175" fill="none" stroke="#57c084" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#lrnArrow)" aria-hidden="true"></path><g aria-hidden="true"><rect x="588" y="88" width="160" height="238" rx="12" fill="#211c15" stroke="#4a4a4a"></rect><text x="602" y="122" font-size="10.5" fill="#8b7e66" font-weight="600">learnings</text><g class="sitem si0" style="animation-delay:1.8s"><rect x="602" y="140" width="132" height="20" rx="5" fill="#12261a" stroke="#2f5540"></rect><circle cx="614" cy="150" r="4" fill="#57c084"></circle><rect x="626" y="146" width="96" height="7" rx="3.5" fill="#3f382d"></rect></g><g class="sitem si1" style="animation-delay:1.96s"><rect x="602" y="168" width="132" height="20" rx="5" fill="#12261a" stroke="#2f5540"></rect><circle cx="614" cy="178" r="4" fill="#57c084"></circle><rect x="626" y="174" width="96" height="7" rx="3.5" fill="#3f382d"></rect></g><g class="sitem si2" style="animation-delay:2.12s"><rect x="602" y="196" width="132" height="20" rx="5" fill="#12261a" stroke="#2f5540"></rect><circle cx="614" cy="206" r="4" fill="#57c084"></circle><rect x="626" y="202" width="96" height="7" rx="3.5" fill="#3f382d"></rect></g><g class="sitem si3" style="animation-delay:2.2800000000000002s"><rect x="602" y="224" width="132" height="20" rx="5" fill="#12261a" stroke="#2f5540"></rect><circle cx="614" cy="234" r="4" fill="#57c084"></circle><rect x="626" y="230" width="96" height="7" rx="3.5" fill="#3f382d"></rect></g><g class="sitem si4" style="animation-delay:2.44s"><rect x="602" y="252" width="132" height="20" rx="5" fill="#12261a" stroke="#2f5540"></rect><circle cx="614" cy="262" r="4" fill="#57c084"></circle><rect x="626" y="258" width="96" height="7" rx="3.5" fill="#3f382d"></rect></g><g class="sitem si5" style="animation-delay:2.6s"><rect x="602" y="280" width="132" height="20" rx="5" fill="#12261a" stroke="#2f5540"></rect><circle cx="614" cy="290" r="4" fill="#57c084"></circle><rect x="626" y="286" width="96" height="7" rx="3.5" fill="#3f382d"></rect></g></g><g clip-path="url(#lrnReelClip)" aria-hidden="true"><g class="reel"><text x="734" y="122" font-size="22" fill="#57c084" font-weight="800" text-anchor="end">0</text><text x="734" y="152" font-size="22" fill="#57c084" font-weight="800" text-anchor="end">5</text><text x="734" y="182" font-size="22" fill="#57c084" font-weight="800" text-anchor="end">9</text><text x="734" y="212" font-size="22" fill="#57c084" font-weight="800" text-anchor="end">12</text></g></g><path class="reuseArrow" d="M654 326 C640 372, 400 372, 360 402" fill="none" stroke="#57c084" stroke-width="1.6" stroke-dasharray="4 4" marker-end="url(#lrnArrow)" aria-hidden="true"></path><g class="slice"><rect x="150" y="392" width="264" height="64" rx="12" fill="#1c1712" stroke="#57c084" stroke-width="1.5"></rect><text x="170" y="418" font-size="11" fill="#8b7e66">next slice · same wall</text><g class="autoCheck"><circle cx="184" cy="436" r="11" fill="#57c084"></circle><path d="M178 436 l4 4 l8 -9" fill="none" stroke="#0f1a12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></g><text x="204" y="440" font-size="11.5" fill="#57c084" font-weight="700">auto-resolved</text></g><style>
        .lrn-svg {
          font-family: inherit;
        }
        .problem {
          transform-box: fill-box;
          transform-origin: center;
          animation: flipOut 0.5s ease-in 0.9s forwards;
          animation-play-state: running;
        }
        .solution {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scaleX(0);
          animation: flipIn 0.5s ease-out 1.4s forwards;
          animation-play-state: running;
        }
        .fileArrow {
          stroke-dasharray: 5 4;
          stroke-dashoffset: 220;
          opacity: 0;
          animation: draw 0.7s ease-out 1.9s forwards;
          animation-play-state: running;
        }
        .sitem {
          opacity: 0;
          transform: translateX(10px);
          animation: itemIn 0.3s ease-out forwards;
          animation-play-state: running;
        }
        .reel {
          transform: translateY(0);
          animation: roll 2.2s steps(1) 1.8s forwards;
          animation-play-state: running;
        }
        .reuseArrow {
          stroke-dasharray: 4 4;
          stroke-dashoffset: 360;
          opacity: 0;
          animation: draw 0.8s ease-out 3.3s forwards;
          animation-play-state: running;
        }
        .slice {
          opacity: 0;
          transform: translateY(10px);
          animation: sliceIn 0.4s ease-out 3.1s forwards;
          animation-play-state: running;
        }
        .autoCheck {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.4);
          animation: popCheck 0.4s cubic-bezier(0.34, 1.6, 0.64, 1) 3.9s forwards;
          animation-play-state: running;
        }
        @keyframes flipOut {
          to {
            opacity: 0;
            transform: scaleX(0);
          }
        }
        @keyframes flipIn {
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        @keyframes draw {
          to {
            opacity: 0.9;
            stroke-dashoffset: 0;
          }
        }
        @keyframes itemIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes roll {
          0% {
            transform: translateY(0);
          }
          33% {
            transform: translateY(-30px);
          }
          66% {
            transform: translateY(-60px);
          }
          100% {
            transform: translateY(-90px);
          }
        }
        @keyframes sliceIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes popCheck {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        
      </style></svg>`,
  pattern: `<svg class="pat-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A plan card, a legacy-source folder, and a learnings shelf collapse into a labeled KIT that clones to a grid of twelve service nodes; pubhub_ui is done in orange, the rest queue."><g class="src srcA" aria-hidden="true"><rect x="96" y="86" width="120" height="70" rx="10" fill="#211c15" stroke="#4a4a4a"></rect><rect x="108" y="100" width="80" height="7" rx="3.5" fill="#5a5245"></rect><rect x="108" y="114" width="96" height="6" rx="3" fill="#3f382d"></rect><rect x="108" y="126" width="70" height="6" rx="3" fill="#3f382d"></rect><text x="156" y="150" font-size="8.5" fill="#8b7e66" text-anchor="middle">plan</text></g><g class="src srcB" aria-hidden="true"><path d="M334 92 h34 l10 11 h56 a8 8 0 0 1 8 8 v37 a8 8 0 0 1 -8 8 h-100 a8 8 0 0 1 -8 -8 v-48 a8 8 0 0 1 8 -8 z" fill="#211c15" stroke="#f26722" stroke-width="1.2"></path><text x="384" y="140" font-size="8" fill="#f26722" text-anchor="middle">_source/</text></g><g class="src srcC" aria-hidden="true"><rect x="584" y="86" width="120" height="70" rx="10" fill="#211c15" stroke="#4a4a4a"></rect><rect x="596" y="100" width="96" height="10" rx="4" fill="#12261a" stroke="#2f5540"></rect><rect x="596" y="114" width="96" height="10" rx="4" fill="#12261a" stroke="#2f5540"></rect><rect x="596" y="128" width="96" height="10" rx="4" fill="#12261a" stroke="#2f5540"></rect><text x="644" y="150" font-size="8.5" fill="#57c084" text-anchor="middle">learnings</text></g><g class="kit" aria-hidden="true"><rect x="322" y="176" width="156" height="86" rx="14" fill="#1c1712" stroke="#f26722" stroke-width="2"></rect><text x="400" y="216" font-size="22" fill="#f26722" text-anchor="middle" font-weight="800" letter-spacing="0.08em">KIT</text><text x="400" y="238" font-size="10" fill="#8b7e66" text-anchor="middle">service-agnostic</text></g><g class="clones" fill="none" stroke="#f26722" stroke-width="1.3" stroke-dasharray="4 4" aria-hidden="true"><path d="M360 262 C300 288, 180 296, 140 318"></path><path d="M400 262 v46"></path><path d="M440 262 C500 288, 620 296, 700 318"></path></g><g class="node n0" style="animation-delay:1.4s" aria-hidden="true"><rect x="90" y="318" width="100" height="60" rx="10" fill="#1c1712" stroke="#f26722" stroke-width="2"></rect><circle cx="106" cy="336" r="6" fill="#f26722"></circle><path d="M102.5 336 l2.5 2.5 l5 -5.5" fill="none" stroke="#1c1712" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path><text x="120" y="340" font-size="9" fill="#f7f7f7" font-weight="700">pubhub_ui</text><text x="106" y="364" font-size="8.5" fill="#f26722" font-weight="700">done</text></g><g class="node n1" style="animation-delay:1.49s" aria-hidden="true"><rect x="202" y="318" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="218" cy="336" r="6" fill="#5a5245"></circle><text x="232" y="340" font-size="9" fill="#d1d1d1" font-weight="400">feed_svc</text><text x="218" y="364" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n2" style="animation-delay:1.5799999999999998s" aria-hidden="true"><rect x="314" y="318" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="330" cy="336" r="6" fill="#5a5245"></circle><text x="344" y="340" font-size="9" fill="#d1d1d1" font-weight="400">quiz_ui</text><text x="330" y="364" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n3" style="animation-delay:1.67s" aria-hidden="true"><rect x="426" y="318" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="442" cy="336" r="6" fill="#5a5245"></circle><text x="456" y="340" font-size="9" fill="#d1d1d1" font-weight="400">img_proxy</text><text x="442" y="364" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n4" style="animation-delay:1.7599999999999998s" aria-hidden="true"><rect x="538" y="318" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="554" cy="336" r="6" fill="#5a5245"></circle><text x="568" y="340" font-size="9" fill="#d1d1d1" font-weight="400">auth_gw</text><text x="554" y="364" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n5" style="animation-delay:1.8499999999999999s" aria-hidden="true"><rect x="650" y="318" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="666" cy="336" r="6" fill="#5a5245"></circle><text x="680" y="340" font-size="9" fill="#d1d1d1" font-weight="400">editor_ui</text><text x="666" y="364" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n6" style="animation-delay:1.94s" aria-hidden="true"><rect x="90" y="398" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="106" cy="416" r="6" fill="#5a5245"></circle><text x="120" y="420" font-size="9" fill="#d1d1d1" font-weight="400">trends_svc</text><text x="106" y="444" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n7" style="animation-delay:2.03s" aria-hidden="true"><rect x="202" y="398" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="218" cy="416" r="6" fill="#5a5245"></circle><text x="232" y="420" font-size="9" fill="#d1d1d1" font-weight="400">share_api</text><text x="218" y="444" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n8" style="animation-delay:2.12s" aria-hidden="true"><rect x="314" y="398" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="330" cy="416" r="6" fill="#5a5245"></circle><text x="344" y="420" font-size="9" fill="#d1d1d1" font-weight="400">embed_ui</text><text x="330" y="444" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n9" style="animation-delay:2.21s" aria-hidden="true"><rect x="426" y="398" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="442" cy="416" r="6" fill="#5a5245"></circle><text x="456" y="420" font-size="9" fill="#d1d1d1" font-weight="400">notif_svc</text><text x="442" y="444" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n10" style="animation-delay:2.3s" aria-hidden="true"><rect x="538" y="398" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="554" cy="416" r="6" fill="#5a5245"></circle><text x="568" y="420" font-size="9" fill="#d1d1d1" font-weight="400">search_ui</text><text x="554" y="444" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><g class="node n11" style="animation-delay:2.3899999999999997s" aria-hidden="true"><rect x="650" y="398" width="100" height="60" rx="10" fill="#211c15" stroke="#4a4a4a" stroke-width="1"></rect><circle cx="666" cy="416" r="6" fill="#5a5245"></circle><text x="680" y="420" font-size="9" fill="#d1d1d1" font-weight="400">admin_ui</text><text x="666" y="444" font-size="8.5" fill="#8b7e66" font-weight="400">queued</text></g><style>
        .pat-svg {
          font-family: inherit;
        }
        .src {
          transform-box: fill-box;
          transform-origin: center;
          animation: collapse 0.8s cubic-bezier(0.5, 0, 0.5, 1) 0.4s forwards;
          animation-play-state: running;
        }
        .srcA {
          transform: translate(0, 0);
        }
        .srcB {
          transform: translate(0, 0);
        }
        .srcC {
          transform: translate(0, 0);
        }
        .srcA {
          animation-name: collapseA;
        }
        .srcC {
          animation-name: collapseC;
        }
        .srcB {
          animation-name: collapseB;
        }
        .kit {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.7);
          animation: kitIn 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 1.0s forwards;
          animation-play-state: running;
        }
        .clones {
          stroke-dashoffset: 200;
          opacity: 0;
          animation: cloneDraw 0.8s ease-out 1.3s forwards;
          animation-play-state: running;
        }
        .node {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          transform: scale(0.7);
          animation: nodeIn 0.35s cubic-bezier(0.34, 1.5, 0.64, 1) forwards;
          animation-play-state: running;
        }
        .n0 {
          animation: nodeIn 0.35s cubic-bezier(0.34, 1.5, 0.64, 1) 1.4s forwards, doneGlow 2s ease-in-out 2.6s infinite;
        }
        @keyframes collapseA {
          to {
            opacity: 0.15;
            transform: translate(268px, 108px) scale(0.5);
          }
        }
        @keyframes collapseB {
          to {
            opacity: 0.15;
            transform: translate(16px, 96px) scale(0.5);
          }
        }
        @keyframes collapseC {
          to {
            opacity: 0.15;
            transform: translate(-244px, 108px) scale(0.5);
          }
        }
        @keyframes kitIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes cloneDraw {
          to {
            opacity: 0.8;
            stroke-dashoffset: 0;
          }
        }
        @keyframes nodeIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes doneGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 0 rgba(242, 103, 34, 0));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(242, 103, 34, 0.6));
          }
        }

        
      </style></svg>`,
};
