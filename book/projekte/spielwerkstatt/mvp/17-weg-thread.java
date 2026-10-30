void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private String[] plan = { "#########", "#...#..M#", "#...#...#", "#.......#", "#########" };
   private Wegsuche suche;
   private Sprite gegner;
   private int[] weg = null;
   private int schritt = 0;
   private int bilder = 0;
   private Text anzeige;

   public Beispiel() {
      this.karte(plan);
      gegner = this.figur("gemRed", -72, 24, 12);
      suche = new Wegsuche(plan);
      anzeige = this.text("Suche läuft; Gegner wartet mit alter Bewegung", 150);
      new Thread(suche).start();
   }

   public void run() {
      bilder++;
      if (weg == null) {
         gegner.turnRight(4); // Der bisherige Ablauf bleibt aktiv.
         weg = suche.hole();
         if (weg != null) anzeige.showText("Fertiger Weg übernommen");
      } else if (schritt < weg.length && bilder % 20 == 0) {
         int z = weg[schritt] / 9;
         int s = weg[schritt] % 9;
         gegner.setPosition((s - 4) * 24, (2 - z) * 24);
         schritt++;
      }
   }
}

class Wegsuche implements Runnable {
   private String[] plan;
   private boolean[][] besucht = new boolean[5][9];
   private int[] spur = new int[45];
   private int[] ergebnis = null;
   private Semaphore schloss = new Semaphore(1);

   public Wegsuche(String[] pPlan) {
      plan = new String[pPlan.length];
      for (int z = 0; z < pPlan.length; z++) plan[z] = pPlan[z];
   }

   public int[] hole() {
      schloss.acquire();
      int[] w = ergebnis;
      schloss.release();
      return w;
   }

   public void run() {
      int laenge = this.suche(1, 1, 0);
      int[] fertig = new int[laenge];
      for (int i = 0; i < laenge; i++) fertig[i] = spur[i];
      schloss.acquire();
      ergebnis = fertig;
      schloss.release();
   }

   private int suche(int z, int s, int tiefe) {
      if (z < 0 || z >= 5 || s < 0 || s >= 9 || plan[z].charAt(s) == '#' || besucht[z][s]) return 0;
      besucht[z][s] = true;
      spur[tiefe] = z * 9 + s;
      Thread.sleep(100); // Beobachtbare Rechenzeit im Beispiel.
      if (plan[z].charAt(s) == 'M') return tiefe + 1;
      int n = this.suche(z - 1, s, tiefe + 1);
      if (n > 0) return n;
      n = this.suche(z + 1, s, tiefe + 1);
      if (n > 0) return n;
      n = this.suche(z, s - 1, tiefe + 1);
      if (n > 0) return n;
      return this.suche(z, s + 1, tiefe + 1);
   }
}
