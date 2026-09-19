---
name: Referenz
lang: de
---

# Referenz

Eine **Referenz** (englisch *reference*, im Buch auch **Verweis**) ist ein Wert, der auf ein :t[Objekt]{#objekt} auf der :t[Halde]{#halde} zeigt. Die Referenz selbst ist nicht das Objekt – sie ist die Adresse, unter der es zu finden ist.

Daraus folgt der wichtigste Unterschied zwischen den beiden Sorten von :t[Datentypen]{#datentyp}:

| | elementarer Datentyp (`int`, `double`, `boolean`, …) | Objekttyp (`String`, `int[]`, eigene :t[Klassen]{#klasse}) |
| --- | --- | --- |
| Was steht in der Variablen? | der Wert selbst | eine Referenz auf das Objekt |
| Was wird beim Methodenaufruf übergeben? | eine Kopie des Werts | eine Kopie der Referenz |
| Kann die Methode das Original ändern? | nein | ja, über die Referenz |

```java
int[] a = {1, 2, 3};
int[] b = a;     // b verweist auf dasselbe Feld, es gibt keine Kopie
b[0] = 99;
// a[0] ist jetzt ebenfalls 99
```

Zeigen zwei Variablen auf dasselbe Objekt, spricht man von **Aliasing** – dasselbe Objekt hat zwei Namen. `null` bedeutet: Diese Variable verweist auf gar kein Objekt.

:::alert{info}
Eine Referenz ist **kein** Zeiger im Sinne von C: Man kann mit ihr nicht rechnen und keine beliebige Speicheradresse ansteuern.
:::
