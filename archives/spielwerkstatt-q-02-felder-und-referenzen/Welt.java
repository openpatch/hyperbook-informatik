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
   /// `#` Stein, `B` Baum, `T` Tanne, `F` Fels, `M` Münze, `H` Herz, `X` Falle,
   /// `G` Schleim, `V` Fledermaus, `S` Start, `.` Wiese
   private String[] plan = {
      "################",
      "#S.....M.......#",
      "#..B.......F...#",
      "#......M.....V.#",
      "#.M.....T....M.#",
      "#..X......G....#",
      "#..M..B....M.H.#",
      "#..G......M....#",
      "################"
   };

   /// Was auf welchem Feld liegt. Ein leeres Feld enthält null.
   /// Das Gitter und die Bühne verweisen auf dieselben Objekte.
   private Gegenstand[][] gegenstaende = new Gegenstand[plan.length][plan[0].length()];

   public Welt() {
      this.addSound("muenze", "assets/audio/sounds/bonus/coin.ogg");
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
            } else if (zeichen == 'X') {
               this.setzeGegenstand(new Falle(), z, s);
            } else if (zeichen == 'G') {
               this.setze(new Schleim(), x, y);
            } else if (zeichen == 'V') {
               this.setze(new Fledermaus(), x, y);
            } else if (zeichen == 'S') {
               startX = x;
               startY = y;
               held.setPosition(x, y);
            }
         }
      }

      this.verteileGegenstaende();

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

   /// Legt auf jedes M im Plan eine Münze und auf jedes H ein Herz und zählt die Münzen.
   private void verteileGegenstaende() {
      anzahlMuenzen = 0;
      for (int z = 0; z < plan.length; z++) {
         for (int s = 0; s < plan[z].length(); s++) {
            char zeichen = plan[z].charAt(s);
            if (zeichen == 'M') {
               this.setzeGegenstand(new Muenze(), z, s);
               anzahlMuenzen = anzahlMuenzen + 1;
            } else if (zeichen == 'H') {
               this.setzeGegenstand(new Herz(), z, s);
            }
         }
      }
   }

   /// Beginnt eine neue Runde: alle Münzen zurück, Zeit und Leben voll, Spieler an den Start.
   private void neueRunde() {
      this.remove(Muenze.class);
      this.remove(Herz.class);
      this.verteileGegenstaende();
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

   /// Die Spalte, in der die x-Koordinate pX liegt.
   private int zuSpalte(double pX) {
      return (int) Math.round((pX + 360) / 48);
   }

   /// Die Zeile, in der die y-Koordinate pY liegt.
   private int zuZeile(double pY) {
      return (int) Math.round((192 - pY) / 48);
   }

   /// Legt pGegenstand auf das Feld in Zeile pZeile und Spalte pSpalte: auf die Bühne und ins Gitter.
   private void setzeGegenstand(Gegenstand pGegenstand, int pZeile, int pSpalte) {
      pGegenstand.setFeld(pZeile, pSpalte);
      gegenstaende[pZeile][pSpalte] = pGegenstand;
      this.setze(pGegenstand, this.zuX(pSpalte), this.zuY(pZeile));
   }

   /// Nimmt pGegenstand von der Bühne und aus dem Gitter.
   /// Fehlt die zweite Zeile, steht im Gitter weiter ein Verweis auf ein Objekt, das man nicht mehr sieht.
   public void entferne(Gegenstand pGegenstand) {
      pGegenstand.remove();
      gegenstaende[pGegenstand.getZeile()][pGegenstand.getSpalte()] = null;
   }

   /// Sagt allen Gegenständen auf den acht Nachbarfeldern des Spielers Bescheid.
   private void meldeNachbarn() {
      int zeile = this.zuZeile(held.getY());
      int spalte = this.zuSpalte(held.getX());
      for (int z = zeile - 1; z <= zeile + 1; z++) {
         for (int s = spalte - 1; s <= spalte + 1; s++) {
            boolean imGitter = z >= 0 && z < gegenstaende.length && s >= 0 && s < gegenstaende[z].length;
            if (imGitter && gegenstaende[z][s] != null) {
               gegenstaende[z][s].inDerNaehe();
            }
         }
      }
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

   /// Eine Münze meldet, dass sie eingesammelt wurde.
   public void muenzeEingesammelt() {
      punkte = punkte + 1;
      this.playSound("muenze");
   }

   /// Ein Herz gibt ein Leben zurück, höchstens bis fünf.
   public void heile() {
      if (leben < 5) {
         leben = leben + 1;
      }
   }

   /// Ein Gegner oder eine Falle hat den Spieler erwischt: ein Leben weniger, zurück zum Start.
   public void verletze() {
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
         this.meldeNachbarn();

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
