void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;

   public Beispiel() {
      held = this.figur("bunny1_stand", -170, 0, 20);
      Schluessel schluessel = new Schluessel();
      this.add(schluessel);
      this.add(new Tuer(schluessel));
   }

   public void run() {
      double x = held.getX();
      double y = held.getY();
      this.steuere(held, 3);
      if (held.getTouchingSprite(Hindernis.class) != null) held.setPosition(x, y);
      Schluessel s = held.getTouchingSprite(Schluessel.class);
      if (s != null) s.einsammeln();
   }
}

class Schluessel extends Sprite {
   private boolean gefunden = false;

   public Schluessel() {
      this.addCostume("coin_gold");
      this.setSize(40);
      this.setX(-60);
   }

   public void einsammeln() {
      gefunden = true;
      this.remove();
   }

   public boolean istGefunden() {
      return gefunden;
   }
}

class Hindernis extends Sprite {}

class Tuer extends Hindernis {
   private Schluessel schluessel;

   public Tuer(Schluessel pSchluessel) {
      schluessel = pSchluessel;
      this.addCostume("boxCrate");
      this.setSize(50);
      this.setX(100);
   }

   public void run() {
      if (schluessel.istGefunden()) this.remove();
   }
}
