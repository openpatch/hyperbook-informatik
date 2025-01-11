---
name: Links
lang: de
index: 5
---

# Links

Links sind ein wichtiges Element in Webseiten. Sie ermöglichen es, von einer Seite zur anderen zu springen. Links können auf andere Seiten im Internet oder auf andere Stellen innerhalb der gleichen Seite verweisen.

## Links einfügen

Links werden mit dem `<a>`-Element eingefügt. Das `href`-Attribut gibt die Adresse an, auf die der Link verweisen soll. Der Text, der angezeigt wird, wird zwischen den `<a>`- und `</a>`-Tags eingefügt.

```html
<a href="https://informatik.openpatch.org">Zur Startseite</a>
```

Links können absolut oder relativ sein. Ein absoluter Link enthält die vollständige Adresse, zum Beispiel `https://informatik.openpatch.org`. Ein relativer Link enthält nur den Pfad zur Datei, zum Beispiel `index.html`. Wenn dieser mit `/` beginnt, wird der Pfad relativ zum Wurzelverzeichnis der Webseite interpretiert. Andernfalls wird der Pfad relativ zum aktuellen Verzeichnis interpretiert.


## Links auf andere Stellen auf der gleichen Seite

Links können auch auf andere Stellen auf der gleichen Seite verweisen. Dazu wird der `id`-Attribut eines Elements als Ziel für den Link verwendet. Der Link enthält dann als Adresse `#` gefolgt von der `id` des Elements.

```html
<a href="#abschnitt1">Zum Abschnitt 1</a>
```