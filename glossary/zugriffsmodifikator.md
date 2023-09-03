---
name: Zugriffsmodifikator
lang: de
---

Ein Zugriffsmodifikator in der objektorientierten Programmierung ist ein Konzept, das die Sichtbarkeit und den Zugriff auf Klassen, deren Attribute und Methoden steuert. Es legt fest, welche Teile einer Klasse von anderen Teilen des Programms gesehen oder geändert werden können. Hier sind die drei häufigsten Zugriffsmodifikatoren:

1. Public (Öffentlich): Wenn ein Attribut oder eine Methode als "public" deklariert wird, bedeutet das, dass es von überall im Programmcode aus zugänglich ist. Andere Klassen oder Teile des Codes können darauf zugreifen und es verwenden. Dies ist die am weitesten verbreitete Art von Zugriffsmodifikator und wird oft für Schnittstellen und öffentliche APIs verwendet.
1. Private (Privat): Wenn ein Attribut oder eine Methode als "private" deklariert wird, ist es nur innerhalb der gleichen Klasse sichtbar und zugänglich. Andere Teile des Programms können nicht direkt darauf zugreifen. Private Attribute und Methoden werden oft verwendet, um interne Implementierungsdetails zu verbergen und die Datenkapselung zu fördern.
1. Protected (Geschützt): Ein Attribut oder eine Methode, das als "protected" deklariert wird, ist ähnlich wie "private", aber es gibt eine Ausnahme. Es kann von abgeleiteten Klassen (Unterklassen) der aktuellen Klasse gesehen und verwendet werden. Das bedeutet, dass die abgeleitete Klasse auf die "geschützten" Attribute und Methoden der Basisklasse zugreifen kann.