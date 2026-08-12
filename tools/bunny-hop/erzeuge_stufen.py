#!/usr/bin/env python3
"""Erzeugt die Archive der einzelnen Bunny-Hop-Lektionen.

Die Endfassung liegt in `archives/bunny-hop-07-deko`. Jede Lektion ist ein
Ausschnitt davon: dieselben Dateien, nur mit weniger Klassen und weniger Zeilen.
So kann keine Stufe von der Endfassung abweichen - und die Seiten holen sich
ihren Quelltext per `rfile` direkt aus diesen Ordnern.

Aufruf: python3 tools/bunny-hop/erzeuge_stufen.py
"""
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[2]
ARCHIVE = WURZEL / "archives"
QUELLE = ARCHIVE / "bunny-hop-spiel"
JAR = "scratch-5.3.0-all.jar"

MAIN = '''import org.openpatch.scratch.*;

/// Startet das Spiel.
void main() {
    Window fenster = new Window(800, 400);
    fenster.setStage(new BunnyHop());
}
'''

SPIELER_STAND = '''import org.openpatch.scratch.*;

/// Bugs.
public class Spieler extends Sprite {

    public Spieler() {
        this.addCostume("stehen", "bunny1_stand");
        this.setSize(50);
        this.setPosition(-250, -45);
    }
}
'''

PLATTFORM_STILL = '''import org.openpatch.scratch.*;

/// Ein Stück Boden.
public class Plattform extends Sprite {

    public Plattform() {
        this.addCostume("gras", "ground_grass_small");
        this.setSize(50);
    }
}
'''

def buehne(zeilen_aufbau, felder="", methoden="", schleife=""):
    return f'''import org.openpatch.scratch.*;

/// Die Bühne: Sie baut die Welt auf.
public class BunnyHop extends Stage {{

    /// So viele Plattformen liegen nebeneinander.
    public static final int PLATTFORMEN = 9;
    /// So breit ist eine Plattform.
    public static final int BREITE = 100;
{felder}
    public BunnyHop() {{
        this.setColor(140, 200, 235);

{zeilen_aufbau}    }}
{schleife}{methoden}}}
'''

STUFEN = {}

# --- 01 Vorbereitung: nur Bugs -------------------------------------------
STUFEN["bunny-hop-01-vorbereitung"] = {
    "Main.java": MAIN,
    "Spieler.java": SPIELER_STAND,
    "BunnyHop.java": buehne("        Spieler bugs = new Spieler();\n        this.add(bugs);\n"),
}

# --- 02 Der Boden: Plattformen liegen nebeneinander ----------------------
AUFBAU_BODEN = '''        for (int i = 0; i < PLATTFORMEN; i++) {
            Plattform p = new Plattform();
            p.setPosition(-400 + i * BREITE, -120);
            this.add(p);
        }

        Spieler bugs = new Spieler();
        this.add(bugs);
'''
STUFEN["bunny-hop-02-boden"] = {
    "Main.java": MAIN,
    "Spieler.java": SPIELER_STAND,
    "Plattform.java": PLATTFORM_STILL,
    "BunnyHop.java": buehne(AUFBAU_BODEN),
}

# --- 03 Alles bewegt sich: Plattformen scrollen und kommen wieder --------
PLATTFORM_BEWEGT = '''import org.openpatch.scratch.*;

/// Ein Stück Boden. Es wandert nach links und kommt rechts wieder herein.
public class Plattform extends Sprite {

    private BunnyHop spiel;

    public Plattform(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("gras", "ground_grass_small");
        this.setSize(50);
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit());

        if (this.getX() < -450) {
            this.changeX(BunnyHop.PLATTFORMEN * BunnyHop.BREITE);
        }
    }
}
'''
AUFBAU_BEWEGT = AUFBAU_BODEN.replace("new Plattform()", "new Plattform(this)")
TEMPO = '''
    /// Wie schnell die Welt an Bugs vorbeizieht.
    public double getGeschwindigkeit() {
        return geschwindigkeit;
    }
'''
STUFEN["bunny-hop-03-bewegung"] = {
    "Main.java": MAIN,
    "Spieler.java": SPIELER_STAND,
    "Plattform.java": PLATTFORM_BEWEGT,
    "BunnyHop.java": buehne(AUFBAU_BEWEGT,
                            felder="\n    private double geschwindigkeit = 3;\n",
                            methoden=TEMPO),
}

# --- 04 Bugs lernt springen ---------------------------------------------
SPIELER_SPRINGT = '''import org.openpatch.scratch.*;

/// Bugs. Er läuft auf der Stelle und springt, wenn du die Leertaste drückst.
public class Spieler extends AnimatedSprite {

    /// Auf dieser Höhe stehen Bugs' Füße auf dem Boden.
    public static final int BODEN = -45;

    private double steiggeschwindigkeit = 0;
    private boolean amBoden = true;

    public Spieler() {
        this.addAnimation("gehen", "bunny1_walk%d", 2);
        this.addCostume("springen", "bunny1_jump");
        this.addSound("sprung", "cloth3");
        this.setSize(50);
        this.setAnimationInterval(120);
        this.setPosition(-250, BODEN);
    }

    public void run() {
        if (amBoden && this.isKeyPressed(KeyCode.SPACE)) {
            steiggeschwindigkeit = 9;
            amBoden = false;
            this.playSound("sprung");
        }

        if (amBoden) {
            this.playAnimation("gehen");
        } else {
            this.switchCostume("springen");
            this.changeY(steiggeschwindigkeit);
            steiggeschwindigkeit = steiggeschwindigkeit - 0.5;

            if (this.getY() <= BODEN) {
                this.setY(BODEN);
                steiggeschwindigkeit = 0;
                amBoden = true;
            }
        }
    }
}
'''
STUFEN["bunny-hop-04-springen"] = {
    "Main.java": MAIN,
    "Spieler.java": SPIELER_SPRINGT,
    "Plattform.java": PLATTFORM_BEWEGT,
    "BunnyHop.java": buehne(AUFBAU_BEWEGT,
                            felder="\n    private double geschwindigkeit = 3;\n",
                            methoden=TEMPO),
}

# --- 05 Münzen sammeln ---------------------------------------------------
MUENZE = '''import org.openpatch.scratch.*;

/// Eine Münze. Wer sie berührt, bekommt einen Punkt.
public class Muenze extends Sprite {

    private BunnyHop spiel;

    public Muenze(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("gold", "coin_gold");
        this.setSize(50);
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit());

        if (this.getX() < -450) {
            this.setX(450);
            this.setY(this.pickRandom(-20, 60));
            this.show();
        }
    }

    /// Lässt die Münze verschwinden, bis sie rechts wieder auftaucht.
    public void einsammeln() {
        this.hide();
    }
}
'''

SPIELER_MUENZEN = SPIELER_SPRINGT.replace(
    '    public Spieler() {',
    '    private BunnyHop spiel;\n\n    public Spieler(BunnyHop pSpiel) {\n        spiel = pSpiel;'
).replace(
    '        this.addSound("sprung", "cloth3");',
    '        this.addSound("sprung", "cloth3");\n        this.addSound("muenze", "handleCoins");'
).replace(
    '''                amBoden = true;
            }
        }
    }''',
    '''                amBoden = true;
            }
        }

        Muenze m = this.getTouchingSprite(Muenze.class);
        if (m != null) {
            m.einsammeln();
            this.playSound("muenze");
            spiel.punkten();
        }
    }'''
)

AUFBAU_MUENZEN = '''        for (int i = 0; i < PLATTFORMEN; i++) {
            Plattform p = new Plattform(this);
            p.setPosition(-400 + i * BREITE, -120);
            this.add(p);
        }

        for (int i = 0; i < 3; i++) {
            Muenze m = new Muenze(this);
            m.setPosition(100 + i * 260, 10);
            this.add(m);
        }

        Spieler bugs = new Spieler(this);
        this.add(bugs);

        anzeige = new Text();
        anzeige.setPosition(-380, 160);
        anzeige.setAlign(TextAlign.LEFT);
        anzeige.setTextSize(20);
        anzeige.setTextColor(40, 40, 40);
        this.add(anzeige);
'''

PUNKTE_METHODEN = TEMPO + '''
    /// Zählt eine eingesammelte Münze.
    public void punkten() {
        punkte = punkte + 1;
        geschwindigkeit = geschwindigkeit + 0.2;
    }
'''

SCHLEIFE_PUNKTE = '''
    public void run() {
        anzeige.showText("Punkte: " + punkte);
    }
'''

STUFEN["bunny-hop-05-muenzen"] = {
    "Main.java": MAIN,
    "Spieler.java": SPIELER_MUENZEN,
    "Plattform.java": PLATTFORM_BEWEGT,
    "Muenze.java": MUENZE,
    "BunnyHop.java": buehne(AUFBAU_MUENZEN,
                            felder='\n    private Text anzeige;\n    private int punkte = 0;\n    private double geschwindigkeit = 3;\n',
                            methoden=PUNKTE_METHODEN,
                            schleife=SCHLEIFE_PUNKTE),
}

# --- 06 Ingo, der Stachelmann -------------------------------------------
STACHEL = '''import org.openpatch.scratch.*;

/// Ingo, der Stachelmann. Ihn zu berühren beendet das Spiel.
public class Stachel extends Sprite {

    private BunnyHop spiel;

    public Stachel(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("stehen", "spikeMan_stand");
        this.setSize(50);
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit());

        if (this.getX() < -450) {
            this.setX(450 + this.pickRandom(0, 300));
        }
    }
}
'''

SPIELER_STACHEL = SPIELER_MUENZEN.replace(
    '        this.addSound("muenze", "handleCoins");',
    '        this.addSound("muenze", "handleCoins");\n        this.addSound("aua", "impactPunch_heavy_000");'
).replace(
    '''    public void run() {
        if (amBoden''',
    '''    public void run() {
        if (spiel.istVorbei()) {
            this.switchCostume("verletzt");
            return;
        }

        if (amBoden'''
).replace(
    '        this.addCostume("springen", "bunny1_jump");',
    '        this.addCostume("springen", "bunny1_jump");\n        this.addCostume("verletzt", "bunny1_hurt");'
).replace(
    '''            spiel.punkten();
        }
    }''',
    '''            spiel.punkten();
        }

        if (this.isTouchingSprite(Stachel.class)) {
            this.playSound("aua");
            spiel.spielEnde();
        }
    }'''
)

AUFBAU_STACHEL = AUFBAU_MUENZEN.replace(
    '        Spieler bugs = new Spieler(this);',
    '''        for (int i = 0; i < 2; i++) {
            Stachel s = new Stachel(this);
            s.setPosition(250 + i * 420, -56);
            this.add(s);
        }

        Spieler bugs = new Spieler(this);'''
)

ENDE_METHODEN = '''
    /// Wie schnell die Welt an Bugs vorbeizieht.
    public double getGeschwindigkeit() {
        if (vorbei) {
            return 0;
        }
        return geschwindigkeit;
    }

    /// Zählt eine eingesammelte Münze.
    public void punkten() {
        punkte = punkte + 1;
        geschwindigkeit = geschwindigkeit + 0.2;
    }

    /// Beendet das Spiel.
    public void spielEnde() {
        vorbei = true;
        anzeige.showText("Ende! Punkte: " + punkte + " - drücke r für ein neues Spiel");
    }

    public boolean istVorbei() {
        return vorbei;
    }
'''

SCHLEIFE_ENDE = '''
    public void run() {
        if (!vorbei) {
            anzeige.showText("Punkte: " + punkte);
        }
    }

    public void whenKeyPressed(KeyCode taste) {
        if (vorbei && taste == KeyCode.R) {
            Window.getInstance().setStage(new BunnyHop());
        }
    }
'''

FELDER_ENDE = '\n    private Text anzeige;\n    private int punkte = 0;\n    private double geschwindigkeit = 3;\n    private boolean vorbei = false;\n'

STUFEN["bunny-hop-06-stachel"] = {
    "Main.java": MAIN,
    "Spieler.java": SPIELER_STACHEL,
    "Plattform.java": PLATTFORM_BEWEGT,
    "Muenze.java": MUENZE,
    "Stachel.java": STACHEL,
    "BunnyHop.java": buehne(AUFBAU_STACHEL, felder=FELDER_ENDE, methoden=ENDE_METHODEN, schleife=SCHLEIFE_ENDE),
}

# --- 07 Hintergrund: das fertige Spiel -----------------------------------
DEKO = '''import org.openpatch.scratch.*;

/// Kakteen, Gras und Pilze im Hintergrund. Sie ziehen langsamer vorbei.
public class Deko extends Sprite {

    private BunnyHop spiel;

    public Deko(BunnyHop pSpiel) {
        spiel = pSpiel;
        this.addCostume("kaktus", "cactus");
        this.addCostume("gras", "grass1");
        this.addCostume("pilz-rot", "mushroom_red");
        this.addCostume("pilz-braun", "mushroom_brown");
        this.setSize(50);

        for (int i = 0; i < this.pickRandom(0, 3); i++) {
            this.nextCostume();
        }
    }

    public void run() {
        this.changeX(-spiel.getGeschwindigkeit() / 2);

        if (this.getX() < -450) {
            this.setX(450);
        }
    }
}
'''

AUFBAU_DEKO = '''        for (int i = 0; i < 6; i++) {
            Deko d = new Deko(this);
            d.setPosition(-400 + i * 160, -75);
            this.add(d);
        }

''' + AUFBAU_STACHEL

STUFEN["bunny-hop-07-deko"] = {
    "Main.java": MAIN,
    "Spieler.java": SPIELER_STACHEL,
    "Plattform.java": PLATTFORM_BEWEGT,
    "Muenze.java": MUENZE,
    "Stachel.java": STACHEL,
    "Deko.java": DEKO,
    "BunnyHop.java": buehne(AUFBAU_DEKO, felder=FELDER_ENDE, methoden=ENDE_METHODEN, schleife=SCHLEIFE_ENDE),
}

def main():
    if not QUELLE.is_dir():
        sys.exit(f"Endfassung fehlt: {QUELLE}")
    jar = QUELLE / "+libs" / JAR
    stufen = dict(STUFEN)
    # Die letzte Stufe ist die Endfassung selbst.
    fehler = 0
    for name, dateien in stufen.items():
        ziel = ARCHIVE / name
        shutil.rmtree(ziel, ignore_errors=True)
        (ziel / "+libs").mkdir(parents=True)
        shutil.copy2(jar, ziel / "+libs" / JAR)
        for datei, inhalt in dateien.items():
            (ziel / datei).write_text(inhalt, encoding="utf-8")
        with tempfile.TemporaryDirectory() as out:
            r = subprocess.run(["javac", "-nowarn", "-d", out, "-classpath", str(ziel / "+libs" / JAR)]
                               + [str(p) for p in ziel.glob("*.java")],
                               capture_output=True, text=True)
        if r.returncode:
            fehler += 1
            print(f"[FEHLER] {name}\n" + "\n".join(r.stderr.splitlines()[:5]))
        else:
            print(f"[ok] {name} ({len(dateien)} Dateien)")
    return fehler

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
