// A fresh output directory prevents deleted lessons from surviving a build.
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const manifestPath = require.resolve("hyperbook/package.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const cli = path.resolve(path.dirname(manifestPath), manifest.bin.hyperbook);

const checkpoints = spawnSync("python3", ["tools/spielwerkstatt/erzeuge_checkpoints.py", "--check"], { cwd: root, stdio: "inherit" });
if (checkpoints.status !== 0) process.exit(checkpoints.status ?? 1);
const downloads = spawnSync("python3", ["tools/spielwerkstatt/erzeuge_checkpoints.py", "--zip-only"], { cwd: root, stdio: "inherit" });
if (downloads.status !== 0) process.exit(downloads.status ?? 1);

fs.rmSync(path.join(root, ".hyperbook", "out"), { recursive: true, force: true });
const result = spawnSync(process.execPath, [cli, "build", ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
