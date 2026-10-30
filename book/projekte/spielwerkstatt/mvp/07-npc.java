void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;

   public Beispiel() {
      held = this.figur("bunny1_stand", -180, 0, 20);
      this.add(new Npc(held, "Der Schatz ist im Wald."));
   }

   public void run() {
      this.steuere(held, 3);
   }
}

class Npc extends Sprite {
   private Sprite spieler;
   private String satz;

   public Npc(Sprite pSpieler, String pSatz) {
      spieler = pSpieler;
      satz = pSatz;
      this.addCostume("boxCrate");
      this.setSize(25);
      this.setX(80);
   }

   public void run() {
      if (this.distanceToSprite(spieler) < 100) this.say(satz);
      else this.say("");
   }
}
