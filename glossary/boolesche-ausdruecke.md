---
name: Boolesche Ausdrücke
lang: de
---

# Boolesche Ausdrücke

Ein boolescher Ausdruck ist ein Ausdruck, der zu `true` oder `false` ausgewertet werden kann.

Zum Beispiel werden boolesche Ausdrücke für :t[bedingte Anweisungen]{#bedingte-anweisung} verwendet:

:::onlineide{id="380623"}

```Bool.java
boolean b = true;

if (b) {
    System.out.println("b ist true");
}
```

:::

Boolesche Ausdrücke werden häufig zusammengesetzt, um komplexere Zusammenhänge zu beschreiben.

Dafür können boolesche Ausdrücke mit `&& (und)` oder mit `|| (oder)` verknüpft werden. Zusammengesetzte boolesche Ausdrücke werden von links nach rechts ausgewertet.

:::onlineide{id="615227"}

```Bool.java
boolean a = false;
boolean b = true;
System.out.println("a:false, b: true, (a && b) - " + (a && b));  //false
System.out.println("a:false, b: true, (a || b) - " + (a || b));  // true
a = true;
b = true;
System.out.println("a:true, b: true, (a && b) - " + (a && b));  // true
System.out.println("a:true, b: true, (a || b) - " + (a || b));  // true
a = false;
b = false;
System.out.println("a:false, b: false, (a && b) - " + (a && b));  // false
System.out.println("a:false, b: false, (a || b) - " + (a || b));  // false
```

:::