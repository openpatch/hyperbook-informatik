---
name: Probe final
index: 995
hide: true
---

# Probe: final und static, Schritt fuer Schritt

## A: nur Konstante

:::onlineide{height="420px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Tests im Reiter Testrunner.");
}
```

```java VorratA.java
public class VorratA {
    public static final int MAX = 5;
}
```

```java ATest.java
@Test
class ATest {
    @Test
    void testKonstante() {
        assertEquals(5, VorratA.MAX, "Konstante ueber den Klassennamen.");
    }
}
```

:::

## B: Konstante ueber ein Objekt

:::onlineide{height="420px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Tests im Reiter Testrunner.");
}
```

```java VorratB.java
public class VorratB {
    public static final int MAX = 5;
}
```

```java BTest.java
@Test
class BTest {
    @Test
    void testUeberObjekt() {
        VorratB v = new VorratB();
        assertEquals(5, v.MAX, "Konstante ueber ein Objekt.");
    }
}
```

:::

## C: protected static

:::onlineide{height="420px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Tests im Reiter Testrunner.");
}
```

```java VorratC.java
public class VorratC {
    protected static int erzeugt = 0;

    public VorratC() {
        erzeugt = erzeugt + 1;
    }
}
```

```java CTest.java
@Test
class CTest {
    @Test
    void testProtectedStatic() {
        int vorher = VorratC.erzeugt;
        new VorratC();
        assertEquals(vorher + 1, VorratC.erzeugt, "protected static zaehlt.");
    }
}
```

:::

## D: static final Feld

:::onlineide{height="480px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Tests im Reiter Testrunner.");
}
```

```java VorratD.java
public class VorratD {
    public static final int[] STUFEN = {1, 2, 3};

    public int erstes() {
        return STUFEN[0];
    }

    public void aendere() {
        STUFEN[0] = 99;
    }
}
```

```java DTest.java
@Test
class DTest {
    @Test
    void testInhaltAenderbar() {
        VorratD v = new VorratD();
        assertEquals(1, v.erstes(), "Vorher 1.");
        v.aendere();
        assertEquals(99, v.erstes(), "final schuetzt nur die Referenz.");
    }
}
```

:::
