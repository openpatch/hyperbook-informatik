---
name: Überladen
lang: de
---

# Überladen

Beim **Überladen** (englisch *overloading*) gibt es mehrere :t[Methoden]{#methode} mit **demselben Namen**, aber **verschiedenen Parameterlisten**. Anhand der übergebenen Argumente entscheidet Java bereits beim Übersetzen, welche gemeint ist.

```java
void veraendere(int pZahl) { /* ... */ }
void veraendere(int[] pFeld) { /* ... */ }
void veraendere(int pZahl, int pFaktor) { /* ... */ }
```

- Unterschiedlich sein müssen **Anzahl oder Typen** der Parameter. Ein anderer Rückgabetyp allein genügt **nicht**.
- Auch :t[Konstruktoren]{#konstruktor} lassen sich überladen – daher die Klassen mit mehreren `public Punkt(...)`.

| | Überladen | :t[Überschreiben]{#ueberschreiben} |
| --- | --- | --- |
| Name | gleich | gleich |
| Parameterliste | verschieden | gleich |
| Wo? | in derselben Klasse | in einer Unterklasse |
| Entschieden wird | beim Übersetzen | zur Laufzeit |
