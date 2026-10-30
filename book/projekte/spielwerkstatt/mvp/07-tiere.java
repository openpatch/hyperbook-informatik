void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      this.add(new Tier(-80));
      this.add(new Tier(80));
   }
}

class Tier extends Sprite {
   private int bilder = 0;

   public Tier(double pX) {
      this.addCostume("bunny1_stand");
      this.setSize(20);
      this.setX(pX);
   }

   public void run() {
      if (bilder % 120 == 0) this.setDirection((int) (Math.random() * 4) * 90);
      bilder++;
      this.move(1);
      this.ifOnEdgeBounce();
   }
}
