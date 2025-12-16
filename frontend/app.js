const API = "http://localhost:3001";

async function refreshStatus() {
  const badge = document.getElementById("regStatusBadge");

  try {
    const res = await fetch(`${API}/api/status`);
    const status = await res.json();

    const version = status.currentVersion || "unknown";
    const notes = status.notes || "";
    const checked = status.lastChecked ? new Date(status.lastChecked).toLocaleString() : "—";

    badge.textContent = `Up to date (v${version}) • Checked: ${checked}`;
    badge.title = notes;
  } catch (e) {
    badge.textContent = "Update check failed";
    badge.title = String(e);
  }
}

async function loadPart(partLetter) {
  const res = await fetch(`${API}/api/regulations?part=${partLetter}`);
  if (!res.ok) throw new Error("Failed to load regulations");
  return res.json();
}

// Demo: auto refresh badge every 30s
refreshStatus();
setInterval(refreshStatus, 30000);

// Example usage when user clicks a Part card:
async function openSelectedPart(partLetter) {
  const data = await loadPart(partLetter);
  console.log("Loaded:", data); // replace with your UI render
}


async function loadRegulationUpdateStatus() {
  const badge = document.getElementById("regUpdateStatus");
  if (!badge) return;

  try {
    const res = await fetch("http://localhost:3001/api/status");
    const data = await res.json();

    badge.textContent = `🟢 Regulations up to date (v${data.currentVersion})`;
    badge.title = data.notes || "";
  } catch (err) {
    badge.textContent = "⚠️ Unable to check regulation updates";
  }
}


loadRegulationUpdateStatus();
// -------------------------