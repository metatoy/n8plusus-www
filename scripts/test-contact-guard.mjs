// End-to-end checks for the POST /api/contact guards. Starts the real server on a spare
// port with no SMTP configured, so a submission that passes every guard lands on the
// "Mail is not configured yet" 500 — which is the pass signal for the happy path.
//
// Run:  node scripts/test-contact-guard.mjs
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3399;
const BASE = `http://127.0.0.1:${PORT}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0;
let fail = 0;
const check = (name, cond, detail = "") => {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.log(`  ✗ ${name}  ${detail}`);
  }
};

const post = (body, ip = "203.0.113.9") =>
  fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
    body: JSON.stringify(body),
  }).then((r) => r.json().then((j) => ({ status: r.status, j })));

const getToken = (ip = "203.0.113.9") =>
  fetch(`${BASE}/api/contact-token`, { headers: { "X-Forwarded-For": ip } }).then((r) => r.json());

const GOOD = { name: "Dana Reed", email: "dana@example.com", message: "We need a design-token bridge for our React app. Do you take short engagements?" };

const server = spawn(process.execPath, ["server.js"], {
  cwd: ROOT,
  env: { ...process.env, PORT: String(PORT), SMTP_USER: "", SMTP_PASS: "", CONTACT_TOKEN_SECRET: "test-secret" },
  stdio: ["ignore", "pipe", "pipe"],
});
const log = [];
server.stdout.on("data", (d) => log.push(String(d)));
server.stderr.on("data", (d) => log.push(String(d)));

try {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`${BASE}/health`)).ok) break;
    } catch (e) {
      await sleep(100);
    }
  }

  console.log("\nblind POST (what the Tor spammers do)");
  check("no token → 400", (await post(GOOD, "198.51.100.1")).status === 400);
  check("garbage token → 400", (await post({ ...GOOD, token: "v1.1.2.3" }, "198.51.100.2")).status === 400);

  console.log("\nhoneypot");
  const hp = await post({ ...GOOD, company: "Acme" }, "198.51.100.3");
  check("filled honeypot → 200 (silently dropped)", hp.status === 200 && hp.j.ok === true);
  check("honeypot drop is logged", log.join("").includes("why=honeypot"));

  console.log("\ntoken lifecycle");
  const { token } = await getToken("203.0.113.10");
  check("token minted", typeof token === "string" && token.startsWith("v1."));
  check("used before 3s → 400", (await post({ ...GOOD, token }, "203.0.113.10")).status === 400);
  await sleep(3100);
  const sent = await post({ ...GOOD, token }, "203.0.113.10");
  check("valid token passes every guard → reaches mailer", sent.status === 500 && /not configured/i.test(sent.j.error), JSON.stringify(sent));
  const replay = await post({ ...GOOD, token }, "203.0.113.10");
  check("same token replayed → 400", replay.status === 400);
  check("replay is logged", log.join("").includes("why=token_replayed"));

  console.log("\ncontent sanity");
  const mk = async (over, ip) => {
    const t = (await getToken(ip)).token;
    await sleep(3100);
    return post({ ...GOOD, ...over, token: t }, ip);
  };
  const links = await mk({ message: "Great site! http://a.example http://b.example http://c.example buy now" }, "203.0.113.20");
  check("3+ links → 400 with a fixable message", links.status === 400 && /at most two links/.test(links.j.error), JSON.stringify(links));
  const short = await mk({ message: "hi" }, "203.0.113.21");
  check("one-word message → 400", short.status === 400 && /at least a sentence/.test(short.j.error), JSON.stringify(short));
  const nameUrl = await mk({ name: "http://spam.example" }, "203.0.113.22");
  check("URL in the name field → 400", nameUrl.status === 400, JSON.stringify(nameUrl));

  console.log("\nrate limiting");
  const ip = "203.0.113.30";
  const statuses = [];
  for (let i = 0; i < 5; i++) {
    const t = (await getToken(ip)).token;
    await sleep(3100);
    statuses.push((await post({ ...GOOD, token: t }, ip)).status);
  }
  check("4th send from one IP within the hour → 429", statuses[3] === 429 && statuses[4] === 429, JSON.stringify(statuses));
  check("first 3 got through to the mailer", statuses.slice(0, 3).every((s) => s === 500), JSON.stringify(statuses));
  const limited = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
    body: JSON.stringify(GOOD),
  });
  check("429 carries Retry-After", Number(limited.headers.get("retry-after")) > 0);

  console.log("\ntoken endpoint is itself limited");
  let tokenStatus = 200;
  for (let i = 0; i < 22; i++) tokenStatus = (await fetch(`${BASE}/api/contact-token`, { headers: { "X-Forwarded-For": "203.0.113.40" } })).status;
  check("21st token request in an hour → 429", tokenStatus === 429);

  console.log(`\n${fail === 0 ? "✓ all" : "✗"} ${pass} passed, ${fail} failed\n`);
} finally {
  server.kill();
}
process.exit(fail === 0 ? 0 : 1);
