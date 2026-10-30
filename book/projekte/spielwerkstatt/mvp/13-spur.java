void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Stack<Platz> spur = new Stack<Platz>();
   private Sprite held;

   public Beispiel() {
      held = this.figur("bunny1_stand", 0, 0, 20);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.R && !spur.isEmpty()) {
         Platz p = spur.top();
         spur.pop();
         held.setPosition(p.x, p.y);
      } else if (
         pTaste == KeyCode.RIGHT || pTaste == KeyCode.LEFT || pTaste == KeyCode.UP || pTaste == KeyCode.DOWN
      ) {
         spur.push(new Platz(held.getX(), held.getY()));
         if (pTaste == KeyCode.RIGHT) held.changeX(30);
         if (pTaste == KeyCode.LEFT) held.changeX(-30);
         if (pTaste == KeyCode.UP) held.changeY(30);
         if (pTaste == KeyCode.DOWN) held.changeY(-30);
      }
   }
}

class Platz {
   public double x, y;

   public Platz(double pX, double pY) {
      x = pX;
      y = pY;
   }
}
