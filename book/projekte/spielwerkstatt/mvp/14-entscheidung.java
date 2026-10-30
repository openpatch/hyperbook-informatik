void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private Sprite held;
   private Sprite wache;
   private BinaryTree<String> baum;

   public Beispiel() {
      held = this.figur("bunny1_stand", -180, -80, 20);
      wache = this.figur("boxCrate", 120, 0, 20);
      baum = new BinaryTree<String>(
         "nah?",
         new BinaryTree<String>("verfolgen"),
         new BinaryTree<String>("weg?", new BinaryTree<String>("zurück"), new BinaryTree<String>("warten"))
      );
   }

   private boolean beantworte(String pFrage) {
      if (pFrage.equals("nah?")) return wache.distanceToSprite(held) < 100;
      return Math.abs(wache.getX() - 120) > 2 || Math.abs(wache.getY()) > 2;
   }

   public void run() {
      this.steuere(held, 3);
      BinaryTree<String> k = baum;
      while (!k.getLeftTree().isEmpty()) {
         if (this.beantworte(k.getContent())) k = k.getLeftTree();
         else k = k.getRightTree();
      }
      String aktion = k.getContent();
      wache.say(aktion);
      double x = 120;
      double y = 0;
      if (aktion.equals("verfolgen")) {
         x = held.getX();
         y = held.getY();
      }
      if (!aktion.equals("warten")) {
         if (wache.getX() < x - 1) wache.changeX(1);
         if (wache.getX() > x + 1) wache.changeX(-1);
         if (wache.getY() < y - 1) wache.changeY(1);
         if (wache.getY() > y + 1) wache.changeY(-1);
      }
   }
}
