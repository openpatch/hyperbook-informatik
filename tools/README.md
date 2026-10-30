# Werkzeuge

Wenige Generatoren – sie erzeugen Dateien, die im Buch eingecheckt sind. Der
Build selbst braucht keins davon: `npx hyperbook build` (Hyperbook Cloud baut
genauso, nur mit `--offline` in der Sandbox).

| Generator | Erzeugt |
| --- | --- |
| `python3 tools/spielwerkstatt/erzeuge_checkpoints.py` | `book/projekte/spielwerkstatt/checkpoints/*.json` und die Studio-Einstellungen in `archives/spielwerkstatt/.scratch4j` |
| `python3 tools/spielwerkstatt/erzeuge_assetliste.py` | `book/projekte/spielwerkstatt/assets-liste.json` (Asset-Suche) |
| `python3 tools/datenbank-lernpfad/erzeuge_datenbanken.py` | die SQLite-Dateien unter `public/datenbanken/` |

Nach Änderungen an den jeweiligen Quellen den Generator ausführen und die
erzeugten Dateien mit committen. `erzeuge_checkpoints.py --check` meldet
veraltete Checkpoints – `node tools/baue.js` ruft diesen Check vor jedem Build
auf und baut danach in ein frisches `.hyperbook/out`.
