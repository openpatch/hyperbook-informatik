---
name: Noch mehr Zeichen
index: 5
scripts:
  - /wc/binary-to-ascii.js
---

# Noch mehr Zeichen 🌍✨

## 🤔 ASCII ist super, aber...

ASCII kann 128 Zeichen - das reicht für englische Texte. Aber was ist mit:
- 🇩🇪 Deutschen Umlauten: **ä, ö, ü, ß**
- 🇫🇷 Französischen Akzenten: **é, è, à, ç**  
- 🇨🇳 Chinesischen Schriftzeichen: **你好** ("Hallo")
- 🇯🇵 Japanischen Zeichen: **こんにちは**
- 😊 **Emojis:** 😍🎮🚀⚡🎨 

**Das Problem:** 128 Zeichen sind viel zu wenig für die ganze Welt! 🌎

## 🌟 Die Lösung: Unicode!

**Unicode** ist wie eine riesige Tabelle mit **über 140.000 Zeichen** aus allen Sprachen und Kulturen der Welt!

:::alert{info}
**Unicode-Facts:**
- 📚 Enthält über 140.000 verschiedene Zeichen
- 🌍 Sprachen aus der ganzen Welt  
- 😊 Alle deine Lieblings-Emojis
- 🎵 Musiknoten, Symbole, alte Schriften und vieles mehr!
:::

**Wie funktioniert's?** Statt 8 Bits (1 Byte) nutzt Unicode oft **16 Bits (2 Bytes)** oder sogar mehr pro Zeichen.

**Rechne mit:** 2¹⁶ = 65.536 verschiedene Zeichen! 🤯 

## 🎮 Aufgabe 1 - Die Emoji-Challenge!

:::snippet{#aufgabe}
**Entdecke die Welt der Unicode-Zeichen!** Probiere verschiedene Zeichen aus:

**Level 1 - Deutsche Umlaute:** 🇩🇪
- ä, ö, ü, ß

**Level 2 - Andere Sprachen:** 🌍  
- Französisch: é, è, à, ç
- Spanisch: ñ, í, ó

**Level 3 - Asiatische Schriften:** 🏮
- Chinesisch: 你 (du), 好 (gut)
- Japanisch: あ, い, う

**Level 4 - Symbole & Emojis:** ✨
- Herz: ♥
- Stern: ★  
- Musik: ♫

**Profi-Level - Deine Lieblings-Emojis:** 🎯
- Probiere verschiedene Codes aus und entdecke neue Zeichen!
:::

:::collapsible{title="💡 Code-Spickzettel"}
**Hier sind einige Unicode-Codes zum Ausprobieren:**

| Zeichen | Binärcode          | Kategorie     |
|---------|-------------------|--------------|
| ä       | 00000000 11100100 | Deutsch      |
| ö       | 00000000 11110110 | Deutsch      |
| ü       | 00000000 11111100 | Deutsch      |
| é       | 00000000 11101001 | Französisch  |
| è       | 00000000 11101000 | Französisch  |
| à       | 00000000 11100000 | Französisch  |
| 你      | 01001111 01100000 | Chinesisch   |
| 好      | 01011001 01111101 | Chinesisch   |
| ♥       | 00100110 01100101 | Symbol       |
| ★       | 00100110 00000101 | Symbol       |
:::

**Dein Unicode-Spielplatz:**

<binary-to-ascii id="binaercode-reihen-noch-mehr-zeichen" mode="unicode"></binary-to-ascii>

:::alert{success}
**🎉 Wow! Jetzt verstehst du, wie...**
- 📱 WhatsApp deine Emojis speichert
- 🌍 Computer Texte in allen Sprachen darstellen können  
- 💾 Zeichen unterschiedlich viel Speicherplatz brauchen
- 🔢 Aus 0 und 1 alle Zeichen der Welt werden!
:::

:::collapsible{title="📊 Speicherplatz-Vergleich"}
**Wie viel Platz braucht eine Nachricht?**

**"Hi!" (ASCII):**
- H = 8 Bits
- i = 8 Bits  
- ! = 8 Bits
- **Gesamt:** 24 Bits = 3 Bytes

**"Hä?" (Unicode mit Umlaut):**
- H = 8 Bits
- ä = 16 Bits (wegen Unicode!)  
- ? = 8 Bits
- **Gesamt:** 32 Bits = 4 Bytes

**"Hi 😊" (mit Emoji):**
- H = 8 Bits
- i = 8 Bits
- Leerzeichen = 8 Bits
- 😊 = 32 Bits (Emojis brauchen noch mehr Platz!)  
- **Gesamt:** 56 Bits = 7 Bytes
:::
