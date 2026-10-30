void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Dorfplatz());
}

class Dorfplatz extends Stage {
   public Dorfplatz() {
      Text schild = new Text("Finde den Schatz hinter dem Felsen!", 0, 140, 460);
      this.add(schild);
      Sprite wache = new Sprite();
      wache.addCostume("wache", "assets/actor/character/knight/sprite-sheet.png", 0, 0, 16, 16);
      wache.setSize(400);
      this.add(wache);
      wache.say("Willkommen im Dorf!");
   }
}
