---
name: Das hast du hier gelernt
index: 6
permaid: daten-text-gelernt
next:
---

# Das hast du hier gelernt 🎓

## 🎉 Glückwunsch - Du bist jetzt ein Code-Experte!

Du hast eine spannende Reise durch die Welt der Binärdarstellung gemacht - von den Aliens bis zu deinem Smartphone! 

## 🧠 Dein Wissens-Check

:::snippet{#aufgabe}
**Fülle die Lücken aus!** Bringe die Buchstaben in die richtige Reihenfolge, um die wichtigsten Begriffe zu vervollständigen.

💡 **Tipp:** Falls du nicht weiterkommst, hilft dir der Hinweis am Ende!
:::

::::snippet{#merken}
:::multievent
- 📱 Texte in WhatsApp, SMS und auf deinem Computer müssen {L{binär codiert}} werden, um gespeichert und verarbeitet zu werden. Das bedeutet: Alles wird mit **0** und **1** dargestellt!

- 💾 Der {L{Speicherplatz}}, den ein Zeichen benötigt, hängt davon ab, wie viele verschiedene Zeichen man unterscheiden können möchte. Mehr Zeichen = mehr Bits!

- 🌐 Eine Zeichencodierung, die weltweit sehr häufig benutzt wird, ist {L{ASCII}}. ASCII codiert Zeichen mit 7 {L{Bits}}. Oft wird mit einer Null zu einem ganzen {L{Byte}} (= 8 Bits) aufgefüllt.

- 🌍 Es gibt weitere Zeichencodierungen wie **Unicode**, die es erlauben nahezu alle Zeichen der Erde zu speichern - inklusive Emojis! 😊
:::
::::

:::collapsible{title="💡 Hilfe: Gesuchte Wörter"}
Die gesuchten Wörter sind:
**binär codiert**, **Speicherplatz**, **ASCII**, **Bits**, **Byte**
:::

## 🎯 Das Wichtigste in Kürze

:::alert{success}
**Von 0 und 1 zu deiner WhatsApp-Nachricht:**

1. 🤖 Computer kennen nur **0** und **1** (Bits)
2. 🔢 Mit mehr Bits kann man mehr Zeichen darstellen (2^n)
3. 🔤 **ASCII** = Standard für einfache Texte (128 Zeichen)
4. 🌈 **Unicode** = Standard für die ganze Welt (über 140.000 Zeichen!)
5. 😊 Emojis sind auch nur Zahlen in Binärform!
:::

## 🚀 Quiz: Bist du fit?

::::multievent
:::snippet{#aufgabe}
**Teste dich selbst!** Wähle die richtige Antwort aus.
:::

**Frage 1:** Wie viele verschiedene Zeichen kannst du mit 4 Bits darstellen?

{r1{8 Zeichen}} 

{r1{12 Zeichen}} 

{r1{!16 Zeichen}} 

{r1{32 Zeichen}}

{h{Denk an die Formel: 2^n. Mit 4 Bits: 2^4 = ?}}
{H{Genau! 2^4 = 2×2×2×2 = 16 verschiedene Kombinationen!}}

---

**Frage 2:** Warum brauchen Emojis mehr Speicherplatz als normale ASCII-Buchstaben?

{R2{!Emojis nutzen Unicode mit 16 oder mehr Bits statt nur 8 Bits}}

{R2{Emojis sind bunter und deshalb größer}}

{R2{Emojis brauchen gar nicht mehr Platz}}

{R2{Nur animierte Emojis brauchen mehr Platz}}

{h{Überlege: ASCII nutzt 8 Bits pro Zeichen. Was nutzt Unicode?}}

{H{Richtig! Unicode braucht mindestens 16 Bits (2 Bytes) statt 8 Bits (1 Byte) für ASCII.}}

---

**Frage 3:** Welche Aussage über ASCII und Unicode ist richtig?

{r3{ASCII und Unicode sind das Gleiche}}

{r3{!ASCII hat 128 Zeichen, Unicode über 140.000 Zeichen}}

{r3{Unicode ist älter als ASCII}}

{r3{ASCII kann Emojis darstellen}}

{h{Denk an die Anzahl der Zeichen: Welcher Standard ist umfangreicher?}}

{H{Perfekt! ASCII = 128 Zeichen (7 Bits), Unicode = über 140.000 Zeichen für alle Sprachen + Emojis!}}

---

**Frage 4:** Warum ist es wichtig, dass alle Buchstaben gleich viele Bits haben?

{R4{Das ist eigentlich nicht wichtig}}

{R4{Damit der Speicherplatz besser genutzt wird}}

{R4{!Damit der Computer erkennen kann, wo ein Buchstabe endet}}

{R4{Damit die Codierung schneller geht}}

{h{Erinnere dich an Linas Codierung bei den AHs. Was war das Problem?}}

{H{Genau! Ohne gleiche Länge weiß der Computer nicht, ob "10010" für "CF" oder "ABBAB" steht!}}

---

**Frage 5:** Wie viele Bytes braucht das Wort "HALLO" in ASCII?

{a{!5 Bytes|4 Bytes|8 Bytes|10 Bytes}}

{h{Jeder Buchstabe = 1 Byte in ASCII. Wie viele Buchstaben hat HALLO?}}

{H{Richtig! 5 Buchstaben × 1 Byte = 5 Bytes (oder 40 Bits)!}}

:::::

## 💪 Das kannst du jetzt!

Nach diesem Kapitel kannst du:

- ✅ Verstehen, wie dein Handy Texte speichert
- ✅ Berechnen, wie viele Bits du für eine bestimmte Anzahl von Zeichen brauchst
- ✅ Eigene Codierungen entwickeln und testen
- ✅ Erklären, warum Emojis mehr Speicherplatz brauchen
- ✅ Den Unterschied zwischen ASCII und Unicode verstehen

## 🎮 Bonus-Challenge

::::multievent
:::snippet{#aufgabe}
**Möchtest du noch mehr üben?** Löse diese Profi-Aufgaben!
:::

**1. Rechne aus:** Wie groß ist eine WhatsApp-Nachricht mit 100 Zeichen in Bytes?

{z{100}} Bytes

{h{Tipp: In ASCII braucht 1 Zeichen = 1 Byte. Also 100 Zeichen = ?}}

{H{Perfekt! 100 Zeichen × 1 Byte = 100 Bytes!}}

---

**2. Emoji-Größe:** Ein einzelnes Emoji braucht etwa 4 Bytes. Wie viele normale ASCII-Buchstaben könnte man mit dem gleichen Speicherplatz speichern?

{z{4}} Buchstaben

{h{Ein Emoji = 4 Bytes. Ein ASCII-Zeichen = 1 Byte. Also: 4 Bytes = ? Zeichen}}
{H{Richtig! Mit 4 Bytes kann man entweder 1 Emoji ODER 4 normale Buchstaben speichern!}}

---

**3. Zukunft:** Wenn wir 1 Million verschiedene Zeichen/Emojis hätten, wie viele Bits bräuchten wir mindestens pro Zeichen?

{A{10 Bits|15 Bits|!20 Bits|25 Bits|30 Bits}}

{h{Rechne: 2^n ≥ 1.000.000. Probiere: 2^10 = 1024, 2^15 = 32.768, 2^20 = ?}}
{H{Super! 2^20 = 1.048.576, das reicht für 1 Million Zeichen! (2^19 = 524.288 wäre zu wenig)}}

---

**4. Geheimcode:** Welche dieser Aussagen über eigene Binär-Codes ist FALSCH?

{R4{Alle Zeichen sollten gleich viele Bits haben}}

{R4{Mehr verschiedene Zeichen brauchen mehr Bits}}

{R4{!Jeder Code sollte unterschiedlich viele Bits haben}}

{R4{Der Code muss eindeutig decodierbar sein}}

{h{Denk an Linas Problem: Was war das Hauptproblem ihrer Codierung?}}
{H{Genau erkannt! Unterschiedlich viele Bits führen zu Mehrdeutigkeit - das ist FALSCH!}}

:::::

## 🌟 Ausblick: Was kommt als Nächstes?

Jetzt verstehst du, wie Computer **Text** speichern. Aber wie funktioniert das mit:
- 🖼️ **Bildern** (jedes Pixel ist auch eine Zahl!)
- 🎵 **Musik** (Schallwellen als Zahlen)
- 🎬 **Videos** (bewegte Bilder)

Das und vieles mehr lernst du in den nächsten Kapiteln! 🚀
