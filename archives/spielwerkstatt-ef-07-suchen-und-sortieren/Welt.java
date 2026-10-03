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
   /// Die besten Zeiten in Sekunden, aufsteigend sortiert. Nur die ersten anzahlBestzeiten Stellen zählen.
   private double[] bestzeiten = new double[5];
   private int anzahlBestzeiten = 0;
   /// Die Anzeige der Bestenliste.
   private Text bestenliste;
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
            } else if (zeichen == 'G') {
               this.setze(new Gegner(), x, y);
            } else if (zeichen == 'S') {
               startX = x;
               startY = y;
               held.setPosition(x, y);
            }
         }
      }

      this.verteileMuenzen();

      anzeige = new Text("", 0, 200, 700);
      anzeige.setTextSize(20);
      anzeige.setTextColor(255, 255, 255);
      this.add(anzeige);

      bestenliste = new Text("", 290, 140, 160);
      bestenliste.setTextSize(16);
      bestenliste.setTextColor(255, 255, 255);
      this.add(bestenliste);

      this.add(held);
   }

   /// Legt auf jedes M im Plan eine Münze und zählt sie.
   private void verteileMuenzen() {
      anzahlMuenzen = 0;
      for (int z = 0; z < plan.length; z++) {
         for (int s = 0; s < plan[z].length(); s++) {
            if (plan[z].charAt(s) == 'M') {
               this.setze(new Muenze(), this.zuX(s), this.zuY(z));
               anzahlMuenzen = anzahlMuenzen + 1;
            }
         }
      }
   }

   /// Beginnt eine neue Runde: alle Münzen zurück, Zeit und Leben voll, Spieler an den Start.
   private void neueRunde() {
      this.remove(Muenze.class);
      this.verteileMuenzen();
      punkte = 0;
      leben = 3;
      zeit = 30;
      laeuft = true;
      held.setPosition(startX, startY);
      held.setTempo(3);
   }

   /// Sortiert pSekunden in die Bestenliste ein, wie beim Sortieren durch Einfügen:
   /// Alle langsameren Zeiten rücken eine Stelle nach hinten. Ist die Liste voll, fällt die letzte heraus.
   private void trageEin(double pSekunden) {
      int i = anzahlBestzeiten;
      if (i == bestzeiten.length) {
         i = i - 1;
         if (bestzeiten[i] <= pSekunden) {
            return;   // langsamer als alle in der vollen Liste
         }
      } else {
         anzahlBestzeiten = anzahlBestzeiten + 1;
      }
      while (i > 0 && bestzeiten[i - 1] > pSekunden) {
         bestzeiten[i] = bestzeiten[i - 1];
         i = i - 1;
      }
      bestzeiten[i] = pSekunden;
   }

   /// Zeigt die Bestenliste an, eine Zeit je Zeile.
   private void zeigeBestenliste() {
      String text = "Bestzeiten";
      for (int i = 0; i < anzahlBestzeiten; i++) {
         text = text + "\n" + (i + 1) + ". " + (int) bestzeiten[i] + " s";
      }
      bestenliste.showText(text);
   }

   /// Mit der Leertaste beginnt nach dem Ende eine neue Runde.
   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE && !laeuft) {
         this.neueRunde();
      }
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
            this.beende("Kein Leben mehr! " + punkte + " von " + anzahlMuenzen + " Münzen. Leertaste: neue Runde");
         }
      }
   }

   /// Wird immer wieder ausgeführt, etwa 60-mal in der Sekunde.
   public void run() {
      if (laeuft) {
         zeit = zeit - 1.0 / 60;

         if (this.istGewonnen()) {
            this.trageEin(30 - zeit);
            this.zeigeBestenliste();
            this.beende("Gewonnen in " + (int) (30 - zeit) + " Sekunden! Leertaste: neue Runde");
         } else if (zeit <= 0) {
            this.beende("Die Zeit ist um! " + punkte + " von " + anzahlMuenzen + " Münzen. Leertaste: neue Runde");
         } else {
            anzeige.showText("Münzen: " + punkte + " von " + anzahlMuenzen + "   Leben: " + leben + "   Zeit: " + (int) zeit);
         }
      }
   }
}
