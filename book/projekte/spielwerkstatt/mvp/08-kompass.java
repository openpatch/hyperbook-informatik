void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;
   private Sprite[] muenzen = new Sprite[3];
   private Text anzeige;

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, -80, 20);
      muenzen[0] = this.figur("coin_gold", -160, 60, 40);
      muenzen[1] = this.figur("coin_gold", 100, 100, 40);
      muenzen[2] = this.figur("coin_gold", 160, -80, 40);
      anzeige = this.text("", 155);
   }

   public void run() {
      this.steuere(held, 3);
      Sprite naechste = null;
      double minimum = 100000;
      for (int i = 0; i < muenzen.length; i++) {
         Sprite m = muenzen[i];
         if (m != null) {
            if (held.isTouchingSprite(m)) {
               m.remove();
               muenzen[i] = null;
            } else if (held.distanceToSprite(m) < minimum) {
               minimum = held.distanceToSprite(m);
               naechste = m;
            }
         }
      }
      if (naechste == null) anzeige.showText("Alle gefunden!");
      else anzeige.showText(
         "Nächste Münze: dx " +
            (int) (naechste.getX() - held.getX()) +
            " | dy " +
            (int) (naechste.getY() - held.getY())
      );
   }
}
