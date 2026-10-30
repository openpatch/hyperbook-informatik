void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private BinaryTree<Faehigkeit> wurzel;
   private BinaryTree<Faehigkeit> aktuell;
   private int punkte = 3;
   private Text anzeige;

   public Beispiel() {
      wurzel = new BinaryTree<Faehigkeit>(
         new Faehigkeit("Laufen"),
         new BinaryTree<Faehigkeit>(new Faehigkeit("Rennen")),
         new BinaryTree<Faehigkeit>(new Faehigkeit("Springen"))
      );
      aktuell = wurzel;
      anzeige = this.text("", 80);
      this.zeige();
   }

   private void zeige() {
      anzeige.showText(
         aktuell.getContent().name + " | frei: " + aktuell.getContent().frei + " | Punkte: " + punkte
      );
   }

   public void whenKeyPressed(KeyCode pTaste) {
      Faehigkeit f = aktuell.getContent();
      if (pTaste == KeyCode.SPACE && !f.frei && punkte > 0) {
         f.frei = true;
         punkte--;
      }
      if (f.frei) {
         if (pTaste == KeyCode.J && !aktuell.getLeftTree().isEmpty()) aktuell = aktuell.getLeftTree();
         else if (pTaste == KeyCode.N && !aktuell.getRightTree().isEmpty()) aktuell = aktuell.getRightTree();
      }
      if (pTaste == KeyCode.R) aktuell = wurzel;
      this.zeige();
   }
}

class Faehigkeit {
   public String name;
   public boolean frei = false;

   public Faehigkeit(String pName) {
      name = pName;
   }
}
