---
name: Eine neue Nachricht
index: 0
lang: de
---

# Eine neue Nachricht

## MessageOverflow

Das Nachrichtenarray (messages) unseres Messengers ist voll. Es kommt aber eine weitere Nachricht an. Die älteste (erste) Nachricht im Array soll gelöscht werden, sodass ein Platz für die neue Nachricht frei wird. Dabei soll die Reihenfolge der Nachrichten erhalten beleiben.

### Aufgaben

- Beschreibe eine Möglichkeit wie das umgesetzt werden könnte.
- Setze die Schritte im Objektdiagramm unten um.

::jmp{id="messageoverflow" src="messageoverflow.jmp" height="760px"}

:::alert{info}

Sobald ein Objekt nicht mehr referenziert wird, ist dieses nicht mehr addressierbar und wird vom Gargabecollector eingesammelt.

:::

## Speicherplatz erweitern

Das Array messages soll nun mitwachsen. Das heißt, dass wenn das Array keinen freien Platz mehr zur Verfügung hat, soll ein neues Array mit der doppelten Anzahl an Plätzen erzeugt werden. Die alten Nachrichten sollen jedoch erhalten bleiben.

### Aufgaben

- Setze die Schritte im Objektdiagramm unten um. Ein neues Array ziehst du dabei mit **new Array**
  aus der Palette auf die gepunktete Fläche.

::jmp{id="speicher-erweitern" src="speicher-erweitern.jmp" height="760px"}
- Manipuliere das Objektdiagramm, sodass die Anforderungen erfüllt sind.
- Beurteile, inwiefern du die Strategie geeignet hälst.
- Ein Teammitglied schläg vor lieber die Formel: $ n \cdot \frac{3}{2} +1 $ (wobei n die vorherige Größe ist) zu verwenden. Er meint, dass das effizienter wäre. Beurteile seine Aussage.

:::collapsible{title="Hilfe: Vergleich der Formeln" id="skjfsanva"}

Schaue dir das Cryptpad an: [Vergleich der Formeln zur Vergrößerung eines Arrays](https://cryptpad.fr/sheet/#/2/sheet/view/G+C+MC0HITmT+hrEIVPMksK2y-PsAgcvPN6LCsnDWiw/)

:::
