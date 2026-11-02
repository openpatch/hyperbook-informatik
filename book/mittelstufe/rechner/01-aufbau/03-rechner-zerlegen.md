---
title: Einen Computer zerlegen
index: 3
permaid: rechner-zerlegen
---

# Einen Computer zerlegen

Bilder von Bauteilen kennst du jetzt. Aber wie schwer ist ein Kühlkörper, wie fühlt sich ein Speicherriegel an, und wo genau steckt der Prozessor? Das findest du nur heraus, wenn du einen echten Computer öffnest.

:::alert{warn}
**Sicherheitsregeln – vor dem ersten Handgriff lesen**

1. Der Computer ist **vom Strom getrennt**. Kein Kabel steckt in der Steckdose.
2. Das **Netzteil wird nie geöffnet**. Darin können auch nach dem Ausstecken gefährliche Spannungen gespeichert sein.
3. **Entlade dich**, bevor du Bauteile berührst: Fasse kurz das blanke Metall des Gehäuses an. Statische Aufladung kann Chips zerstören.
4. Fasse Platinen und Speicherriegel **nur an den Kanten** an, nie an den goldenen Kontakten.
5. Jede Schraube kommt in die **Schale** deiner Gruppe. Was du ausbaust, legst du in der Reihenfolge ab, in der du es ausgebaut hast.
6. Klemmt etwas, **frag nach**, statt Kraft anzuwenden.
:::

## Der Auftrag

:::snippet{#aufgabe}
Arbeitet zu dritt oder zu viert. Verteilt die Rollen: **Schrauber/in** (baut aus), **Protokollant/in** (schreibt auf), **Fotograf/in** (fotografiert jeden Schritt), bei vier Personen zusätzlich **Recherche** (sucht Bezeichnungen im Internet).

1. Öffnet das Gehäuse. Fotografiert das Innere, **bevor** ihr etwas ausbaut.
2. Findet die Bauteile aus der Tabelle unten. Tragt jeweils ein, wo sie sitzen und was auf ihnen steht.
3. Baut – soweit eure Lehrkraft es erlaubt – Arbeitsspeicher, Massenspeicher und Lüfter aus und legt sie auf den Tisch.
4. Verfolgt ein Kabel vom Netzteil: Welche Bauteile versorgt es?
5. Baut alles wieder ein. Der Rechner soll so aussehen wie vorher.
:::

## Steckbrief eures Rechners

:::snippet{#aufgabe}
Fülle den Steckbrief aus. Die Bezeichnungen stehen meist als Aufdruck oder auf einem Aufkleber auf dem Bauteil. Unbekannte Bezeichnungen darf die Recherche-Person nachschlagen.
:::

Trage für jedes Bauteil ein: **Wo sitzt es? · Was steht darauf? · Was fällt euch auf?**

**Prozessor** (unter dem Kühlkörper)

::textinput{id="rechner-sb-cpu" placeholder="Ort: … · Aufdruck: … · Auffällig: …" height="70px"}

**Arbeitsspeicher**

::textinput{id="rechner-sb-ram" placeholder="Ort: … · Aufdruck: … · Auffällig: …" height="70px"}

**Massenspeicher** (SSD oder Festplatte)

::textinput{id="rechner-sb-ssd" placeholder="Ort: … · Aufdruck: … · Auffällig: …" height="70px"}

**Hauptplatine**

::textinput{id="rechner-sb-mainboard" placeholder="Ort: … · Aufdruck: … · Auffällig: …" height="70px"}

**Netzteil**

::textinput{id="rechner-sb-netzteil" placeholder="Ort: … · Aufdruck: … · Auffällig: …" height="70px"}

**Anschlüsse** außen am Gehäuse

::textinput{id="rechner-sb-anschluesse" placeholder="USB: … · Bildschirm: … · Netzwerk: … · Ton: …" height="70px"}

::::collapsible{title="Tipp 1: Wo ist der Prozessor?"}

Der Prozessor sitzt auf der Hauptplatine unter dem größten Kühlkörper, meist mit einem Lüfter darauf. Den Kühlkörper baut ihr **nicht** ab – zwischen ihm und dem Prozessor sitzt Wärmeleitpaste.

::::

::::collapsible{title="Tipp 2: Was bedeuten die Zahlen auf dem Speicherriegel?"}

Auf dem Aufkleber steht meist die Größe (zum Beispiel `8GB`) und die Bauart (zum Beispiel `DDR4`). Die Größe sagt, wie viele Daten gleichzeitig bereitgehalten werden können.

::::

## Der Weg der Daten

Ihr habt die Bauteile in der Hand gehabt. Jetzt verbindet ihr sie mit dem EVA-Prinzip.

:::snippet{#aufgabe}
Du öffnest auf diesem Rechner ein Foto und drehst es um 90°. Beschreibe den Weg der Daten durch die Bauteile – vom Doppelklick bis zum gedrehten Bild auf dem Bildschirm. Verwende mindestens: Maus, Massenspeicher, Arbeitsspeicher, Prozessor, Grafikkarte, Bildschirm.
:::

::textinput{id="rechner-weg-der-daten" placeholder="1. Die Maus meldet den Doppelklick … 2. …" height="200px"}

::::collapsible{title="Tipp: Wo liegt das Foto vor dem Doppelklick?"}

Das Foto liegt dauerhaft auf dem Massenspeicher. Der Prozessor kann aber nur mit Daten arbeiten, die im Arbeitsspeicher liegen.

::::

:::protect{password="rechner-1-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. Die **Maus** meldet den Doppelklick (Eingabe).
2. Das Bildprogramm und das Foto werden vom **Massenspeicher** in den **Arbeitsspeicher** geladen.
3. Der **Prozessor** liest die Bilddaten aus dem Arbeitsspeicher, berechnet das gedrehte Bild und schreibt es zurück (Verarbeitung).
4. Die **Grafikkarte** erzeugt daraus das Bildschirmbild, der **Bildschirm** zeigt es an (Ausgabe).
5. Erst beim Speichern wandert das gedrehte Foto zurück auf den **Massenspeicher**.

Alle Daten laufen dabei über die Leitungen der **Hauptplatine**.

:::

<!-- SILP: Rechnermodelle aus dem Sammlungsraum zerlegen und analysieren (verbindliche Absprache). -->

---

## Selbsttest

::::multievent

**1. Warum fasst du vor der Arbeit das Metallgehäuse an?**
{r1{!um dich zu entladen, damit keine statische Aufladung Chips beschädigt}}
{r1{um zu prüfen, ob der Rechner warm ist}}
{H{Richtig.}}

**2. Welches Bauteil wird nie geöffnet?**
{r2{!das Netzteil}}
{r2{das Gehäuse}}
{r2{der Lüfter}}
{H{Richtig. Darin können gefährliche Spannungen gespeichert sein.}}

**3. Wo liegt ein Foto, bevor du es öffnest?**
{r3{!auf dem Massenspeicher}}
{r3{im Arbeitsspeicher}}
{r3{im Prozessor}}
{H{Richtig.}}

**4. Bringe den Weg der Daten beim Öffnen eines Fotos in die richtige Reihenfolge.**

{S4{Massenspeicher}}

{S4{Arbeitsspeicher}}

{S4{Prozessor}}

{S4{Grafikkarte}}

{S4{Bildschirm}}

{H{Richtig.}}
{h{Der Prozessor kann nur mit Daten aus dem Arbeitsspeicher arbeiten.}}

**5. Welches Bauteil verbindet alle anderen?**
{r5{!die Hauptplatine}}
{r5{das Netzteil}}
{H{Richtig.}}

::::
