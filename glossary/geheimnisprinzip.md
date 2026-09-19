---
name: Geheimnisprinzip
lang: de
---

# Geheimnisprinzip

Das **Geheimnisprinzip** (englisch *information hiding*, im Buch auch **Datenkapselung**, englisch *encapsulation*) besagt: Ein :t[Objekt]{#objekt} verbirgt seine :t[Attribute]{#attribut} nach außen. Zugriff gibt es nur über :t[Methoden]{#methode}, die das Objekt selbst anbietet.

Umgesetzt wird es mit :t[Zugriffsmodifikatoren]{#zugriffsmodifikator}: Attribute werden `private`, die Methoden, die andere benutzen sollen, `public`.

```java
public class Klassenarbeit {
    private int punkte;

    public void setzePunkte(int pPunkte) {
        if (pPunkte >= 0 && pPunkte <= 100) {
            this.punkte = pPunkte;
        }
    }
}
```

Der Gewinn: Das Objekt kann jede Änderung an seinen Daten prüfen und sicherstellen, dass es niemals in einen unsinnigen Zustand gerät. Außerdem bleibt die interne Speicherung austauschbar, solange die Methoden gleich bleiben.

:::alert{info}
`private` gilt auch gegenüber Unterklassen: Es heißt „nur innerhalb **dieser** Klasse".
:::
