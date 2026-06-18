---
title: Externe Bibliotheken
index: 17
---

# Externe Bibliotheken

OpenSCAD bietet die Möglichkeit, externe Bibliotheken zu verwenden, um zusätzliche Funktionen und Module in deinen Projekten zu nutzen. Diese Bibliotheken können von der OpenSCAD-Community erstellt und geteilt werden und bieten eine Vielzahl von vorgefertigten Modulen für verschiedene Anwendungen.

## Beispiel: Verwendung der BOSL2-Bibliothek

Die BOSL2-Bibliothek (The Belfry OpenSCAD Library) ist eine umfangreiche Sammlung von Modulen, die von der OpenSCAD-Community entwickelt wurden. Sie bietet unter anderem fertige Module für Gewinde, abgerundete Formen, Zahnräder und vieles mehr.

### Installation (lokal)

1. Lade die Bibliothek von GitHub herunter: [https://github.com/BelfrySCAD/BOSL2](https://github.com/BelfrySCAD/BOSL2)
2. Entpacke den Ordner und lege ihn in dein OpenSCAD-Bibliotheksverzeichnis (unter Windows z. B. `Dokumente/OpenSCAD/libraries/`).
3. Starte OpenSCAD neu.

### Verwendung

Sobald die Bibliothek installiert ist, kannst du sie in deinem Quelltext einbinden:

```scad
include <BOSL2/std.scad>

// Beispiel: Eine abgerundete Box
cuboid([30, 20, 10], rounding=3);
```

:::alert{info}
In der browserbasieren Version von OpenSCAD können externe Bibliotheken nicht verwendet werden. Für die Arbeit mit Bibliotheken benötigst du die lokal installierte Version.
:::

## Weitere Bibliotheken

Eine Übersicht über verfügbare Bibliotheken findest du in der OpenSCAD-Dokumentation:

https://openscad.org/libraries.html