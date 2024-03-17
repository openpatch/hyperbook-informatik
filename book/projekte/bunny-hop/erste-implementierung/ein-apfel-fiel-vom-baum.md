---
name: Ein Apfel fiel vom Baum
index: 5
lang: de
---

# Ein Apfel fiel vom Baum

Bis jetzt spring und fällt unser Spieler bis zu bestimmten Punkten, die wir definiert haben (sprungHoehe und bodenHoehe). Im Folgenden wollen wir das Konzept der Gravitation in unserem Spiel implementieren.

Folgendes Struktogramm zeigt, wie das Konzept der Gravitation in der Spieler-Klasse implementiert sein könnte.

::struktog{data="https://struktog.openpatch.org/#pako:eNqllttuI0UQhl_Fmustqc-HvQQhQCC0UhCIy-quas8o45loPFYWVvs2PANX3O2LUd6EzWaRQ0axZNnuaVdX_f3V3_2uO8zEY_f6XTdQ97ojR4Eie6iaIlRKBqzzBULBRNWl7lW3_n7DMvP76cjL-pP8W8baPI7z7TcjH3haPwUrpKIxkSAH5cCSi5C9a6CdQ62cewj21YJT7e-DrfxWYnS_8jTtiJfd1c3Ao3web5Zh2q8XlwsOi2cuoLVx4D0qCLlpaDb5yOGZuU-ncXwvM5cTf90PI30Kz1SNRK-gm1GQSROYhAUoWM0FeZM0waeYtEqgavZQ0ARAGxwgaW4q0EOwn_F4_ViYX3j58OckyvCOBt79Bj_M80LDhCvvToePY1c3y2na7_lY-9thomF_zcNl4WKJVXPVUKvsfFTNgLwt2JgpNo2bKkvZRettghgIIWbMEkx7yJpK9SU-Z9OlArxeTzyO5_LezMdhHeZpdz3yMAkI85mKvfyo_UdADvh2OODI033d_Ye_et4Nx8sV20oecyKwWApEowu0mgkwofU62xeiEiMqV8mBJldBFAmQQjaQqqmZvdqGikHD0RLUEEjSTAyBUgITQ60tP4nKFa9_CBUNx7M6eGq7W-yXy3unimUsFoIsKnQ3C8kK7Kno5mrWm_LWhVqx2YHEZCBKDZJRVZCoucXPQbiY913H32cuRQjOF5erOsYW0ICRpock9EFw8g1TU5Wq3ZS7uFTOVkRWNgURQikwrA1ob1RkbM_I_T-tea7hPPgvrZ_DejERFX3wNhRwSF4aUoyNgysgSPjWqt8A6t1LnomOX_AaGL1XXoFCI02gmmhXSoPoinhA9s_V7n7SmxEr9_Movdk9saqcAMJ1SRBsFUqa0GZNEb8OKF1iNnaJKy1jMBAUVbA2RLA6yullXPLZlhca6rmDvn2mnYZYlD6bi1NKnDQSiw_EBF5VdK3Rprqk6XW1WUI4pYWCYoA5IiAb38S1H4J9x0g_zvPNFzTOI0oLPTpIzy66k01a1zYvh12R8v_ulyfOB1UoommyfAhQvA6gcq3ACUNkpze5ZX3EgNMGpbIsrhAjeJQjkI2OYpfGZ8KwSStWJrhGDYoTx5Vri4GKhcR2xXjQ4AsYuDt6dle1X4Z1vZyCiVxabaLS2UZLFAB0FMcm5bLlvO3-lLUS12lyobFWrh0GRaFzg6RUOIkhb3P-__HPoCw24QuCrxmaqQWq8w5iS74Zipud5q7vex72vTyw0b_qbgda--519vr9PxJ_TRE"}

Um das Struktogramm umsetzten zu können, musst du eine Variante der `isTouchingSprite`-Methode verwenden.

Die `isTouchingSprite`-Methode kann auch für alle Objekte einer Klasse verwendet werden. Beispiel:

```java
if(this.isTouching(Feind.class)) {
    // irgendein Objekt der Klasse Feind oder Unterklassen der Klasse Feind wird berührt.
}
```

## Aufgabe

1. Implementiere das Konzept der Gravitation für die Klasse Spieler.
2. Implementiere das Konzept der Gravitation für die Klasse StachelFeind.

:::collapsible{title="Tipp" id="508943"}
Nutze `this.isTouching(Plattform.class)`, um zu überprüfen, ob das aktuelle Objekt mit einer Plattform kollidiert.
:::

### Lösung

::archive[Projekt Gravitation.zip]{name="bunny-hop-bugs-gravitation"}
