import org.openpatch.scratch.*;

/// Ein Raum der Spielwelt. Wie er aussieht, steht im Plan: ein Zeichen je Kachel.
public class Welt extends Stage {

   /// So viele Kacheln liegen nebeneinander.
   public static final int SPALTEN = 16;
   /// So viele Kacheln liegen untereinander.
   public static final int ZEILEN = 9;
   /// So viele Pixel ist eine Kachel auf der Bühne breit und hoch.
   public static final int KACHEL = 48;

   /// `#` Stein, `.` Gras, `K` Kiste, `M` Münze, `S` Startplatz
   private static final String[] PLAN = {
      "################",
      "#......M.......#",
      "#..S...........#",
      "#.....##...M...#",
      "#..M..##.......#",
      "#.........K....#",
      "#....M......M..#",
      "#..............#",
      "################"
   };

   private Text anzeige;
   private int punkte = 0;

   /// Meldungen, die noch gezeigt werden sollen - in der Reihenfolge, in der sie kamen.
   private Queue<String> meldungen = new Queue<String>();
   private Text meldungszeile;
   /// So viele Bilder lang bleibt die aktuelle Meldung noch stehen.
   private int restBilder = 0;

   public Welt() {
      this.addSound("muenze", "assets/audio/sounds/bonus/coin.ogg");

      Spieler spieler = new Spieler(this);
      // Erst der Boden: Unter allem liegt Gras. Was später hinzukommt,
      // liegt oben - so verschwindet nichts unter dem Boden.
      for (int z = 0; z < ZEILEN; z++) {
         for (int s = 0; s < SPALTEN; s++) {
            this.setze(new Gras(), s, z);
         }
      }
      // Dann alles, was darauf steht.
      for (int z = 0; z < ZEILEN; z++) {
         for (int s = 0; s < SPALTEN; s++) {
            char zeichen = PLAN[z].charAt(s);
            if (zeichen == '#') {
               this.setze(new Stein(), s, z);
            } else if (zeichen == 'K') {
               this.setze(new Kiste(), s, z);
            } else if (zeichen == 'M') {
               this.setze(new Muenze(), s, z);
            } else if (zeichen == 'S') {
               spieler.setPosition(zuX(s), zuY(z));
            }
         }
      }
      // Der Spieler kommt zuletzt, damit er über allem läuft.
      this.add(spieler);

      anzeige = new Text("", 0, 196, 600);
      anzeige.setTextSize(20);
      anzeige.setTextColor(255, 255, 255);
      anzeige.setStrokeColor(0, 0, 0);
      this.add(anzeige);
      this.zeigePunkte();

      meldungszeile = new Text("", 0, -196, 700);
      meldungszeile.setTextSize(20);
      meldungszeile.setTextColor(255, 255, 255);
      meldungszeile.setStrokeColor(0, 0, 0);
      this.add(meldungszeile);

      this.melde("Willkommen in der Spielwerkstatt!");
      this.melde("Sammle alle Münzen ein.");
   }

   /// Reiht eine Meldung hinten ein. Sie kommt dran, wenn alle vor ihr gezeigt wurden.
   public void melde(String pText) {
      meldungen.enqueue(pText);
   }

   public void run() {
      if (restBilder > 0) {
         restBilder = restBilder - 1;
      } else if (!meldungen.isEmpty()) {
         meldungszeile.showText(meldungen.front());
         meldungen.dequeue();
         restBilder = 120;   // etwa zwei Sekunden
      } else {
         meldungszeile.showText("");
      }
   }

   /// Legt eine Figur auf die Kachel in Spalte pSpalte und Zeile pZeile.
   public void setze(Sprite pFigur, int pSpalte, int pZeile) {
      pFigur.setPosition(zuX(pSpalte), zuY(pZeile));
      this.add(pFigur);
   }

   /// Die x-Koordinate der Mitte einer Spalte. Spalte 0 liegt ganz links.
   public static double zuX(int pSpalte) {
      return -SPALTEN * KACHEL / 2 + KACHEL / 2 + pSpalte * KACHEL;
   }

   /// Die y-Koordinate der Mitte einer Zeile. Zeile 0 liegt ganz oben.
   public static double zuY(int pZeile) {
      return ZEILEN * KACHEL / 2 - KACHEL / 2 - pZeile * KACHEL;
   }

   /// Zählt eine eingesammelte Münze.
   public void punkten() {
      punkte = punkte + 1;
      this.playSound("muenze");
      this.zeigePunkte();
      this.melde("Eine Münze! Jetzt hast du " + punkte + ".");
      if (this.count(Muenze.class) == 0) {
         this.melde("Alle Münzen gefunden!");
      }
   }

   private void zeigePunkte() {
      anzeige.showText("Münzen: " + punkte);
   }
}
