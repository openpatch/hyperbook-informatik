---
name: 🖊 Erste Modellierung von Klassen
index: 2
lang: de
---

# Erste Modellierung Klassen

Um die [Spielidee](/projekte/bunny-hop/die-spielidee) umsetzen zu können, müssen zuerst alle :t[Objekte]{#objekt} und deren :t[Attribute]{#attribut} (Eigenschaften) und :t[Methoden]{#methode} (Fähigkeiten) identifiziert und entsprechende :t[Klassen]{#klasse} in einem :t[UML-Klassendiagramm]{#klassendiagramm} modelliert werden.

Das Team hat schon begonnen :t[Klassen]{#klasse} zu modellieren.

```mermaid
classDiagram

    class Spiel {

    }

    class Spieler{
      String bildGehen1
      String bildGehen2
      int x
      int y
      ...
    }
    class StachelFeind{

    }
    class FluegelFeind {

    }
    class ProppelerFeind {

    }
    class SteinFeind {

    }
    class Plattform{

    }
```

## 🖊 Aufgaben

1. Vervollständigt das :t[Klassendiagramm]{#klassendiagramm}. Nutzt dazu die Vorlage im [Mermaid-Editor](https://mermaid.live/edit#pako:eNp9kU1vgzAMhv9K5DNCo51Ym_PUXidxq3LxiAvR8oFCkEoR_32BtqiaWH167fdx7CQDlE4ScCg1tu2nwsqjEVZYFmOusaJRpNlwK01xU-MKRX7BiuCVrdi30vJINdnsP2PzMJQN7PKc9OyRpWm6DH0aGbCsSR9IWbnMXeEOuqPqzk33WEG-vGuaaf9XUBGi-fIUjSGcnTd_t4EEDHmDSsaXnk0BoSZDAniUEv2PAGEnDrvgit6WwIPvKIGukRjo_jHAz6jbWG3QAh_gAjzPE-iBZ-95ut-95Ztsu_3Y7aMYE7g6F1uyGT_Nem4ffwEYd5ly).
2. Identifiziert Gemeinsamkeiten der Klassen. Schreibt die Gemeinsamkeiten auf.
3. 🚀: Lest den Glossareintrag zur :t[Vererbung]{#vererbung} und überlegt euch, inwiefern das Konzept der :t[Vererbung]{#vererbung} hier angewendet werden kann.
