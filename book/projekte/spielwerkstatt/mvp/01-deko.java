void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Dekoprobe());
}

class Dekoprobe extends Stage {
   public Dekoprobe() {
      Sprite boden = new Sprite();
      boden.addCostume("boden", "assets/backgrounds/tilesets/tileset-floor.png", 240, 192, 16, 16);
      boden.setSize(600);
      this.add(boden);
      Sprite held = new Sprite();
      held.addCostume("stehen", "assets/actor/character/boy/sprite-sheet.png", 0, 0, 16, 16);
      held.setSize(300);
      // Gleiche Position, beide sichtbar: Deko darf unter einer Figur liegen.
      this.add(held);
   }
}
