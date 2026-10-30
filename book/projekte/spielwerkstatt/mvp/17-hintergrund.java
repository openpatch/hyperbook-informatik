void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Uebergabe uebergabe = new Uebergabe();
   private Sprite muenze;
   private boolean eingebaut = false;

   public Beispiel() {
      muenze = this.figur("coin_gold", 0, 0, 80);
      this.text("Level wird im Hintergrund berechnet …", 140);
      new Thread(new Erzeuger(uebergabe)).start();
   }

   public void run() {
      if (!eingebaut) {
         muenze.turnRight(6);
         String[] plan = uebergabe.hole();
         if (plan != null) {
            eingebaut = true;
            this.removeAll();
            this.karte(plan);
            this.text("Fertig! Erst jetzt wird die Bühne aufgebaut.", 150);
         }
      }
   }
}

class Uebergabe {
   private Semaphore schloss = new Semaphore(1);
   private String[] ergebnis = null;

   public void liefere(String[] pPlan) {
      schloss.acquire();
      ergebnis = pPlan;
      schloss.release();
   }

   public String[] hole() {
      schloss.acquire();
      String[] fertig = ergebnis;
      schloss.release();
      return fertig;
   }
}

class Erzeuger implements Runnable {
   private Uebergabe ziel;

   public Erzeuger(Uebergabe pZiel) {
      ziel = pZiel;
   }

   public void run() {
      String[] plan = new String[9];
      for (int z = 0; z < 9; z++) {
         plan[z] = "";
         for (int s = 0; s < 15; s++) {
            if (z == 0 || z == 8 || s == 0 || s == 14 || (z % 2 == 0 && s % 3 == 0)) plan[z] += "#";
            else plan[z] += ".";
         }
         Thread.sleep(150); // Nur damit man den Ladevorgang beobachten kann.
      }
      ziel.liefere(plan); // Danach verändert der Thread das Feld nicht mehr.
   }
}
