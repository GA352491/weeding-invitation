const U = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const T = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  try {
    if (!U) return res.status(200).json({});
    const r = await fetch(U + "/get/invite", { headers: { Authorization: "Bearer " + T } });
    const j = await r.json();
    res.status(200).json(j.result ? JSON.parse(j.result) : {});
  } catch (e) {
    res.status(200).json({});
  }
};
