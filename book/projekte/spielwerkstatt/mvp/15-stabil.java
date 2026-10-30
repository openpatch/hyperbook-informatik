void main() {
   Inventar inventar = new Inventar();
   inventar.start();
}

class Fund {
   public String art;
   public int wert;

   public Fund(String pArt, int pWert) {
      art = pArt;
      wert = pWert;
   }
}

class Inventar {
   private Fund[] daten = {
      new Fund("Waffe", 50),
      new Fund("Trank", 20),
      new Fund("Waffe", 10),
      new Fund("Trank", 5)
   };

   public void start() {
      this.sortiere(0, daten.length, false); // Zuerst nach Wert.
      this.sortiere(0, daten.length, true); // Dann stabil nach Art.
      for (int i = 0; i < daten.length; i++) IO.println(daten[i].art + ": " + daten[i].wert);
   }

   private boolean linksZuerst(Fund a, Fund b, boolean pNachArt) {
      if (pNachArt) return a.art.compareTo(b.art) <= 0;
      return a.wert <= b.wert;
   }

   private void sortiere(int von, int bis, boolean pNachArt) {
      if (bis - von < 2) return;
      int mitte = (von + bis) / 2;
      this.sortiere(von, mitte, pNachArt);
      this.sortiere(mitte, bis, pNachArt);
      Fund[] hilfe = new Fund[bis - von];
      int i = von;
      int j = mitte;
      for (int k = 0; k < hilfe.length; k++) {
         if (i < mitte && (j >= bis || this.linksZuerst(daten[i], daten[j], pNachArt))) {
            hilfe[k] = daten[i];
            i++;
         } else {
            hilfe[k] = daten[j];
            j++;
         }
      }
      for (int k = 0; k < hilfe.length; k++) daten[von + k] = hilfe[k];
   }
}
