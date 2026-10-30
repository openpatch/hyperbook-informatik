void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;

   public Beispiel() {
      held = this.figur("bunny1_stand", -100, 0, 20);
      this.add(new Verfolger(held));
   }

   public void run() {
      this.steuere(held, 4);
   }
}

class Verfolger extends Sprite {
   private Sprite ziel;

   public Verfolger(Sprite pZiel) {
      ziel = pZiel;
      this.addCostume("boxCrate");
      this.setSize(20);
      this.setTint(255, 80, 80);
      this.setX(150);
   }

   public void run() {
      if (this.getX() < ziel.getX()) this.changeX(1);
      if (this.getX() > ziel.getX()) this.changeX(-1);
      if (this.getY() < ziel.getY()) this.changeY(1);
      if (this.getY() > ziel.getY()) this.changeY(-1);
   }
}
