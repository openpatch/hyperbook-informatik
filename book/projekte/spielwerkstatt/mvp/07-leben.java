void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;
   private Sprite gegner;
   private int leben = 3;
   private Text anzeige;

   public Beispiel() {
      held = this.figur("bunny1_stand", -160, 0, 20);
      gegner = this.figur("boxCrate", 100, 0, 40);
      anzeige = this.text("Leben: 3", 150);
   }

   public void run() {
      if (leben > 0) {
         this.steuere(held, 3);
         if (held.isTouchingSprite(gegner)) this.wennGegnerBeruehrt();
      }
   }

   public void wennGegnerBeruehrt() {
      leben--;
      held.setPosition(-160, 0);
      if (leben == 0) anzeige.showText("Spiel vorbei");
      else anzeige.showText("Leben: " + leben);
   }
}
