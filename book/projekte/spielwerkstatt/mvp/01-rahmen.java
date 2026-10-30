void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Steinrahmen());
}

class Steinrahmen extends Stage {
   public Steinrahmen() {
      Sprite oben = new Sprite();
      oben.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
      oben.setSize(300);
      oben.setPosition(0, 48);
      this.add(oben);
      Sprite rechts = new Sprite();
      rechts.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
      rechts.setSize(300);
      rechts.setPosition(48, 0);
      this.add(rechts);
      Sprite unten = new Sprite();
      unten.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
      unten.setSize(300);
      unten.setPosition(0, -48);
      this.add(unten);
      Sprite links = new Sprite();
      links.addCostume("stein", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
      links.setSize(300);
      links.setPosition(-48, 0);
      this.add(links);
   }
}
