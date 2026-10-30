void main() {
   Rangliste liste = new Rangliste();
   liste.start();
}

class Rangliste {
   private int[] punkte = new int[200];

   public void start() {
      for (int i = 0; i < punkte.length; i++) punkte[i] = (int) (Math.random() * 10000);
      this.quicksort(0, punkte.length - 1);
      for (int i = punkte.length - 1; i >= punkte.length - 10; i--) IO.println(punkte[i]);
   }

   private void quicksort(int links, int rechts) {
      if (links >= rechts) return;
      int i = links;
      int j = rechts;
      int pivot = punkte[(links + rechts) / 2];
      while (i <= j) {
         while (punkte[i] < pivot) i++;
         while (punkte[j] > pivot) j--;
         if (i <= j) {
            int t = punkte[i];
            punkte[i] = punkte[j];
            punkte[j] = t;
            i++;
            j--;
         }
      }
      if (links < j) this.quicksort(links, j);
      if (i < rechts) this.quicksort(i, rechts);
   }
}
