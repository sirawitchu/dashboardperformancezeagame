export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

const { password } = req.body || {};
  const expected = process.env.DASHBOARD_PASSWORD;

if (!expected) {
  res.status(500).json({ ok: false, error: 'ยังไม่ได้ตั้งค่ารหัสผ่านบนเซิร์ฟเวอร์' });
  return;
}

if (password === expected) {
  const maxAge = 60 * 60 * 24 * 30;
  res.setHeader('Set-Cookie', `dash_auth=ok; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`);
  res.status(200).json({ ok: true });
} else {
  res.status(401).json({ ok: false, error: 'รหัสผ่านไม่ถูกต้อง' });
}
}
