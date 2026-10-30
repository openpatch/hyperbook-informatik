void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Figurenprobe());
}

class Figurenprobe extends Stage {
   public Figurenprobe() {
      Sprite held = new Sprite();
      held.addCostume("stehen", "assets/actor/character/boy/sprite-sheet.png", 0, 0, 16, 16);
      held.setSize(500);
      this.add(held);
      held.say("Das bin ich!");
   }
}
