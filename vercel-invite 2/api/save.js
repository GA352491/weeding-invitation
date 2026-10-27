const U = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const T = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const b = req.body || {};
  if (!process.env.EDIT_PASSWORD || b.password !== process.env.EDIT_PASSWORD)
    return res.status(401).json({ error: "Wrong password" });
  const d = b.data;
  if (!d || !Array.isArray(d.ev) || d.ev.length > 30) return res.status(400).json({ error: "Invalid data" });
  d.ev.forEach((o) => { o.k = Math.max(0, Math.min(5, parseInt(o.k, 10) || 0)); });
  const s = JSON.stringify(d);
  if (s.length > 40000) return res.status(400).json({ error: "Too much text" });
  if (!U) return res.status(500).json({ error: "Storage is not connected yet" });
  const r = await fetch(U + "/set/invite", { method: "POST", headers: { Authorization: "Bearer " + T }, body: s });
  if (!r.ok) return res.status(500).json({ error: "Storage error" });
  res.status(200).json({ ok: true });
};
