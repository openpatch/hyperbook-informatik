---
name: Entity-Relationship-Diagramm
lang: de
---

# Entity-Relationship-Diagramm

Ein **Entity-Relationship-Diagramm** (ER-Diagramm) stellt eine Datenbankmodellierung grafisch dar. In der Chen-Notation gilt:

- **Rechteck** – Entitätstyp
- **Raute** – Beziehungstyp
- **Ellipse** – Attribut, Schlüsselattribute unterstrichen
- **Beschriftung an der Kante** – :t[Kardinalität]{#kardinalitaet}

Aus dem Diagramm entsteht mit festen Regeln das :t[Relationenschema]{#relationenschema}: Jeder Entitätstyp wird eine Relation, eine 1:n-Beziehung wird ein :t[Fremdschlüssel]{#fremdschluessel} auf der n-Seite, eine n:m-Beziehung wird eine eigene Relation.
