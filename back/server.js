import express from "express";

const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// 🎵 AUDIO
app.get("/audio", async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).send("No id");
    }

    const url = `https://cdn.uwupad.me/${id}.mp3`;

    const range = req.headers.range;
    const headers = range ? { Range: range } : {};

    const r = await fetch(url, { headers });

    if (!r.ok) {
      return res.status(r.status).send("Upstream error");
    }

    res.status(r.status);

    res.set({
      "Content-Type": r.headers.get("content-type") || "audio/mpeg",
      "Content-Length": r.headers.get("content-length"),
      "Accept-Ranges": "bytes",
      "Content-Range": r.headers.get("content-range"),
    });

    // ✅ ВАЖНО: WebStream → Node stream
    const buffer = await r.arrayBuffer();
    res.send(Buffer.from(buffer));

  } catch (e) {
    console.error("AUDIO ERROR:", e);
    res.status(500).send("audio error");
  }
});

// 🖼️ IMAGE
app.get("/image", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).send("No url");
    }

    const r = await fetch(url);

    if (!r.ok) {
      return res.status(r.status).send("Upstream error");
    }

    res.set("Content-Type", r.headers.get("content-type") || "image/jpeg");

    const buffer = await r.arrayBuffer();
    res.send(Buffer.from(buffer));

  } catch (e) {
    console.error("IMAGE ERROR:", e);
    res.status(500).send("image error");
  }
});

app.listen(3000, () => {
  console.log("server started on http://localhost:3000");
});