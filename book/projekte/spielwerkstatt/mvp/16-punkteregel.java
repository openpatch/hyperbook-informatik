void main() {
   Punkteregel regel = new Punkteregel();
   for (int i = 1; i <= 6; i++) {
      regel.treffer(10);
      IO.println("Kombo " + regel.getKombo() + ": " + regel.getPunkte() + " Punkte");
   }
   regel.fehler();
   regel.treffer(10);
   IO.println("Nach Fehler: Kombo " + regel.getKombo() + ", Punkte " + regel.getPunkte());
}

class Punkteregel {
   private int kombo = 0;
   private int punkte = 0;

   public void treffer(int pGrundwert) {
      kombo++;
      int faktor = 1;
      if (kombo >= 6) faktor = 3;
      else if (kombo >= 3) faktor = 2;
      punkte += pGrundwert * faktor;
   }

   public void fehler() {
      kombo = 0;
   }

   public int getPunkte() {
      return punkte;
   }

   public int getKombo() {
      return kombo;
   }
}
