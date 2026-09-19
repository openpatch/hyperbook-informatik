---
name: Stapelüberlauf
lang: de
---

# Stapelüberlauf

Ein **Stapelüberlauf** (englisch *stack overflow*) tritt auf, wenn auf dem :t[Kellerstapel]{#kellerstapel} kein Platz mehr für einen weiteren :t[Kellerrahmen]{#kellerrahmen} ist. Java bricht das Programm dann mit einem `StackOverflowError` ab.

Jeder noch nicht zurückgekehrte Methodenaufruf belegt einen Rahmen. Typischer Auslöser ist deshalb eine :t[Rekursion]{#rekursion} ohne Basisfall: Kein Aufruf kehrt zurück, also wird kein Rahmen abgeräumt, und der Stapel läuft voll.

```java
/** Läuft nie zu Ende – es fehlt der Basisfall. */
int fakultaet(int pN) {
    return pN * fakultaet(pN - 1);
}
```

:::alert{info}
Die Fehlermeldung heißt auch auf Deutsch `StackOverflowError`. Wer nach dem Begriff sucht, sollte nach *stack overflow* suchen.
:::
