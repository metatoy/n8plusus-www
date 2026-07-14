// N8+US site — serves the static site + POST /api/contact → Migadu SMTP → hello@n8plusus.com.
// JS only, Node 20, ESM. Env: SMTP_USER, SMTP_PASS (required to send); CONTACT_TO, SMTP_HOST/PORT (optional).
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {
  PORT = 3000,
  SMTP_HOST = 'smtp.migadu.com',
  SMTP_PORT = 465,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_TO = 'hello@n8plusus.com',
} = process.env;

const app = express();
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true, limit: '32kb' }));
app.use(express.json({ limit: '32kb' }));

const transporter =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: true, auth: { user: SMTP_USER, pass: SMTP_PASS } })
    : null;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

app.get('/health', (_req, res) => res.status(200).send('ok'));

app.post('/api/contact', async (req, res) => {
  const b = req.body || {};
  const name = String(b.name || '').trim();
  const email = String(b.email || '').trim();
  const message = String(b.message || '').trim();
  const company = String(b.company || '').trim(); // honeypot (hidden field)

  if (company) return res.status(200).json({ ok: true }); // bot — silently accept + drop
  if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'All fields are required.' });
  if (!EMAIL_RE.test(email) || email.length > 254) return res.status(400).json({ ok: false, error: 'Enter a valid email.' });
  if (message.length > 5000) return res.status(400).json({ ok: false, error: 'Message too long.' });
  if (!transporter) {
    console.error('[contact] SMTP not configured (SMTP_USER/SMTP_PASS missing)');
    return res.status(500).json({ ok: false, error: 'Mail is not configured yet.' });
  }

  try {
    await transporter.sendMail({
      from: `"N8+US Site" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New project inquiry — ${name}`,
      text: `Name:  ${name}\nEmail: ${email}\n\n${message}\n\n— n8plusus.com contact form`,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[contact] sendMail failed:', e.message);
    return res.status(502).json({ ok: false, error: 'Could not send right now — try again shortly.' });
  }
});

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`n8plusus-www listening on :${PORT}`));
