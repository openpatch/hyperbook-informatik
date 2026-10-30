void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private String[] plan = { "#########", "#...#..M#", "#.#.#.#.#", "#.#...#.#", "#.......#", "#########" };
   private boolean[][] besucht = new boolean[6][9];
   private boolean[][] weg = new boolean[6][9];

   public Beispiel() {
      boolean gefunden = this.suche(1, 1);
      String[] bild = new String[plan.length];
      for (int z = 0; z < plan.length; z++) {
         bild[z] = "";
         for (int s = 0; s < plan[z].length(); s++) {
            if (weg[z][s] && plan[z].charAt(s) != 'M') bild[z] += "+";
            else bild[z] += plan[z].charAt(s);
         }
      }
      this.karte(bild);
      this.text("Weg gefunden: " + gefunden, 140);
   }

   private boolean suche(int z, int s) {
      if (z < 0 || z >= plan.length || s < 0 || s >= plan[z].length()) return false;
      if (plan[z].charAt(s) == '#' || besucht[z][s]) return false;
      besucht[z][s] = true;
      weg[z][s] = true;
      if (plan[z].charAt(s) == 'M') return true;
      if (
         this.suche(z - 1, s) || this.suche(z + 1, s) || this.suche(z, s - 1) || this.suche(z, s + 1)
      ) return true;
      weg[z][s] = false;
      return false;
   }
}
