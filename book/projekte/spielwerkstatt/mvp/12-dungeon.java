void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private char[][] plan = new char[9][15];

   public Beispiel() {
      for (int z = 0; z < 9; z++) {
         for (int s = 0; s < 15; s++) {
            if (z == 0 || z == 8 || s == 0 || s == 14) plan[z][s] = '#';
            else plan[z][s] = '.';
         }
      }
      this.teile(1, 1, 13, 7);
      String[] bild = new String[9];
      for (int z = 0; z < 9; z++) {
         bild[z] = "";
         for (int s = 0; s < 15; s++) bild[z] += plan[z][s];
      }
      this.karte(bild);
   }

   private void teile(int x, int y, int breite, int hoehe) {
      if (breite < 5 || hoehe < 5) return;
      // Gerade Wandkoordinaten, ungerade Türkoordinaten verhindern zugemauerte Türen.
      if (breite >= hoehe) {
         int wand = x + 1 + 2 * (int) (Math.random() * ((breite - 1) / 2));
         int tuer = y + 2 * (int) (Math.random() * ((hoehe + 1) / 2));
         for (int z = y; z < y + hoehe; z++) if (z != tuer) plan[z][wand] = '#';
         this.teile(x, y, wand - x, hoehe);
         this.teile(wand + 1, y, x + breite - wand - 1, hoehe);
      } else {
         int wand = y + 1 + 2 * (int) (Math.random() * ((hoehe - 1) / 2));
         int tuer = x + 2 * (int) (Math.random() * ((breite + 1) / 2));
         for (int s = x; s < x + breite; s++) if (s != tuer) plan[wand][s] = '#';
         this.teile(x, y, breite, wand - y);
         this.teile(x, wand + 1, breite, y + hoehe - wand - 1);
      }
   }
}
