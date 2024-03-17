---
name: Alles kommt wieder
index: 6
lang: de
---

# Alles kommt wieder

Nach ein paar Sekunden ist der Spielspaß vorbei. Die Plattformen sind zu Ende, der Stachelfeind ist überwunden und unser Bugs stürzt in den Abgrund. Das wollen wir jetzt ändern.

Die Plattformen und der Stachelfeind sollen immer wieder ans andere Ende des Bildschirms gesetzt werden, wenn sie den Bildschirm verlassen.

## Die letzte Plattform

Dazu verändern wir zunächst den Konstruktor der BunnyHop Klasse. Im Moment haben wir für jede Plattform ein Attribut. Damit wir unser Vorhaben realisieren können, müssen benötigen wir nur für die letzte Plattform ein Attribut.

### Aufgaben

1. Verändere die Klasse BunnyHop so, dass die Attribute p1, p2, ... entfernt sind und ein neues Attribut letzte hinzugefügt ist.

1. Verändere anschließend das Hinzufügen von Plattformen im Konstruktor so, dass folgendes Struktogramm umgesetzt ist.

::struktog{data="https://struktog.openpatch.org/#pako:eNqlVdtu00AQ_ZWVn1qRKXu_9A2hIiEhVKlI5XUvs42FY0fJRoVW_TPe-DGmpSItKIGAHyx7bJ85Z-bM-LZbTAWH7vS260t32pWSUHiVwTgdwGU0YKOvIJ2vGtF3s659WSK9-XZc46q9p68pVqdhmK7PBlzg2H6CVZ-MdDyCNt4Dzy5CNCUCGim5cW4L9iGuPz1CNfxMCN3Z6gY3V8iwH5GNuEF2PsTW6rRasM1YWMIBrxorcc1etbbq06axAdtNQ7boKd4j0TvZSU2JaFUxGaQ0FowhidZ6C0pXY3lRB-mkokUrE0nkQkD0UkCyVoP3AZPIfJ_OC-KM93TZ-bTuWz-NrODqidhHUXGzZkd8xpTmxzuJCJVzicWB9aGCylZACVYB197GKvAgVdm6GIxNoCsVxtgcoSatAW12Wkm5BXs9bcb2bpqWz6Vd9khS5tOATHC2iMPOVCl6l1WwoEMyIDFGCIHyoRNVKCX_jve4GYa7WZfn_VC2Kki_c84DxpzAqyDppAXorFJQQRxm6FKD9DWAF0pD0SVA1spD4srx4PFfDb3cmdErFVXNAhTyALr4ApgkB899tjXbwzpqQlG6kDM8jaKv3IAqgWagphAFyv_y6ZIsWtnRD7ueXGH7eHTMXrDt_WVf2pxiL5mk-PKX0B-c7XOS1SCCrTRYyToN2SsOQTuZZKoH1SH5kmqqCMaLQsOPZO_CK_iYXdI176vDm29fqYnLB_EXLdL1vB9vNjtzmWSLkrQW-D3xHESFVFwBVTmG6A9bNJmAVCHi2mYJkZOtjTMIwmaMtoh9xC-xX1MDcfHbvnxo6pM-7lETVaGfgEiQ0WWIihwkTRAgIy0JzO6AQX1-zLo59ldzeig1n3XX98boToMRd98BAlEP3Q"}

## Getter und Setter

Um die letzte Plattform wieder an den Anfang zu verschieben, können wir die `run`-Methode der Klasse Plattform um folgendes erweitern:

```java
if (this.getX() + this.getWidth() < 0) {
    Plattform letzte = spiel.getLetzte();
    this.setX(letzte.getX() + letzte.getWidth() / 2 + this.getWidth() / 2);
    beruehrt = false;
    this.show();
    spiel.setLetzte(this);
}
```

In diesem Stück Quelltext benutzen wir das Attribut `spiel`, welches noch nicht in der Klasse Plattform definiert ist.

Wir benutzen auch die Methoden `setLetzte` und `getLetzte` der Klasse BunnyHop, die wir noch nicht implementiert haben.

### Aufgaben

1. Erweitere die Klasse Plattform um das Attribut `spiel`. Wähle einen geeigneten Datentyp und weise dem Attribut im Konstruktor einen Wert zu.

1. Erweitere die Klasse BunnyHop um die Methoden `public void setLetzte(Plattform pPlattform)` und `public Plattform getLetzte()`.

## Wo ist der Stachelfeind?

Auch der Stachelfeind soll wieder zurückkommen.

### Aufgaben

1. Der Stachelfeind soll, wenn er das Fenster verlassen hat, wieder an den Anfang gesetzt werden.
