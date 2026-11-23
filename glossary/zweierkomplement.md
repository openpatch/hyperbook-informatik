---
name: Zweierkomplement
lang: de
---

# Zweierkomplement

Das Zweierkomplement ist die gängige Art, negative ganze Zahlen im Computer zu speichern. In einem n-Bit-Register wird −x als 2ⁿ − x dargestellt. Zu bilden ist es in drei Schritten: +x binär aufschreiben, alle Bits umdrehen, 1 addieren. Beispiel (8 Bit): −5 = 11111011₍₂₎. Das höchste Bit zeigt das Vorzeichen an: Beginnt die Zahl mit 1, ist sie negativ. Vorteile: Es gibt nur eine Null, und Subtrahieren geht durch Addieren – der Überlauf aus der höchsten Stelle fällt aus dem Register. Mit n Bit lässt sich der Bereich von −2ⁿ⁻¹ bis +2ⁿ⁻¹ − 1 darstellen (8 Bit: −128 bis +127).
