const U = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const T = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const b = req.body || {};
  if (b.hp) return res.status(200).json({ ok: true });
  const name = String(b.name || "").trim().slice(0, 100);
  if (!name) return res.status(400).json({ error: "Name required" });
  if (!U) return res.status(500).json({ error: "Storage is not connected yet" });
  const row = {
    t: new Date().toISOString(),
    name,
    phone: String(b.phone || "").trim().slice(0, 30),
    guests: Math.max(1, Math.min(20, parseInt(b.guests, 10) || 1)),
    events: (Array.isArray(b.events) ? b.events : []).slice(0, 30).map((x) => String(x).slice(0, 80)),
    msg: String(b.msg || "").trim().slice(0, 500),
  };
  const r = await fetch(U + "/rpush/rsvp", { method: "POST", headers: { Authorization: "Bearer " + T }, body: JSON.stringify(row) });
  if (!r.ok) return res.status(500).json({ error: "Storage error" });
  res.status(200).json({ ok: true });
};
