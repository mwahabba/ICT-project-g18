import fs from "fs";
import path from "path";

const dataDir = path.resolve("backend/data");
const localPath = path.join(dataDir, "regulations.json");
const remotePath = path.join(dataDir, "remote-regulations.json");
const statusPath = path.join(dataDir, "status.json");

function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf8");
}

function isNewer(remoteVersion, localVersion) {
  // expects versions like "2024.10" -> "2025.02"
  const toNum = (v) => Number(String(v).replace(".", ""));
  return toNum(remoteVersion) > toNum(localVersion);
}

function runUpdateCheck() {
  const local = readJson(localPath, { version: "0.00" });
  const remote = readJson(remotePath, null);

  const now = new Date().toISOString();

  if (!remote?.version) {
    writeJson(statusPath, {
      lastChecked: now,
      currentVersion: local.version,
      notes: "Remote source missing or invalid."
    });
    return;
  }

  if (isNewer(remote.version, local.version)) {
    writeJson(localPath, remote);
    writeJson(statusPath, {
      lastChecked: now,
      currentVersion: remote.version,
      notes: `Updated to latest regulations (including ${remote.amendments?.join(", ") || "amendments"}).`
    });
  } else {
    writeJson(statusPath, {
      lastChecked: now,
      currentVersion: local.version,
      notes: "Already up to date."
    });
  }
}

runUpdateCheck();
console.log("Update check completed.");
