void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Stack<Zug> zuege = new Stack<Zug>();
   private Sprite held;
   private Sprite kiste;

   public Beispiel() {
      held = this.figur("bunny1_stand", -160, 0, 20);
      kiste = this.figur("boxCrate", -120, 0, 30);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.RIGHT && kiste.getX() < 180) {
         zuege.push(new Zug(held.getX(), kiste.getX()));
         held.changeX(40);
         kiste.changeX(40);
      }
      if (pTaste == KeyCode.R && !zuege.isEmpty()) {
         Zug z = zuege.top();
         zuege.pop();
         held.setX(z.heldX);
         kiste.setX(z.kisteX);
      }
   }
}

class Zug {
   public double heldX, kisteX;

   public Zug(double pHeldX, double pKisteX) {
      heldX = pHeldX;
      kisteX = pKisteX;
   }
}
