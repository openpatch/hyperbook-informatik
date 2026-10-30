void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;

   public Beispiel() {
      for (int i = -15; i <= 15; i++) this.figur("boxCrate", i * 60, 80, 30);
      this.text("Diese Textzeile gehört zur Welt", 150);
      held = this.figur("bunny1_stand", 0, 0, 20);
   }

   public void run() {
      // Keine Begrenzung am Fensterrand: Die Welt ist größer als das Fenster.
      if (this.isKeyPressed(KeyCode.RIGHT)) held.changeX(4);
      if (this.isKeyPressed(KeyCode.LEFT)) held.changeX(-4);
      this.getCamera().setPosition(held.getX(), held.getY());
   }
}
