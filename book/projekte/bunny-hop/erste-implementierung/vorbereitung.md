---
name: Vorbereitung
index: 0
lang: de
---

# Vorbereitung

Nun werden wir mit der Implementierung des Spiels beginnen. Dazu laden wir uns zuerst die Bibliothek [**Scratch for Java**](https://scratch4j.openpatch.org) herunter. Diese wird uns die Spieleentwicklung vereinfachen.

::download[Scratch for Java (Windows)]{src="/assets/scratch4j-windows-amd64.jar"}

Anschließend laden wir uns die Grafiken für unser Spiel herunter.

::download[Grafiken]{src="https://www.kenney.nl/content/3-assets/110-jumper-pack/jumperpack_kenney.zip"}

## Einrichtung BlueJ

Wir öffnen BlueJ und legen ein neues Projekt an.

![](/images/bunny-hop/vorbereitung/neues-projekt.png)

Dieses Projekt nennen wir **Bunny Hop**.

Jetzt müssen wir die Bibliothek **Scratch for Java** registrieren. Das machen wir durch die folgenden Schritte:

1. Den Projekt-Ordner von **Bunny Hop** im Dateimanager öffnen.
2. Einen Ordner **+libs** im Hauptverzeichnis des Projekt-Ordners anlegen.
3. Die Jar-Datei von Scratch for Java in den Ordner **+libs** verschieben.
4. BlueJ neu starten. Erst danach wir die neue Bibliothek registriert.

Als Nächstes wollen wir die Grafiken verfügbar machen. Dazu führen wir folgende Schritte durch:

1. Den Projekt-Ordner von **Bunny Hop** im Dateimanager öffnen.
2. Einen Ordner Grafiken anlegen.
3. Die Zip-Datei jumperpack_kenny.zip entpacken.
4. Den Inhalt des Ordners PNG in den Ordner assets verschieben.

Deine Ordnerstruktur sollte jetzt wie folgt aussehen:

```bash
├── assets
│   ├── Background
│   ├── Enemies
│   ├── Environment
│   ├── HUD
│   ├── Items
│   ├── Particles
│   └── Players
├── +libs
│   └── scratch4j-windows-amd64.jar
├── package.bluej
└── README.TXT
```

## Das erste Programm

Um zu überprüfen, ob alles funktioniert hat, werden wir jetzt ein kleines erstes Programm erstellen.

Erstelle dazu eine Klasse **BunnyHop** und eine Klasse **Spieler**. Anschließend kopiere die folgenden Quelltexte in die Klassen.

::::tabs{id="845876"}

:::tab{title="BunnyHopp" id="605171"}

```java
import org.openpatch.scratch.*;

public class BunnyHop extends Stage
{
    Spieler bugs;

    public BunnyHop()
    {
       bugs = new Spieler();
       this.add(bugs);
    }
}

```

:::

:::tab{title="Spieler" id="605170"}

```java
import org.openpatch.scratch.*;

public class Spieler extends Sprite
{

    public Spieler()
    {
      this.addCostume("stehen", "assets/Players/bunny1_stand.png");
    }

}

```

:::

::::

Um Bugs auf der Bühne zu sehen, musst du das Programm nur noch ausführen. Erzeuge dazu ein neues Objekt von der Klasse **BunnyHop**.

![](/images/bunny-hop/vorbereitung/ausführen.png)

Anschließend solltest du die folgende Ausgabe sehen.

![](/images/bunny-hop/vorbereitung/bunny.png)

:::alert{warn}
Es kann immer nur ein Objekt der Klasse Stage erzeugt werden. Sei also sicher, dass du das Fenster immer schließt, sonst kommt es zu einer Fehlermeldung.

![](/images/bunny-hop/vorbereitung/nur-eine-stage-fehler.png)
:::
