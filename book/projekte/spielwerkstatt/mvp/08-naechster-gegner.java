void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;
   private Sprite[] gegner = new Sprite[3];

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, -80, 20);
      for (int i = 0; i < gegner.length; i++) gegner[i] = this.figur("boxCrate", -160 + i * 160, 100, 20);
   }

   public void run() {
      this.steuere(held, 4);
      int bester = 0;
      for (int i = 1; i < gegner.length; i++) {
         if (held.distanceToSprite(gegner[i]) < held.distanceToSprite(gegner[bester])) bester = i;
      }
      Sprite g = gegner[bester];
      if (g.getX() < held.getX()) g.changeX(1);
      if (g.getX() > held.getX()) g.changeX(-1);
      if (g.getY() < held.getY()) g.changeY(1);
      if (g.getY() > held.getY()) g.changeY(-1);
   }
}
