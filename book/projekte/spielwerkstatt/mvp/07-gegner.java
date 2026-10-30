void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      this.figur("boxCrate", -180, 0, 40);
      this.figur("boxCrate", 180, 0, 40);
      this.add(new Gegner());
   }
}

class Gegner extends Sprite {
   private int tempo = 2;

   public Gegner() {
      this.addCostume("bunny1_stand");
      this.setSize(20);
   }

   public void run() {
      this.changeX(tempo);
      // Im Mini-Beispiel sind alle anderen Sprites Hindernisse.
      if (this.isTouchingSprite(Sprite.class)) {
         this.changeX(-tempo);
         tempo = -tempo;
      }
   }
}
