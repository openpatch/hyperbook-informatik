---
title: Rückblick
index: 5
permaid: rechner-software-rueckblick
---

# Rückblick

Du hast den Weg vom Bitmuster im Prozessor bis zur Kaufentscheidung verfolgt. Damit kannst du die Leitfrage dieses Lernpfads beantworten: *Wie sieht es in meinem Computer aus, und was ist der Unterschied zwischen Hardware und Software?*

## Das kann ich jetzt

- [ ] Ich kann das Schichtenmodell aus Hardware, Betriebssystem und Anwendungen erklären. ([4.1](./01-schichtenmodell))
- [ ] Ich kann beschreiben, was beim Einschalten eines Computers passiert. ([4.1](./01-schichtenmodell))
- [ ] Ich kann den Befehlszyklus aus Holen, Dekodieren und Ausführen beschreiben. ([4.2](./02-prozessor))
- [ ] Ich kann erklären, warum Befehle und Daten im selben Speicher stehen können. ([4.2](./02-prozessor))
- [ ] Ich kann Lizenzmodelle unterscheiden und ihre Folgen einschätzen. ([4.3](./03-software-und-lizenzen))
- [ ] Ich kann einen Computer nach Anforderungen auswählen und die Wahl begründen. ([Mini-Projekt](./04-kaufberatung))

## Gemischte Aufgaben

:::snippet{#aufgabe}
Erkläre, was in einem Computer passiert, wenn du in einem Taschenrechner-Programm `5 + 3` eintippst und `=` drückst. Gehe durch **alle Ebenen** dieses Lernpfads:

1. EVA-Prinzip und beteiligte Bauteile
2. Schichten: Anwendung, Betriebssystem, Hardware
3. Wie sehen die Zahlen im Prozessor aus?
4. Welche Schaltung berechnet das Ergebnis?
:::

::textinput{id="rechner-rb4-gesamt" placeholder="1. … 2. … 3. … 4. …" height="200px"}

::::collapsible{title="Tipp"}

Geh die Kapitel nacheinander durch: Kapitel 1 liefert Eingabe, Verarbeitung und Ausgabe, Kapitel 4 die Schichten, Kapitel 2 die Binärzahlen, Kapitel 3 das Addierwerk.

::::

:::protect{password="rechner-4-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. **Eingabe** über Tastatur oder Maus, **Verarbeitung** im Prozessor mit Daten aus dem Arbeitsspeicher, **Ausgabe** über Grafikkarte und Bildschirm.
2. Die Tastatur meldet die Tasten über ihren **Treiber** an das **Betriebssystem**. Das gibt sie an die **Anwendung** (Taschenrechner) weiter. Die Anwendung lässt den Prozessor rechnen und bittet das Betriebssystem, das Ergebnis anzuzeigen.
3. Die Zahlen liegen als Bitmuster vor: 5 = 0101₍₂₎, 3 = 0011₍₂₎.
4. Das **Addierwerk** im Rechenwerk – hintereinandergeschaltete Volladdierer aus XOR-, UND- und ODER-Gattern – berechnet 0101 + 0011 = 1000₍₂₎ = 8.

:::

:::snippet{#aufgabe}
Ein Freund will seinen fünf Jahre alten Laptop ersetzen, „weil er so langsam geworden ist“. Er hat 4 GB Arbeitsspeicher und eine Festplatte (HDD).

Gib ihm einen begründeten Rat: Muss es ein neuer Laptop sein? Denk an Hardware, Software und Kosten.
:::

::textinput{id="rechner-rb4-rat" placeholder="Ich rate dir … , weil …" height="120px"}

:::protect{password="rechner-4-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Wahrscheinlich nicht. 4 GB Arbeitsspeicher sind für heutige Programme zu wenig: Der Computer muss ständig auf den Massenspeicher auslagern – und eine HDD ist dafür sehr langsam. Wenn sich der Laptop aufrüsten lässt, bringen **mehr Arbeitsspeicher** (8 oder 16 GB) und eine **SSD statt der HDD** für zusammen oft unter 100 € einen großen Geschwindigkeitsgewinn. Zusätzlich hilft es, unnötige Programme zu entfernen, die beim Start mitlaufen. Ein neuer Laptop lohnt sich erst, wenn sich nichts aufrüsten lässt oder der Prozessor selbst zu schwach ist.

:::

---

## Selbsttest

::::multievent

**1. Ordne zu.**

Browser: {S1{Anwendung}}

Linux: {S1{Betriebssystem}}

Arbeitsspeicher: {S1{Hardware}}

{H{Richtig.}}

**2. Was passiert in der Phase „Holen“?**
{r2{!Der Befehl, auf den der Befehlszähler zeigt, kommt ins Befehlsregister.}}
{r2{Das Rechenwerk addiert zwei Zahlen.}}
{H{Richtig.}}

**3. Welche Software läuft schon, bevor das Betriebssystem geladen ist?**
{r3{!die Firmware auf der Hauptplatine}}
{r3{der Browser}}
{H{Richtig.}}

**4. Welche Lizenz erlaubt es, den Quelltext zu verändern und weiterzugeben?**
{r4{!Open Source}}
{r4{Freeware}}
{r4{Abonnement}}
{H{Richtig.}}

**5. Ein Computer wird langsam, sobald viele Programme offen sind. Was hilft am ehesten?**
{r5{!mehr Arbeitsspeicher}}
{r5{ein größerer Bildschirm}}
{r5{eine größere Festplatte}}
{H{Richtig.}}

::::
