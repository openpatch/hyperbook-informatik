import org.openpatch.scratch.*;

/// Deine Spielwelt. Hier stellst du alles auf, was im Spiel vorkommt.
public class Welt extends Spielwelt {

   /// So viele Münzen hat der Spieler schon eingesammelt.
   private int punkte = 0;
   /// So viele Münzen kann der Spieler erreichen.
   private int anzahlMuenzen = 0;
   /// So viele Münzen liegen hinter Mauern, an die niemand herankommt.
   private int unerreichbar = 0;
   /// So oft darf ein Gegner den Spieler noch erwischen.
   private int leben = 3;
   /// Hier steht der Spieler am Anfang und nach jedem Treffer.
   private double startX;
   private double startY;
   private int startZeile;
   private int startSpalte;
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

   /// Meldungen, die noch gezeigt werden sollen - in der Reihenfolge, in der sie kamen.
   private Queue<String> meldungen = new Queue<String>();
   /// Die Zeile am unteren Rand, in der die Meldungen erscheinen.
   private Text meldungszeile;
   /// So viele Bilder lang bleibt die aktuelle Meldung noch stehen.
   private int restBilder = 0;

   /// Die Plätze, an denen der Spieler war. Oben liegt der jüngste.
   private Stack<Platz> spur = new Stack<Platz>();
   /// Zählt die Bilder, damit nur alle 15 Bilder ein Platz auf die Spur kommt.
   private int bildZaehler = 0;
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
      "#..X......G..###",
      "#..M..B....M.#M#",
      "#..G......M.H###",
      "################"
   };

   /// true für jedes Feld, das der Spieler vom Start aus erreichen kann.
   private boolean[][] erreichbar = new boolean[plan.length][plan[0].length()];

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
               startZeile = z;
               startSpalte = s;
               held.setPosition(x, y);
            }
         }
      }

      this.markiere(startZeile, startSpalte);
      this.verteileGegenstaende();

      anzeige = new Text("", 0, 200, 700);
      anzeige.setTextSize(20);
      anzeige.setTextColor(255, 255, 255);
      this.add(anzeige);

      meldungszeile = new Text("", 0, -200, 700);
      meldungszeile.setTextSize(18);
      meldungszeile.setTextColor(255, 255, 255);
      this.add(meldungszeile);

      this.melde("Sammle alle Münzen, die du erreichen kannst!");
      if (unerreichbar > 0) {
         this.melde(unerreichbar + " Münzen liegen hinter Mauern. Lass sie liegen.");
      }
      this.melde("Mit R gehst du deine Spur zurück.");

      bestenliste = new Text("", 290, 140, 160);
      bestenliste.setTextSize(16);
      bestenliste.setTextColor(255, 255, 255);
      this.add(bestenliste);

      this.add(held);
   }

   /// Legt auf jedes M im Plan eine Münze und auf jedes H ein Herz und zählt die Münzen.
   private void verteileGegenstaende() {
      anzahlMuenzen = 0;
      unerreichbar = 0;
      for (int z = 0; z < plan.length; z++) {
         for (int s = 0; s < plan[z].length(); s++) {
            char zeichen = plan[z].charAt(s);
            if (zeichen == 'M') {
               Muenze m = new Muenze();
               this.setzeGegenstand(m, z, s);
               if (erreichbar[z][s]) {
                  anzahlMuenzen = anzahlMuenzen + 1;
               } else {
                  // Unerreichbare Münzen sind blass und zählen nicht mit.
                  m.setTransparency(70);
                  unerreichbar = unerreichbar + 1;
               }
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
      spur = new Stack<Platz>();
   }

   /// Stellt eine Meldung hinten an. Gezeigt wird sie erst, wenn alle früheren durch sind.
   public void melde(String pText) {
      meldungen.enqueue(pText);
   }

   /// Zeigt die vorderste Meldung etwa zwei Sekunden lang, dann die nächste.
   private void zeigeMeldungen() {
      if (restBilder > 0) {
         restBilder = restBilder - 1;
      } else if (!meldungen.isEmpty()) {
         meldungszeile.showText(meldungen.front());
         meldungen.dequeue();
         restBilder = 120;
      } else {
         meldungszeile.showText("");
      }
   }

   /// Legt alle 15 Bilder den aktuellen Platz des Spielers auf die Spur.
   private void merkeSpur() {
      bildZaehler = bildZaehler + 1;
      if (bildZaehler == 15) {
         bildZaehler = 0;
         spur.push(new Platz(held.getX(), held.getY()));
      }
   }

   /// Setzt den Spieler auf den jüngsten Platz der Spur zurück und nimmt ihn von der Spur.
   private void geheZurueck() {
      if (!spur.isEmpty()) {
         Platz p = spur.top();
         spur.pop();
         held.setPosition(p.getX(), p.getY());
      }
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
      } else if (pTaste == KeyCode.R && laeuft) {
         this.geheZurueck();
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

   /// Markiert das Feld in Zeile pZeile und Spalte pSpalte als erreichbar
   /// und von dort aus alle Nachbarfelder, die keine Mauer sind (Flutfüllung).
   private void markiere(int pZeile, int pSpalte) {
      // Basisfälle: außerhalb des Plans, eine Mauer, oder schon markiert.
      if (pZeile < 0 || pZeile >= plan.length || pSpalte < 0 || pSpalte >= plan[pZeile].length()) {
         return;
      }
      if (this.istMauer(plan[pZeile].charAt(pSpalte)) || erreichbar[pZeile][pSpalte]) {
         return;
      }
      erreichbar[pZeile][pSpalte] = true;
      this.markiere(pZeile - 1, pSpalte);
      this.markiere(pZeile + 1, pSpalte);
      this.markiere(pZeile, pSpalte - 1);
      this.markiere(pZeile, pSpalte + 1);
   }

   /// Liefert true, wenn pZeichen im Plan für etwas steht, durch das man nicht hindurchkommt.
   private boolean istMauer(char pZeichen) {
      return pZeichen == '#' || pZeichen == 'B' || pZeichen == 'T' || pZeichen == 'F';
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
      if (punkte * 2 == anzahlMuenzen || punkte * 2 == anzahlMuenzen + 1) {
         this.melde("Die Hälfte ist geschafft!");
      }
   }

   /// Ein Herz gibt ein Leben zurück, höchstens bis fünf.
   public void heile() {
      if (leben < 5) {
         leben = leben + 1;
         this.melde("Ein Leben mehr!");
      } else {
         this.melde("Mehr als fünf Leben gehen nicht.");
      }
   }

   /// Ein Gegner oder eine Falle hat den Spieler erwischt: ein Leben weniger, zurück zum Start.
   public void verletze() {
      if (laeuft) {
         leben = leben - 1;
         held.setPosition(startX, startY);
         // Die alte Spur führt nicht mehr vom Start weg, sie wird verworfen.
         spur = new Stack<Platz>();
         this.melde("Autsch! Zurück zum Start.");
         if (leben == 0) {
            this.beende("Kein Leben mehr! " + punkte + " von " + anzahlMuenzen + " Münzen. Leertaste: neue Runde");
         }
      }
   }

   /// Wird immer wieder ausgeführt, etwa 60-mal in der Sekunde.
   public void run() {
      this.zeigeMeldungen();
      if (laeuft) {
         this.merkeSpur();
         zeit = zeit - 1.0 / 60;
         this.meldeNachbarn();

         if (this.istGewonnen()) {
            this.trageEin(30 - zeit);
            this.zeigeBestenliste();
            this.beende("Gewonnen in " + (int) (30 - zeit) + " Sekunden! Leertaste: neue Runde");
         } else if (zeit <= 0) {
            this.beende("Die Zeit ist um! " + punkte + " von " + anzahlMuenzen + " Münzen. Leertaste: neue Runde");
         } else {
            anzeige.showText("Münzen: " + punkte + " von " + anzahlMuenzen + " (" + unerreichbar + " unerreichbar)   Leben: " + leben + "   Zeit: " + (int) zeit);
         }
      }
   }
}
