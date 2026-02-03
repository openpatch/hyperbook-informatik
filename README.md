# Hyperbook Informatik

Ein interaktives Hyperbook zum Lernen und Lehren von Informatik, entwickelt von [OpenPatch](https://openpatch.org).

## Über das Projekt

In diesem Hyperbook lernst du viele Themen der Informatik kennen. Die Inhalte sind nach Schulstufen gegliedert:

- **Unterstufe** (8-12 Jahre): Grundlagen der Informatik spielerisch erkunden
- **Mittelstufe** (12-16 Jahre): Vertiefung von Programmierung und algorithmischem Denken
- **Oberstufe** (16-19 Jahre): Fortgeschrittene Themen und Konzepte

Das Hyperbook verwendet interaktive Elemente, Web Components und moderne Lernmethoden, um Informatik anschaulich und praxisnah zu vermitteln.

## Nutzung

Das Hyperbook ist online verfügbar und kann direkt im Browser genutzt werden.

## Lokale Entwicklung

Um das Hyperbook lokal zu entwickeln und zu testen:

```bash
# Repository klonen
git clone https://github.com/openpatch/hyperbook-informatik.git
cd hyperbook-informatik

# Entwicklungsserver starten
npx hyperbook dev
```

**Alternative:** Installiere die [Hyperbook Extension für VS Code](https://marketplace.visualstudio.com/items?itemName=openpatch.hyperbook) für eine noch bessere Entwicklungserfahrung direkt in deinem Editor.

## Mitmachen

Wir freuen uns über jede Unterstützung! 

**Auf jeder Seite des Hyperbooks** findest du unten links ein Stiftsymbol (✏️), über das du direkt Korrekturen und Ergänzungen vorschlagen kannst.

Für ausführliche Informationen zum Mitmachen, zur Projektstruktur, zu Snippets und Web Components, siehe die [Mitmachen-Seite](book/mitmachen.md).

## Projektstruktur

```
├── book/              # Inhaltsdateien (Markdown)
│   ├── unterstufe/    # Inhalte für die Unterstufe
│   ├── mittelstufe/   # Inhalte für die Mittelstufe
│   └── oberstufe/     # Inhalte für die Oberstufe
├── glossary/          # Glossareinträge
├── public/            # Statische Dateien
│   ├── images/        # Bilder
│   └── wc/            # Web Components
├── snippets/          # Snippet-Templates
├── archives/          # Projektarchive (Java, etc.)
└── hyperbook.json     # Konfigurationsdatei
```

`public` sollte nur noch sporadisch genutzt werden. Zum Beispiel wenn die Datei auf mehreren Seiten verwendet wird. Am besten werden statische Dateien direkt neben der Markdown-Datei abgelegt, die diese verwendet.

## Lizenz

Dieses Projekt ist unter der **CC-BY-SA** (Creative Commons Attribution-ShareAlike) Lizenz veröffentlicht.

Das bedeutet:
- ✅ Du darfst die Inhalte teilen und bearbeiten
- ✅ Auch für kommerzielle Zwecke
- ⚠️ Du musst angemessene Urheber- und Rechteangaben machen
- ⚠️ Bearbeitungen müssen unter derselben Lizenz weitergegeben werden

Weitere Informationen findest du unter: https://creativecommons.org/licenses/by-sa/4.0/deed.de

## Kontakt

- **GitHub**: https://github.com/openpatch/hyperbook-informatik
- **Website**: https://openpatch.org
- **Issues**: Für Fehler und Verbesserungsvorschläge nutze bitte die [GitHub Issues](https://github.com/openpatch/hyperbook-informatik/issues)

## Danksagungen

Vielen Dank an alle Mitwirkenden, die zu diesem Projekt beitragen!

---

Made with ❤️ by [OpenPatch](https://openpatch.org)
