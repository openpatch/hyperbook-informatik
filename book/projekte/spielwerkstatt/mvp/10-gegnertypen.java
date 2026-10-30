void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   public Beispiel() {
      this.add(new Schleim());
      this.add(new Fledermaus());
   }
}

abstract class Gegner extends Sprite {
   public Gegner() {
      this.addCostume("boxCrate");
      this.setSize(20);
   }

   public void run() {
      this.bewege();
      this.ifOnEdgeBounce();
   }

   protected abstract void bewege();
}

class Schleim extends Gegner {
   public Schleim() {
      this.setY(-60);
      this.setDirection(90);
   }

   protected void bewege() {
      this.move(2);
   }
}

class Fledermaus extends Gegner {
   public Fledermaus() {
      this.setX(100);
      this.setDirection(0);
      this.setTint(150, 70, 220);
   }

   protected void bewege() {
      this.move(3);
   }
}
