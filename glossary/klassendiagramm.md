---
name: Klassendiagramm
---

# Klassendiagramm

Klassendiagramme zeigen eine grafische Darstellung von Klassen sowie deren Beziehungen. Wir unterscheiden zwischen verschiedenen Stufen der Klassendiagramme. Je höher die Stufe, desto genauer können wir modellieren. Für den Anfang reicht aber auch Stufe 1.

## Stufe 1

In Stufe 1 werden die einzelnen Klassen grafisch darstellt. Je Klasse wird in ein Rechteck gezeichnet und in drei Abschitt eingeteilt. 

Im ersten Abschnitt steht der Klassenname zentriert in der Mitte. 

Im zweiten Abschnitt stehen die Attribute und zwar in der Form:

```text
[ATTRIBUTNAME]: [DATENTYP]
```

Im dritten Abschnitt stehen die Methoden und zwar in der Form:

```text
[METHODENNAME]()
```

Wenn eine Methode Parameter übergeben bekommt, dann ändert sich die Form in:

```text
[METHODENNAME]([PARAMETERNAME]: [DATENTYP], [PARAMETERNAME]: [DATENTYP], ...)
```

Wenn eine Methode eine Rückgabe hat, dann wird der Datentyp ans Ende geschrieben:

```text
[METHODENNAME](): [RÜCKGABEDATENTYP]
```

::excalidraw{src="/assets/klassendiagramm_stufe1.excalidraw" aspectRatio="4/3" autoZoom=true id="3fcfe0dca0d5f59d9e4e334d4351ca224747b4b7eab19bd3908b7f0c36f9afb4"}

## Stufe 2

In der Stufe 2 kommen Zugriffsmodifikatoren hinzu.

- `+` für public – (engl. öffentlich), unbeschränkter Zugriff
- `#` für protected – (engl. geschützt), Zugriff nur von der Klasse sowie von Unterklassen (Klassen, die erben)
- `−` für private – (engl. privat), nur die Klasse selbst kann es sehen

::excalidraw{src="/assets/klassendiagramm_stufe2.excalidraw" aspectRatio="4/3" autoZoom=true id="e22f28f28f3205b240ea4f7b51fac35917df3f0bedfbd5851e37bd7df06c2383"}