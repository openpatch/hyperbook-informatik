void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, 0, 20);
   }

   public void run() {
      if (this.isKeyPressed(KeyCode.RIGHT)) held.changeX(4);
      if (this.isKeyPressed(KeyCode.LEFT)) held.changeX(-4);
      if (this.isKeyPressed(KeyCode.UP)) held.changeY(4);
      if (this.isKeyPressed(KeyCode.DOWN)) held.changeY(-4);
      if (held.getX() > 240) held.setX(-240);
      else if (held.getX() < -240) held.setX(240);
      if (held.getY() > 180) held.setY(-180);
      else if (held.getY() < -180) held.setY(180);
   }
}
