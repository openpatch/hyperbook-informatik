---
name: "Containerterminal: Szenarien"
index: 10
lang: de
permaid: java-stapel-containerterminal-szenarien
hide: true
scripts:
  - /wc/oop-containerterminal.js
---

# Containerterminal: Szenarien

Führt euer Struktogramm `hole(pNummer)` **wörtlich** für jeden Lkw aus. Was kostet der ganze Auftrag?

| Kranbewegung | Preis |
| --- | --- |
| auf den Lkw **verladen** | 20 Euro |
| auf einen anderen Stapel **umsetzen** | 50 Euro |
| auf die **Freifläche** oder von dort zurück | 80 Euro |

## Szenario 1: Der erste Tag

<oop-containerterminal id="containerterminal-szenario-1" stapel="0815,4711,2001 | 1234,3003 | 5005" auftrag="4711,1234,0815" hoehe="4" bestwert="160"></oop-containerterminal>

## Szenario 2: Der zweite Tag

<oop-containerterminal id="containerterminal-szenario-2" stapel="6001,6002,6003 | 6004,6005 | 6006,6007,6008,6009" auftrag="6002,6004,6008,6001" hoehe="4" bestwert="290"></oop-containerterminal>

## Szenario 3: Grenzfälle

Container 9999 steht nicht im Terminal.

<oop-containerterminal id="containerterminal-szenario-3" stapel="0815,4711,2001 | 1234,3003,3004,3005 | 5005,5006,5007,5008" auftrag="4711,0815,9999" hoehe="4" bestwert="120"></oop-containerterminal>

<!-- Versteckte Seite (hide: true) zur Präsentation am Beamer: Sicherung I der Übungsstunde
     Q1 GK G2 am 20.11.2026 (informatik/book/q/lineare-datenstrukturen/06-stapel-uebungsstunde).
     Szenarien wie auf den Folien. Erwartete Kosten (A nach Tipp 3, B nach Tipp 3 mit s % 3 + 1):
       Szenario 1: A 540 €, B 210 €, Bestwert 160 €
       Szenario 2: A 720 €, B 430 €, Bestwert 290 €
       Szenario 3: A 360 €, B 120 €, Bestwert 120 € (mit guenstigsteKosten aus oop-containerterminal.js berechnet)
     Eigene ids, damit die Ergebnisse nicht mit denen der Lernenden auf containerterminal.md vermischt werden. -->
