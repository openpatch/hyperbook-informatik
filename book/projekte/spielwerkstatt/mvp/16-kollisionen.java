void main() {
   for (int n : new int[] { 5, 50, 200 }) {
      int alle = 0;
      int nachbarn = 0;
      for (int i = 0; i < n; i++) {
         for (int j = 0; j < n; j++) if (i != j) alle++;
         // Modell: pro Figur genau neun Gitterzellen, je höchstens ein Kandidat.
         for (int z = -1; z <= 1; z++) {
            for (int s = -1; s <= 1; s++) nachbarn++;
         }
      }
      IO.println(n + " Figuren: alle " + alle + ", Nachbarzellen " + nachbarn);
   }
}
