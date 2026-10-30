void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Landschaft());
}

class Landschaft extends Stage {
   public Landschaft() {
      this.setColor(150, 195, 100);
      Sprite baum = new Sprite();
      baum.addCostume("baum", "assets/backgrounds/tilesets/tileset-nature.png", 0, 0, 32, 32);
      baum.setSize(300);
      baum.setPosition(-100, 40);
      this.add(baum);
      Sprite fels = new Sprite();
      fels.addCostume("fels", "assets/backgrounds/tilesets/tileset-dungeon.png", 128, 48, 16, 16);
      fels.setSize(300);
      fels.setPosition(80, -20);
      this.add(fels);
   }
}
