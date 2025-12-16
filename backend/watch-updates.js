import { exec } from "child_process";

setInterval(() => {
  exec("node backend/updater.js", (err, stdout, stderr) => {
    if (err) console.error(err);
    if (stdout) console.log(stdout.trim());
    if (stderr) console.error(stderr.trim());
  });
}, 60_000); // every 60 seconds (demo-friendly)
