import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'Spanzor Backend' });
});

// Verify reCAPTCHA v3 token
app.post('/verify-recaptcha', async (req, res) => {
  try {
    const { token } = req.body || {};
    if (!token) return res.status(400).json({ ok: false, error: 'missing token' });
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const resp = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token })
    });
    const data = await resp.json();
    res.json({ ok: !!data.success, score: data.score, action: data.action });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

// Verify Google ID token
app.post('/auth/google', async (req, res) => {
  try {
    const { credential } = req.body || {};
    if (!credential) return res.status(400).json({ ok: false, error: 'missing credential' });
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    res.json({ ok: true, user: { sub: payload.sub, email: payload.email, name: payload.name, picture: payload.picture } });
  } catch (e) {
    res.status(401).json({ ok: false, error: 'invalid token' });
  }
});

app.listen(PORT, () => console.log(`Backend running on :${PORT}`));