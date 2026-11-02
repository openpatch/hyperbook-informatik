---
title: Hardware und Software
index: 2
permaid: rechner-hardware-software
scripts:
  - /wc/card-matching.js
---

# Hardware und Software

Ein neuer Laptop ohne Programme ist ein teurer Briefbeschwerer. Ein Programm ohne Computer ist nur eine Datei, die niemand ausführt. Erst beides zusammen ergibt ein nützliches Gerät.

## Was man anfassen kann – und was nicht

:::snippet{#merken}
- :t[Hardware]{#hardware} sind alle **Geräte und Bauteile** eines Computers, die man anfassen kann: Prozessor, Speicher, Tastatur, Bildschirm, Kabel.
- :t[Software]{#software} sind die **Programme und Daten**, die auf der Hardware gespeichert sind und ausgeführt werden: Betriebssystem, Browser, Spiele, Apps.

Faustregel: *Hardware ist, was man treten kann. Software ist, worüber man nur fluchen kann.*
:::

:::snippet{#aufgabe}
**Sage voraus:** Ist das Hardware oder Software? Entscheide für jeden Begriff, bevor du den Selbsttest unten bearbeitest.

Grafikkarte · Betriebssystem · USB-Stick · Foto auf dem USB-Stick · Druckertreiber · Webcam · Browser · Arbeitsspeicher
:::

## Die wichtigsten Bauteile

Im Inneren eines Computers sitzen immer dieselben Hauptbauteile. Ihre Namen klingen fremd, ihre Aufgaben kennst du schon – aus dem EVA-Prinzip.

| Bauteil | Aufgabe | EVA |
| --- | --- | --- |
| **Prozessor** (CPU) | führt die Befehle der Programme aus, rechnet und vergleicht | Verarbeitung |
| **Arbeitsspeicher** (RAM) | hält Programme und Daten bereit, mit denen gerade gearbeitet wird – vergisst alles beim Ausschalten | Speicherung (kurz) |
| **Massenspeicher** (SSD, Festplatte) | bewahrt Programme und Dateien dauerhaft auf | Speicherung (dauerhaft) |
| **Hauptplatine** (Mainboard) | verbindet alle Bauteile miteinander | – |
| **Grafikkarte** | berechnet das Bild für den Bildschirm | Verarbeitung und Ausgabe |
| **Netzteil** | wandelt die Netzspannung in die Spannungen für die Bauteile um | – |
| **Lüfter und Kühlkörper** | führen die Wärme ab | – |

:::snippet{#aufgabe}
Verbinde jedes Bauteil mit seiner Aufgabe.
:::

<card-matching
  id="rechner-bauteile-zuordnen"
  pairs='[
    {"blue": "text:Prozessor", "orange": "text:führt Befehle aus und rechnet"},
    {"blue": "text:Arbeitsspeicher", "orange": "text:hält Daten bereit, mit denen gerade gearbeitet wird"},
    {"blue": "text:SSD", "orange": "text:bewahrt Dateien dauerhaft auf"},
    {"blue": "text:Hauptplatine", "orange": "text:verbindet alle Bauteile"},
    {"blue": "text:Netzteil", "orange": "text:versorgt alle Bauteile mit Strom"}
  ]'>
</card-matching>

:::snippet{#beispiel}
**Ein Vergleich aus der Küche:** Der Prozessor ist der Koch. Der Arbeitsspeicher ist die Arbeitsfläche: Was dort liegt, ist schnell griffbereit, aber nach Feierabend wird abgeräumt. Der Massenspeicher ist der Vorratsschrank: Dort bleibt alles liegen, der Weg dorthin dauert aber länger.
:::

:::snippet{#aufgabe}
Erkläre mit dem Küchenvergleich, warum ein Computer mit **wenig Arbeitsspeicher** langsam wird, wenn viele Programme gleichzeitig geöffnet sind.
:::

::textinput{id="rechner-hw-kueche" placeholder="Wenn die Arbeitsfläche zu klein ist, …" height="100px"}

::::collapsible{title="Tipp: Was muss der Koch tun, wenn die Arbeitsfläche voll ist?"}

Er muss Zutaten zurück in den Vorratsschrank bringen und andere holen – und das dauert.

::::

:::protect{password="rechner-1-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Ist der Arbeitsspeicher voll, muss der Computer Daten, die gerade nicht gebraucht werden, auf den viel langsameren Massenspeicher auslagern und später wieder zurückholen. Wie der Koch, der ständig zum Vorratsschrank laufen muss, verbringt der Computer dann viel Zeit mit Umräumen statt mit Rechnen.

:::

---

## Selbsttest

::::multievent

**1. Ordne zu.**

Grafikkarte: {S1{Hardware}}

Betriebssystem: {S1{Software}}

Foto auf dem USB-Stick: {S1{Software}}

Webcam: {S1{Hardware}}

{H{Richtig. Auch Daten wie ein Foto zählen zur Software.}}
{h{Kann man es anfassen? Dann ist es Hardware.}}

**2. Welches Bauteil vergisst seinen Inhalt beim Ausschalten?**
{r2{!Arbeitsspeicher}}
{r2{SSD}}
{r2{Festplatte}}
{H{Richtig.}}

**3. Welches Bauteil führt die Befehle eines Programms aus?**
{r3{!Prozessor}}
{r3{Netzteil}}
{r3{Hauptplatine}}
{H{Richtig.}}

**4. Ein Druckertreiber ist …**
{r4{!Software, die dem Betriebssystem erklärt, wie es mit dem Drucker spricht}}
{r4{ein Kabel zwischen Computer und Drucker}}
{H{Richtig.}}

**5. Welche Aussage stimmt?**
{r5{!Hardware ohne Software ist nutzlos, Software ohne Hardware kann nicht laufen.}}
{r5{Software ist ein Teil der Hauptplatine.}}
{H{Richtig.}}

::::
