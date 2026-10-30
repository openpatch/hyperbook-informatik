void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;
   private Sprite punkt;

   public Beispiel() {
      String[] plan = { "#########", "#.......#", "#..##...#", "#.......#", "#########" };
      for (int z = 0; z < plan.length; z++) {
         for (int s = 0; s < plan[z].length(); s++) {
            if (plan[z].charAt(s) == '#') {
               this.figur("boxCrate", -160 + s * 40, 80 - z * 40, 30);
               this.figur("boxCrate", 120 + s * 10, 160 - z * 10, 7);
            }
         }
      }
      held = this.figur("bunny1_stand", 0, 0, 15);
      punkt = this.figur("gemRed", 160, 140, 5);
   }

   public void run() {
      this.steuere(held, 3);
      punkt.setPosition(120 + (held.getX() + 160) / 4, 160 - (80 - held.getY()) / 4);
   }
}
