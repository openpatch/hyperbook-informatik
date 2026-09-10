---
name: Probe Zahlen
index: 996
hide: true
---

# Probe: Wie schreibt die Online-IDE Kommazahlen?

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Tests im Reiter Testrunner.");
}
```

```java ZahlenTest.java
@Test
class ZahlenTest {

    @Test
    void testGanzeKommazahl() {
        double d = 25.0;
        assertEquals("25.0", "" + d, "Erwartet 25.0");
    }

    @Test
    void testGanzeKommazahlOhneNull() {
        double d = 25.0;
        assertEquals("25", "" + d, "Erwartet 25");
    }

    @Test
    void testEchteKommazahl() {
        double d = 2.5;
        assertEquals("2.5", "" + d, "Erwartet 2.5");
    }

    @Test
    void testDrittel() {
        assertEquals("0.3333333333333333", "" + (1.0 / 3.0), "Erwartet volle Genauigkeit");
    }

    @Test
    void testIntBleibtInt() {
        int i = 25;
        assertEquals("25", "" + i, "Erwartet 25");
    }

    @Test
    void testDoubleVergleich() {
        assertEquals(25.0, 5.0 * 5.0, "Zahlenvergleich mit double");
    }
}
```

:::
