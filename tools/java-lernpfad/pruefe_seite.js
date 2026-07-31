/* Prueft alle onlineide-Bloecke der gerade geoeffneten Hyperbook-Seite auf
   Uebersetzungsfehler.

   Verwendung: den Inhalt dieser Datei im Browser auf der Seite ausfuehren
   (Konsole oder javascript_tool). Rueckgabe je Block:

     nr      Index des Blocks auf der Seite
     dateien Dateinamen im Block
     fehler  Text aus dem Reiter "Fehler"

   Die IDE uebersetzt jeden Block schon beim Sichtbarwerden - dafuer reicht
   dieses Skript. Das *Ausfuehren* laesst sich nicht zuverlaessig per Skript
   ausloesen (der Startpfeil reagiert nur auf echte Mausklicks), das muss
   stichprobenartig von Hand passieren.
*/
(async () => {
  const schlaf = (ms) => new Promise((r) => setTimeout(r, ms));
  const ides = [...document.querySelectorAll(".java-online")];

  // Alle IDEs einmal sichtbar machen, damit sie sich initialisieren.
  for (const el of ides) {
    el.scrollIntoView({ block: "center" });
    await schlaf(2500);
  }

  const ergebnis = [];
  for (let i = 0; i < ides.length; i++) {
    const el = ides[i];
    el.scrollIntoView({ block: "center" });
    await schlaf(1200);

    const dateien = [...el.querySelectorAll(".jo_filename, [class*=file] span")]
      .map((n) => n.innerText.trim())
      .filter((t) => t.endsWith(".java"));

    const text = (sel) =>
      [...el.querySelectorAll(sel)]
        .map((n) => n.innerText.trim())
        .filter(Boolean)
        .join("\n")
        .slice(0, 800);

    ergebnis.push({
      nr: i,
      dateien: [...new Set(dateien)],
      fehler: text(".jo_errorsTab"),
    });
  }
  return ergebnis;
})();
