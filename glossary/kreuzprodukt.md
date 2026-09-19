---
name: Kreuzprodukt
lang: de
---

# Kreuzprodukt

Das **Kreuzprodukt** (englisch *cross join* oder *cartesian product*, deutsch auch *kartesisches Produkt*) zweier :t[Relationen]{#relation} enthält jede Kombination aus einem :t[Tupel]{#tupel} der einen und einem Tupel der anderen.

Es hat so viele Zeilen wie das **Produkt** der beiden Zeilenzahlen: 20 Bands und 50 Alben ergeben 1000 Zeilen.

```sql
SELECT * FROM band, album;   -- Kreuzprodukt, fast nie gewollt
```

Die allermeisten dieser Zeilen sind unsinnig, weil sie Bands mit fremden Alben kombinieren. Deshalb wird das Kreuzprodukt praktisch immer durch eine Bedingung eingeschränkt – und dann ist es ein :t[Verbund]{#verbund} (englisch *join*).
