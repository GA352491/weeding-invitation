const U = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const T = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const b = req.body || {};
  if (!process.env.EDIT_PASSWORD || b.password !== process.env.EDIT_PASSWORD)
    return res.status(401).json({ error: "Wrong password" });
  if (!U) return res.status(500).json({ error: "Storage is not connected yet" });
  const r = await fetch(U + "/lrange/rsvp/0/-1", { headers: { Authorization: "Bearer " + T } });
  const j = await r.json();
  const rows = (j.result || []).map((s) => { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean);
  res.status(200).json({ rows });
};
