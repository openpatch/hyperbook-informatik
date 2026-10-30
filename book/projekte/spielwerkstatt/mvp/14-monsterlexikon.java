void main() {
   Lexikon lexikon = new Lexikon();
   lexikon.eintragen(new Monster("Schleim", 2));
   lexikon.eintragen(new Monster("Drache", 10));
   lexikon.eintragen(new Monster("Wolf", 4));
   lexikon.anzeigen();
   lexikon.suchen("Drache");
}

class Monster implements ComparableContent<Monster> {
   public String name;
   public int staerke;

   public Monster(String pName, int pStaerke) {
      name = pName;
      staerke = pStaerke;
   }

   public boolean isLess(Monster pM) {
      return name.compareTo(pM.name) < 0;
   }

   public boolean isGreater(Monster pM) {
      return name.compareTo(pM.name) > 0;
   }

   public boolean isEqual(Monster pM) {
      return name.equals(pM.name);
   }
}

class Lexikon {
   private BinarySearchTree<Monster> baum = new BinarySearchTree<Monster>();

   public void eintragen(Monster pM) {
      baum.insert(pM);
   }

   public void suchen(String pName) {
      Monster m = baum.search(new Monster(pName, 0));
      if (m == null) IO.println("Unbekannt: " + pName);
      else IO.println("Gefunden: " + m.name + ", Stärke " + m.staerke);
   }

   public void anzeigen() {
      this.inorder(baum);
   }

   private void inorder(BinarySearchTree<Monster> pBaum) {
      if (pBaum.isEmpty()) return;
      this.inorder(pBaum.getLeftTree());
      IO.println(pBaum.getContent().name);
      this.inorder(pBaum.getRightTree());
   }
}
