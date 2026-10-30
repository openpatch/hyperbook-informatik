import org.openpatch.scratch.*;

/// Deine Spielwelt. Hier stellst du alles auf, was im Spiel vorkommt.
public class Welt extends Spielwelt {

   /// So viele Münzen hat der Spieler schon eingesammelt.
   private int punkte = 0;
   /// So viele Münzen liegen insgesamt in der Welt.
   private int anzahlMuenzen = 0;
   /// So oft darf ein Gegner den Spieler noch erwischen.
   private int leben = 3;
   /// Hier steht der Spieler am Anfang und nach jedem Treffer.
   private double startX;
   private double startY;
   /// So viele Sekunden bleiben noch.
   private double zeit = 30;
   /// Solange das true ist, läuft das Spiel noch.
   private boolean laeuft = true;
   /// Die Anzeige oben links.
   private Text anzeige;
   /// Die Spielfigur. Sie ist eine Variable der Welt, damit run() sie anhalten kann.
   private Spieler held;

   /// Der Plan der Welt: jede Zeichenkette eine Zeile, jedes Zeichen ein Feld von 48 × 48 Pixeln.
   /// `#` Stein, `B` Baum, `T` Tanne, `F` Fels, `M` Münze, `G` Gegner, `S` Start, `.` Wiese
   private String[] plan = {
      "################",
      "#S.....M.......#",
      "#..B.......F...#",
      "#......M.......#",
      "#.M.....T....M.#",
      "#.........G....#",
      "#..M..B....M...#",
      "#..G......M....#",
      "################"
   };

   public Welt() {
      held = new Spieler("boy");

      for (int z = 0; z < plan.length; z++) {
         for (int s = 0; s < plan[z].length(); s++) {
            char zeichen = plan[z].charAt(s);
            double x = this.zuX(s);
            double y = this.zuY(z);
            if (zeichen == '#') {
               this.setze(new Stein(), x, y);
            } else if (zeichen == 'B') {
               this.setze(new Pflanze(0, 0), x, y);
            } else if (zeichen == 'T') {
               this.setze(new Pflanze(32, 0), x, y);
            } else if (zeichen == 'F') {
               this.setze(new Pflanze(256, 128), x, y);
            } else if (zeichen == 'M') {
               this.setze(new Muenze(), x, y);
               anzahlMuenzen = anzahlMuenzen + 1;
            } else if (zeichen == 'G') {
               this.setze(new Gegner(), x, y);
            } else if (zeichen == 'S') {
               startX = x;
               startY = y;
               held.setPosition(x, y);
            }
         }
      }

      anzeige = new Text("", 0, 200, 700);
      anzeige.setTextSize(20);
      anzeige.setTextColor(255, 255, 255);
      this.add(anzeige);

      this.add(held);
   }

   /// Die x-Koordinate der Mitte von Spalte pSpalte. Spalte 0 liegt ganz links.
   private double zuX(int pSpalte) {
      return -360 + pSpalte * 48;
   }

   /// Die y-Koordinate der Mitte von Zeile pZeile. Zeile 0 liegt ganz oben.
   private double zuY(int pZeile) {
      return 192 - pZeile * 48;
   }

   /// Stellt pFigur an die Stelle (pX, pY) auf die Bühne.
   private void setze(Sprite pFigur, double pX, double pY) {
      pFigur.setPosition(pX, pY);
      this.add(pFigur);
   }

   /// Liefert true, wenn alle Münzen eingesammelt sind.
   private boolean istGewonnen() {
      return punkte == anzahlMuenzen;
   }

   /// Hält das Spiel an und zeigt pMeldung an.
   private void beende(String pMeldung) {
      laeuft = false;
      held.setTempo(0);
      anzeige.showText(pMeldung);
   }

   /// Wird jedes Mal ausgeführt, wenn der Spieler eine Münze einsammelt.
   public void wennMuenzeEingesammelt() {
      punkte = punkte + 1;
   }

   /// Wird jedes Mal ausgeführt, wenn ein Gegner den Spieler berührt.
   public void wennGegnerBeruehrt() {
      if (laeuft) {
         leben = leben - 1;
         held.setPosition(startX, startY);
         if (leben == 0) {
            this.beende("Kein Leben mehr! " + punkte + " von " + anzahlMuenzen + " Münzen.");
         }
      }
   }

   /// Wird immer wieder ausgeführt, etwa 60-mal in der Sekunde.
   public void run() {
      if (laeuft) {
         zeit = zeit - 1.0 / 60;

         if (this.istGewonnen()) {
            this.beende("Gewonnen! Noch " + (int) zeit + " Sekunden übrig.");
         } else if (zeit <= 0) {
            this.beende("Die Zeit ist um! " + punkte + " von " + anzahlMuenzen + " Münzen.");
         } else {
            anzeige.showText("Münzen: " + punkte + " von " + anzahlMuenzen + "   Leben: " + leben + "   Zeit: " + (int) zeit);
         }
      }
   }
}
