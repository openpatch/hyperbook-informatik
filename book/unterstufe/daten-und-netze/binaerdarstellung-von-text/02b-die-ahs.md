---
name: Die AHs - Entdecker
hide: true
scripts:
  - /wc/bit-rows.js
prev: ./02-die-ahs
next: ./03-die-menschen
---

# Die AHs - Entdecker 🚀

## 🌌 Willkommen auf dem Planeten der AHs!

Etwas näher an der Erde wohnen die AHs. Dieses Alien-Volk ist fortgeschrittener als die ABABs - sie kennen die Buchstaben von **A bis H** (das sind 8 verschiedene Buchstaben!).

Die Einwohner heißen z.B.:
- **FEBE** (die Königin)
- **CHABA**
- **DEBAHA**

Das hier ist Königin **FEBE**: 

![Eine AH mit dem Namen FEBE](./alien-1295484.svg){width="150px"}

## 🧠 Deine Forschungsaufgabe

Bei den ABABs war es einfach: 2 Buchstaben, 1 Bit. Aber jetzt hast du 8 Buchstaben! 

### 🤔 Denk nach:
- Wie viele verschiedene Möglichkeiten gibt es mit 1 Bit? (2: entweder 0 oder 1)
- Wie viele verschiedene Möglichkeiten gibt es mit 2 Bits? (4: 00, 01, 10, 11)
- Wie viele verschiedene Möglichkeiten gibt es mit 3 Bits? (?)

## 🎯 Aufgabe 1 - Entwickle deinen Code!

:::snippet{#aufgabe}
**Deine Herausforderung:** Entwickle eine **eigene Codierung** für die 8 Buchstaben A bis H!

**Wichtige Regeln für eine gute Codierung:**
1. ✅ Jeder Buchstabe braucht einen **eindeutigen** Code
2. ✅ Alle Codes sollten **gleich lang** sein (warum? Überleg mal!)
3. ✅ Du solltest **so wenige Bits wie möglich** verwenden

**Fragen zum Überlegen:**
- Wie viele Bits brauchst du **mindestens** für 8 verschiedene Buchstaben?
- Kannst du eine systematische Reihenfolge finden?
:::

**Entwickle hier deine Codierung:**

::textinput{placeholder="Schreibe deine vollständige Codierung für A bis H!" height="250px"}

:::collapsible{title="💡 Tipp: Mathematik hilft!"}
**Berechne die Möglichkeiten:**
- 1 Bit → $2^1 = 2 $ Möglichkeiten (zu wenig für 8 Buchstaben)
- 2 Bits → $2^2 = 2 \cdot 2 = 4 $ Möglichkeiten (zu wenig für 8 Buchstaben)
- 3 Bits → $2^3 = 2 \cdot 2 \cdot 2 = 8 $ Möglichkeiten (genau richtig! ✓)

Mit 3 Bits kannst du genau 8 verschiedene Kombinationen erstellen:
000, 001, 010, 011, 100, 101, 110, 111
:::

:::collapsible{title="🎓 Expertenwissen: Warum gleiche Länge?"}
**Das Eindeutigkeitsproblem:**

Stell dir vor, du codierst so:
- A = 0
- B = 1  
- C = 00
- D = 01

Wenn du den Code `001` siehst, was bedeutet er?
- 0 + 0 + 1 = **A A B** oder
- 00 + 1 = **C B** oder
- 0 + 01 = **A D**?

**Du siehst das Problem?** Deshalb: Alle Buchstaben sollten gleich viele Bits haben!
:::

## 🔬 Aufgabe 2 - Teste deine Codierung!

:::snippet{#aufgabe}
**Praxistest:** Codiere diese drei Namen mit deiner Codierung:

1. **FEBE** (die Königin)
2. **CHABA**
3. **DEBAHA**

Nutze das Werkzeug unten, um deine Codes einzugeben.
:::

**Dein Test-Werkzeug:**

<bit-rows id="binaercode-reihen-ahs"></bit-rows>

:::alert{success}
**Selbstcheck:** 
- ✓ Hat jeder Buchstabe die gleiche Anzahl an Bits?
- ✓ Kannst du die Codes wieder eindeutig zurücklesen?
- ✓ Verwendest du die minimale Anzahl an Bits?
:::

## 🎮 Aufgabe 3 - Peer-Challenge!

:::snippet{#aufgabe}
**Teamarbeit-Challenge:**

1. 🎨 Erfinde einen **eigenen AH-Namen** (z.B. GEHAB, BADGE, CHEF)
2. 🔐 Codiere ihn mit deiner Codierung
3. 🤝 Gib den Code einem Mitschüler
4. 🕵️ Kann dein Mitschüler ihn **eindeutig** decodieren?

**Falls nein:** Wo liegt das Problem? Überarbeite deine Codierung!
:::

**Dein Experimentier-Bereich:**

<bit-rows id="binaercode-reihen-ahs-2"></bit-rows>

:::collapsible{title="🏆 Extra-Challenge für Profis"}
**Zusatzaufgaben:**

1. **Effizienz-Frage:** Wie viele Bits braucht der Name **DEBAHA** mit deiner Codierung? Berechne es!

2. **Vergleich:** Die ABABs brauchen 1 Bit pro Buchstabe. Wie viele Bits pro Buchstabe brauchst du für die AHs?

3. **Zukunft:** Wenn die AHs plötzlich 16 Buchstaben (A-P) hätten, wie viele Bits bräuchtest du dann?

4. **Kreativ-Challenge:** Kannst du eine Codierung entwickeln, bei der die häufigsten Buchstaben (z.B. E und A) weniger Bits brauchen? (Achtung: Das wird kompliziert, aber es gibt solche Codes in der echten Welt!)
:::

## 📊 Reflexion

:::snippet{#aufgabe}
**Denk nach über deine Erfahrung:**

1. Welche Probleme sind dir beim Entwickeln der Codierung aufgefallen?
2. Warum ist es wichtig, dass alle Codes gleich lang sind?
3. Was würde passieren, wenn du nur 2 Bits pro Buchstabe nutzen würdest?
:::

::textinput{placeholder="Schreibe deine Überlegungen hier auf..." height="150px"}
