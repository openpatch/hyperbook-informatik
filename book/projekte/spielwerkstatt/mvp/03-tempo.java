void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Tempoprobe());
}

class Tempoprobe extends Stage {
   private double tempo = 2;
   private Sprite held = new Sprite();

   public Tempoprobe() {
      held.addCostume("bunny1_stand");
      held.setSize(25);
      this.add(held);
   }

   public void run() {
      held.move(tempo);
      held.ifOnEdgeBounce();
   }
}
