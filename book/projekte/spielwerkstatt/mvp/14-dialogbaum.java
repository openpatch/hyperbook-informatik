void main() {
   Window fenster = new Window(480, 360);
   fenster.setStage(new Beispiel());
}

class Beispiel extends Baukasten {
   private BinaryTree<String> wurzel;
   private BinaryTree<String> aktuell;
   private Text anzeige;

   public Beispiel() {
      BinaryTree<String> ja = new BinaryTree<String>("Nimm diesen Schlüssel!");
      BinaryTree<String> nein = new BinaryTree<String>("Dann suche erst den Brunnen.");
      BinaryTree<String> frage = new BinaryTree<String>("Kennst du den Brunnen? (J/N)", ja, nein);
      wurzel = new BinaryTree<String>(
         "Hilfst du mir? (J/N)",
         frage,
         new BinaryTree<String>("Vielleicht später.")
      );
      aktuell = wurzel;
      anzeige = this.text(aktuell.getContent(), 80);
   }

   public void whenKeyPressed(KeyCode pTaste) {
      if (pTaste == KeyCode.R) aktuell = wurzel;
      else if (!aktuell.getLeftTree().isEmpty()) {
         if (pTaste == KeyCode.J) aktuell = aktuell.getLeftTree();
         if (pTaste == KeyCode.N) aktuell = aktuell.getRightTree();
      }
      anzeige.showText(aktuell.getContent());
   }
}
