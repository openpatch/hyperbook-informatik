void main() {
   Messung m = new Messung();
   m.sortiere(new int[] { 1, 2, 3, 5, 4, 6 }, "Fast sortiert");
   m.sortiere(new int[] { 6, 5, 4, 3, 2, 1 }, "Umgekehrt");
}

class Messung {
   public void sortiere(int[] daten, String pName) {
      int vergleiche = 0;
      for (int i = 1; i < daten.length; i++) {
         int aktuell = daten[i];
         int j = i;
         while (j > 0) {
            vergleiche++;
            if (daten[j - 1] <= aktuell) break;
            daten[j] = daten[j - 1];
            j--;
         }
         daten[j] = aktuell;
      }
      IO.println(pName + ": " + vergleiche + " Vergleiche/Bild");
   }
}
