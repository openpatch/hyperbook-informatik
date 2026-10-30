void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Queue<KeyCode> befehle = new Queue<KeyCode>();
   private boolean ausfuehren = false;
   private int bilder = 0;
   private Sprite held;

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, 0, 15);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.SPACE) ausfuehren = true;
      else if (
         !ausfuehren &&
         (pTaste == KeyCode.RIGHT || pTaste == KeyCode.LEFT || pTaste == KeyCode.UP || pTaste == KeyCode.DOWN)
      ) befehle.enqueue(pTaste);
   }

   public void run() {
      bilder++;
      if (ausfuehren && bilder % 30 == 0) {
         if (befehle.isEmpty()) {
            ausfuehren = false;
            return;
         }
         KeyCode r = befehle.front();
         befehle.dequeue();
         if (r == KeyCode.RIGHT) held.changeX(30);
         if (r == KeyCode.LEFT) held.changeX(-30);
         if (r == KeyCode.UP) held.changeY(30);
         if (r == KeyCode.DOWN) held.changeY(-30);
      }
   }
}
