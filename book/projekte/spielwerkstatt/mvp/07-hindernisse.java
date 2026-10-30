void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;

   public Beispiel() {
      held = this.figur("bunny1_stand", -130, 0, 20);
      this.add(new Stein());
   }

   public void run() {
      double x = held.getX();
      double y = held.getY();
      this.steuere(held, 3);
      if (held.getTouchingSprite(Hindernis.class) != null) held.setPosition(x, y);
   }
}

class Hindernis extends Sprite {}

class Stein extends Hindernis {
   public Stein() {
      this.addCostume("boxCrate");
      this.setSize(40);
   }
}
