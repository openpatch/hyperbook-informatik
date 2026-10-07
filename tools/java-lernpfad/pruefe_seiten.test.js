const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const { alleSeiten } = require("./pruefe_seiten");

test("finds embedded Java pages throughout the build, including new projects", () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "java-seiten-"));
  try {
    const pages = {
      "oberstufe/oop/start.html": '<div class="java-online"></div>',
      "projekte/spielwerkstatt/00-werkstatt.html": '<div class="notranslate java-online joeCssFence"></div>',
      "projekte/neues-projekt/start.html": "<div class='java-online extra'></div>",
      "info.html": '<p>Java lernen</p><script>const selector = ".java-online";</script>',
      "web.html": '<div class="webide"></div>',
      "similar.html": '<div class="java-online-example"></div>',
      "__hyperbook_assets/directive-onlineide/include/embedded_java.html": '<div class="java-online"></div>',
      "source.txt": '<div class="java-online"></div>',
    };
    for (const [name, html] of Object.entries(pages)) {
      const filename = path.join(out, name);
      fs.mkdirSync(path.dirname(filename), { recursive: true });
      fs.writeFileSync(filename, html);
    }
    assert.deepEqual(alleSeiten(out), [
      "oberstufe/oop/start.html",
      "projekte/neues-projekt/start.html",
      "projekte/spielwerkstatt/00-werkstatt.html",
    ]);
  } finally {
    fs.rmSync(out, { recursive: true, force: true });
  }
});

test("missing or empty builds fail instead of passing without checking a lesson", () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "java-seiten-"));
  try {
    assert.throws(() => alleSeiten(path.join(out, "missing")), /Build/);
    assert.throws(() => alleSeiten(out), /Keine.*Java/);
  } finally {
    fs.rmSync(out, { recursive: true, force: true });
  }
});
