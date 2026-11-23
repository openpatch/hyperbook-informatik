---
name: Bitshift
lang: de
---

# Bitshift

Der Bitshift (Bitverschiebung, englisch *to shift* = schieben) ist eine Rechenoperation, bei der alle Bits einer Binärzahl um eine oder mehrere Stellen verschoben werden. Beim **Linksshift** `x << k` rücken die Bits nach links (rechts kommen Nullen dazu): der Wert multipliziert sich mit 2ᵏ – ein Bit, das links aus dem Register fällt, geht als Übertrag verloren. Beim **Rechtsshift** `x >> k` rücken die Bits nach rechts (links kommen Nullen dazu): der Wert wird durch 2ᵏ geteilt, der Rest wird abgeschnitten. Prozessoren können Verschieben sehr schnell – deshalb setzen sie beim Multiplizieren auf Verschieben und Addieren.
