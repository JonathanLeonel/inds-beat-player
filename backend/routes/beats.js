const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const beatsPath = process.env.NODE_ENV ? "./beats" : "/var/www/beats"

/* GET beat list. */
router.get("/", function (req, res, next) {
  //   res.render("index", { title: "IndustrialesBeats" });

  const beats = fs.readdirSync(beatsPath);

  res.send({
    beats: beats,
  });
});

router.get("/stream/:name", (req, res) => {
  const filePath = path.join(beatsPath, `${req.params.name}`);

  console.log(filePath);

  if (!fs.existsSync(filePath)) return res.sendStatus(404);

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    });

    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

module.exports = router;
