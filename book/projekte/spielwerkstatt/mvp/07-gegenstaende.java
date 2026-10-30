void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;
   private Text anzeige;

   public Beispiel() {
      held = this.figur("bunny1_stand", -160, 0, 20);
      anzeige = this.text("Sammle die Gegenstände", 150);
      this.add(new Muenze());
      this.add(new Trank());
   }

   public void run() {
      this.steuere(held, 3);
      Gegenstand g = held.getTouchingSprite(Gegenstand.class);
      if (g != null) anzeige.showText(g.einsammeln());
   }
}

class Gegenstand extends Sprite {
   public String einsammeln() {
      this.remove();
      return "Gefunden";
   }
}

class Muenze extends Gegenstand {
   public Muenze() {
      this.addCostume("coin_gold");
      this.setSize(40);
   }

   public String einsammeln() {
      this.remove();
      return "10 Punkte dazu";
   }
}

class Trank extends Gegenstand {
   public Trank() {
      this.addCostume("gemRed");
      this.setSize(20);
      this.setX(120);
   }

   public String einsammeln() {
      this.remove();
      return "Ein Leben dazu";
   }
}
