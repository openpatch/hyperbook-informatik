void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private String[] plan = { "#########", "#..M....#", "#..##...#", "#....M..#", "#########" };

   public Beispiel() {
      for (int z = 0; z < plan.length; z++) {
         for (int s = 0; s < plan[z].length(); s++) {
            double x = -160 + s * 40;
            double y = 80 - z * 40;
            if (plan[z].charAt(s) == '#') this.figur("boxCrate", x, y, 30);
            else if (plan[z].charAt(s) == 'M') this.figur("coin_gold", x, y, 40);
         }
      }
   }
}
