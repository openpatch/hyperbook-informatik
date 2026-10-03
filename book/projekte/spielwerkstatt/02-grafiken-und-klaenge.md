---
name: Grafiken und Klänge
index: 2
lang: de
permaid: spielwerkstatt-grafiken
keywords:
  - java
  - scratch4j
  - spiel
scripts:
  - /wc/asset-suche.js
---

# Grafiken und Klänge

Im Ordner `assets` liegen über 2000 Grafiken und Klänge für dein Spiel: Figuren, Monster, Tiere, Kachelbilder für Räume, Gegenstände, Effekte, Bedienelemente, Soundeffekte und Musik. Hier findest du sie.

**So gehst du vor:** Suche nach einem Wort, zum Beispiel `ninja`, `slime`, `tree` oder `coin`, oder wähle einen Bereich. Ein Klick auf eine Karte zeigt die Datei groß und darunter den Java-Code, mit dem du sie lädst. Bei einem **Kachelbild** klickst du im großen Bild auf die Kachel, die du haben willst.

<asset-suche liste="assets-liste.json"></asset-suche>

## Welcher Code wofür?

| Was du gefunden hast | So lädst du es | Beispiel im Startgerüst |
| --- | --- | --- |
| eine **Figur** oder ein **Monster** | vier Animationen, eine je Blickrichtung | `Spieler` |
| mehrere gleich große Bilder nebeneinander, ein **Streifen** | eine Animation | `Muenze` |
| ein **Kachelbild** | ein Ausschnitt als Kostüm, meist 16 × 16 Pixel, große Pflanzen und Felsen 32 × 32 | Baum, Tanne und Fels in `Welt` |
| ein **einzelnes Bild** | ein Kostüm, oder mit `addBackdrop` als Hintergrund der Bühne | die Wiese in `Spielwelt` |
| ein **Klang** oder ein **Musikstück** | `addSound`, dann `playSound` | `Spieler` |

:::snippet{#merken}
Animationen gibt es nur in einer Klasse, die von `AnimatedSprite` erbt. `addCostume` und `addSound` gehen in jedem `Sprite`, `addSound` auch in der `Stage`.

Der Code stimmt im Buch **und** auf deinem Rechner, denn beide lesen `assets/…` relativ zum Projekt.
:::

## Eigene Grafiken

Du kannst auch eigene Bilder und Klänge verwenden. Lade sie in der Dateiliste der Entwicklungsumgebung hoch (Symbol mit dem Bild neben „Dateien"). Den Dateinamen, den sie dort haben, schreibst du dann statt `assets/…` in deinen Code. Auf deinem Rechner legst du dieselbe Datei in den Projektordner.

Pixelgrafik bleibt nur scharf, wenn sie klein gezeichnet und im Spiel vergrößert wird. Das erledigt die Zeile `Window.useTextureSampling(TextureSampling.POINT);` in `Main`.

<!--
Für Lehrkräfte: Die Liste assets-liste.json erzeugt
tools/spielwerkstatt/erzeuge_assetliste.py aus dem Ordner assets. Nach einer
Änderung an den Assets neu erzeugen.

Grafik und Klang: Ninja Adventure Asset Pack (Pixel-boy, AAA), CC0.
-->
