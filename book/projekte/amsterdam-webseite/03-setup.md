---
name: Setup
lang: de
index: 3
---

# Setup

Für dein eigenes Projekt brauchst du zwei Dinge: einen **Editor** und eine **Vorschau**, die dir die Seite anzeigt, während du schreibst.

## Der Editor

Ich arbeite mit [VS Code](https://code.visualstudio.com/). Er ist kostenlos, läuft auf Windows, macOS und Linux und zeigt dir links deinen ganzen Projektordner an – das brauchst du, sobald mehrere Dateien dazukommen.

Ein anderer Editor tut es auch. Wichtig ist nur, dass er **Ordner** öffnen kann und nicht bloß einzelne Dateien.

:::alert{info}
Auf einem Tablet oder Chromebook, auf dem du nichts installieren darfst, gibt es Editoren im Browser – zum Beispiel [vscode.dev](https://vscode.dev). Sprich deine Lehrkraft an, welcher Weg an deiner Schule vorgesehen ist.
:::

## Die Vorschau

In VS Code installierst du dafür die Erweiterung **Live Preview** von Microsoft:

1. Links auf das Symbol mit den vier Quadraten klicken (*Extensions*).
2. Nach `Live Preview` suchen.
3. Auf *Install* klicken.

Danach: Rechtsklick auf `index.html` → **Show Preview**. Die Vorschau öffnet sich neben dem Quelltext und aktualisiert sich beim Speichern.

:::snippet{#merken}
**Öffne immer den Projektordner, nicht die einzelne Datei.**

Über *Datei → Ordner öffnen* wählst du deinen Projektordner aus. Nur dann findet der Editor deine anderen Dateien, schlägt Pfade beim Tippen vor und zeigt dir, wenn ein Link ins Leere geht.
:::

## So sieht dein Arbeitsplatz aus

```
┌──────────────┬───────────────────────┬──────────────────┐
│ Dateien      │ Quelltext             │ Vorschau         │
│              │                       │                  │
│ meine-seite/ │ <h1>Amsterdam</h1>    │  Amsterdam       │
│  index.html  │ <p>Eine Stadt aus     │                  │
│  stil.css    │    Wasser …</p>       │  Eine Stadt aus  │
│  bilder/     │                       │  Wasser …        │
│  orte/       │                       │                  │
└──────────────┴───────────────────────┴──────────────────┘
```

Links siehst du **alle** Dateien deines Projekts, in der Mitte arbeitest du, rechts siehst du das Ergebnis.

## Bevor es losgeht

:::snippet{#aufgabe}
a) Installiere den Editor und die Vorschau-Erweiterung.

b) Leg irgendwo einen Ordner `meine-seite` an – am besten dort, wo du ihn wiederfindest, nicht im Download-Ordner.

c) Öffne ihn über *Datei → Ordner öffnen*. Links sollte jetzt der Ordnername stehen.

d) Leg testweise eine Datei `index.html` an und schreib ein Wort hinein. Erscheint es in der Vorschau?

Wenn ja, kann es losgehen.
:::
