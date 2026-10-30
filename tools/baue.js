// Lokaler Komfort-Wrapper um "npx hyperbook build": derselbe reine
// Hyperbook-Build, den auch Hyperbook Cloud ausfuehrt ("hyperbook build
// --offline" in der Sandbox). Dieser Wrapper prueft zusaetzlich die
// Checkpoints und baut in ein frisches Output-Verzeichnis, damit keine
// geloeschten Seiten ueberleben.
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");

const checkpoints = spawnSync("python3", ["tools/spielwerkstatt/erzeuge_checkpoints.py", "--check"], { cwd: root, stdio: "inherit" });
if (checkpoints.status !== 0) process.exit(checkpoints.status ?? 1);

fs.rmSync(path.join(root, ".hyperbook", "out"), { recursive: true, force: true });
const result = spawnSync("npx", ["--yes", "hyperbook", "build", ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
