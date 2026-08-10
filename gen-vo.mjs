// Regenerate walkthrough VO clips for a demo slug with the "Michael" voice
// (matches the ai-triage re-voice). Reads the step `body` transcripts from the
// walkthrough HTML manifest, calls ElevenLabs TTS per step, writes step-0N.mp3,
// re-measures duration with afinfo, and patches durationMs back into the HTML.
//
// Usage:  node gen-vo.mjs <slug> [--dry]
//   slug ∈ callout | migration | sorb | studio | ai-triage
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const VOICE = "EK4IAYGwCrQUchP03Yjp"; // Michael
const MODEL = "eleven_multilingual_v2";
const OUTFMT = "mp3_44100_128";
const SETTINGS = { stability: 0.5, similarity_boost: 0.75, style: 0, use_speaker_boost: true };

const slug = process.argv[2];
const dry = process.argv.includes("--dry");
if (!slug) { console.error("usage: node gen-vo.mjs <slug> [--dry]"); process.exit(1); }

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "public", "portfolio", "walkthroughs", `${slug}.html`);
let html = readFileSync(htmlPath, "utf8");

// pull each manifest step object (no nested braces in a step → non-greedy is safe)
const blocks = html.match(/\{\s*id:\s*"[^"]+"[\s\S]*?\}/g) || [];
const steps = [];
for (const b of blocks) {
  const audio = (b.match(/audio:\s*"([^"]+)"/) || [])[1];
  const bodyRaw = (b.match(/body:\s*"((?:\\.|[^"\\])*)"/) || [])[1];
  if (!audio || bodyRaw == null) continue;
  steps.push({ block: b, audio, body: JSON.parse('"' + bodyRaw + '"') });
}
console.log(`${slug}: ${steps.length} steps`);
if (dry) {
  for (const s of steps) console.log(`  ${s.audio}  «${s.body.slice(0, 64)}…»`);
  process.exit(0);
}

const KEY = execSync("security find-generic-password -s elevenlabs-api -w", { encoding: "utf8" }).trim();
if (!KEY) { console.error("no elevenlabs-api key in Keychain"); process.exit(1); }

for (const s of steps) {
  const outPath = join(__dirname, "public", s.audio.replace(/^\//, ""));
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=${OUTFMT}`, {
    method: "POST",
    headers: { "xi-api-key": KEY, "content-type": "application/json", accept: "audio/mpeg" },
    body: JSON.stringify({ text: s.body, model_id: MODEL, voice_settings: SETTINGS }),
  });
  if (!res.ok) { console.error("TTS failed", s.audio, res.status, (await res.text()).slice(0, 300)); process.exit(1); }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outPath, buf);
  const info = execSync(`afinfo "${outPath}"`, { encoding: "utf8" });
  const sec = parseFloat((info.match(/estimated duration:\s*([\d.]+)/) || [])[1] || "0");
  const ms = Math.round(sec * 1000);
  html = html.replace(s.block, s.block.replace(/durationMs:\s*\d+/, `durationMs: ${ms}`));
  console.log(`  ${s.audio}  ${Math.round(buf.length / 1024)}KB  ${sec.toFixed(1)}s → durationMs ${ms}`);
}
writeFileSync(htmlPath, html);
console.log(`✓ ${slug}: regenerated ${steps.length} clips (Michael) + patched durations`);
