---
name: Generische Klassen
index: 2
lang: de
---

# Generische Klassen

Wenn eine Klasse für verschiedene Datentypen funktionieren soll, dann kännen sogenannte Typparameter verwendet werden. Diese Klasse bezeichnet man als generische Klassen. Im folgengenden lernst du an einem Beispiel wie sie funktionieren.

## Rechner als normale Klasse

Klassen in java können Instanz- und/oder Klassenvariablen besitzen. Die Datentypen dieser Attribute werden in der Definition der Klasse festgelegt. Beispielweise könnte eine Klasse Rechner mit dem Datentyp double funktionieren.

:::onlineide{id="taschenrechner-ohne-generics"}

```java Rechner.java

Rechner rechner = new Rechner();
rechner.setN1(3.123);
rechner.setN2(1);

public class Rechner {
    private double n1;
    private double n2;

    public void setN1(double pN1) {
        n1 = pN1;
    }

    public void setN2(double pN2) {
        n2 = pN2;
    }

    //...
}

```

:::

Die beiden Setter-Methoden verlangen den Datentyp double als Parameter.

## Rechner als generische Klasse

Wenn die obrige Klasse Rechner erweitert werden soll, sodass die Datentypen, mit denen die Klasse arbeitet, erst bei ihrer Verwendung festgelegt werden, dann können sogenannte Typparameter genutzt werden.

Typparameter werden als frei werden in spitzen Klassen hinter dem Klassennanme definiert und können dann an all den Stellen verwendet werden, an denen sonst der jeweilige konkrete Datentyp angegeben werden würde.

Typparameter dürfen als Platzhalter für beliebige Referenztypen, jedoch nicht für primitive Datentypen verwendet werden. Sollen als z.B. Zahlen genutzt werden, müssen die Wrapper-Klassen (Integer, Double, Float, Boolean usw.) verwendet werden.

Die Klasse Rechner als generische Klasse sieht wie folgt aus:

:::onlineide{id="taschenrechner-generic-1"}

```java Rechner.java

Rechner<Double> rechner = new Rechner<Double>();
rechner.setN1(3.123);
rechner.setN2(1.0);

public class Rechner<E> {
    private E n1;
    private E n2;

    public void setN1(E pN1) {
        n1 = pN1;
    }

    public void setN2(E pN2) {
        n2 = pN2;
    }

    //...
}

```

:::

Es können auch zwei oder mehr Typparameter verwendet werden. In unserem Beispiel könnten wir so verschiedene Datentypen für die Attribute n1 und n2 nutzten.

:::onlineide{id="taschenrechner-generic-2"}

```java Rechner.java

Rechner<Double, Integer> rechner = new Rechner<Double, Integer>();
rechner.setN1(3.123);
rechner.setN2(1);

public class Rechner<E, F> {
    private E n1;
    private F n2;

    public void setN1(E pN1) {
        n1 = pN1;
    }

    public void setN2(F pN2) {
        n2 = pN2;
    }

    //...
}

```

:::

Wir können selbstverständlich auch im Konstruktor die Typparameter verwenden.

```java

public Rechner(E pN1, F pN2) {
    n1 = pN1;
    n2 = pN2;
}

```

## Einschränkung des Typparameters

Bis jetzt können noch alle Referenztypen als Typparameter verwendet werden. Wenn wir jedoch eine bestimmte Klasse implementieren möchten, dann möchten wir oftmals auch Anforderungen an die Typparameter stellen. In unserem Rechnerbeispiel können es sein, dass wir nur Datentypen haben möchten, die zum Beispiel ein bestimmes Interface implementieren oder von einer bestimmten Klasse erben.

:::onlineide{id="taschenrechner-generic-3"}

```java Rechner.java

Rechner<Number> rechner = new Rechner<Number>();
rechner.setN1(new NumberString("Hallo"));
rechner.setN2(new NumberString("Test"));
rechner.add();

public class Rechner<E extends Number> {
    private E n1;
    private E n2;

    public void setN1(E pN1) {
        n1 = pN1;
    }

    public void setN2(E pN2) {
        n2 = pN2;
    }

    public double add() {
        return n1.toDouble() + n2.toDouble();
    }

    //...
}

```

```java NumberString.java
class NumberString extends Number {
    private String value;
    public NumberString(String pValue) {
        value = pValue;
    }

    public double toDouble() {
        int sum = 0;
        for (int i = 0; i < value.length(); i++) {
            sum += value.charAt(i);
        }
        return sum;
    }
}
```

```java Number.java
public abstract class Number {
    public abstract double toDouble();
}

```

:::
