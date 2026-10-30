void main() {
   for (int n = 10; n <= 1000; n = n * 10) {
      int[] werte = new int[n];
      for (int i = 0; i < n; i++) werte[i] = n - i;
      int vergleiche = 0;
      for (int ende = n - 1; ende > 0; ende--) {
         for (int i = 0; i < ende; i++) {
            vergleiche++;
            if (werte[i] > werte[i + 1]) {
               int t = werte[i];
               werte[i] = werte[i + 1];
               werte[i + 1] = t;
            }
         }
      }
      IO.println(n + " Werte: " + vergleiche + " Vergleiche/Bild, " + vergleiche * 60 + "/Sekunde");
   }
}
