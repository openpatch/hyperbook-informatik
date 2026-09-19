---
name: Rekursion
lang: de
---

# Rekursion

Bei der **Rekursion** (englisch *recursion*) ruft sich eine :t[Methode]{#methode} selbst auf. Jeder rekursive Algorithmus braucht zwei Teile:

- den **Basisfall** (englisch *base case*), in dem ohne weiteren Aufruf ein Ergebnis feststeht, und
- den **Rekursionsschritt** (englisch *recursive case*), der das Problem verkleinert und sich selbst aufruft.

```java
int fakultaet(int pN) {
    if (pN <= 1) {          // Basisfall
        return 1;
    }
    return pN * fakultaet(pN - 1);   // Rekursionsschritt
}
```

Jeder noch nicht zurückgekehrte Aufruf belegt einen :t[Kellerrahmen]{#kellerrahmen}. Fehlt der Basisfall oder wird er nie erreicht, läuft der :t[Kellerstapel]{#kellerstapel} voll – es gibt einen :t[Stapelüberlauf]{#stapelueberlauf}.
