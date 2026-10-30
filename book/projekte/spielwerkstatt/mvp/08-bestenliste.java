void main() {
   Bestenliste liste = new Bestenliste();
   liste.eintragen(25);
   liste.eintragen(18);
   liste.eintragen(31);
   liste.eintragen(21);
   liste.eintragen(19);
   liste.eintragen(17);
   liste.anzeigen();
}

class Bestenliste {
   private double[] zeiten = new double[5];
   private int anzahl = 0;

   public void eintragen(double pZeit) {
      // Bei voller Liste bleibt Index 5 unbenutzt: Es gibt nur 0 bis 4.
      int i = Math.min(anzahl, zeiten.length - 1);
      if (anzahl == zeiten.length && pZeit >= zeiten[i]) return;
      while (i > 0 && zeiten[i - 1] > pZeit) {
         zeiten[i] = zeiten[i - 1];
         i--;
      }
      zeiten[i] = pZeit;
      if (anzahl < zeiten.length) anzahl++;
   }

   public void anzeigen() {
      for (int i = 0; i < anzahl; i++) IO.println(i + 1 + ". Platz: " + zeiten[i]);
   }
}
