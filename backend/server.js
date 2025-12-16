import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const dataDir = path.resolve("backend/data");
const regsPath = path.join(dataDir, "regulations.json");
const statusPath = path.join(dataDir, "status.json");

function readJson(filePath, fallback = {}) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

app.get("/api/status", (req, res) => {
  const status = readJson(statusPath, {
    lastChecked: null,
    currentVersion: "unknown",
    notes: ""
  });
  res.json(status);
});

app.get("/api/regulations", (req, res) => {
  const { part } = req.query; // B / F / L / O
  const regs = readJson(regsPath, { version: "unknown", parts: {} });

  if (!part) {
    return res.json(regs);
  }

  const key = String(part).toUpperCase();
  const partData = regs.parts?.[key];

  if (!partData) {
    return res.status(404).json({ error: `Part ${key} not found` });
  }

  res.json({
    version: regs.version,
    part: key,
    ...partData
  });
});

app.get("/api/etag", (req, res) => {
  // lightweight “has it changed?” endpoint
  const regs = readJson(regsPath, { version: "unknown" });
  res.json({ version: regs.version });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
