/// Eine Wache, die an ihrem Posten steht. Was sie tut, entscheidet sie in jedem Bild neu,
/// indem sie einen Entscheidungsbaum von der Wurzel bis zu einem Blatt durchläuft.
public class Wache extends Gegner {

   /// So viele Pixel weit sieht die Wache.
   private static final double SICHTWEITE = 160;
   /// So viele Pixel geht die Wache in jedem Bild.
   private static final double SCHRITT = 1.5;

   private Spieler ziel;
   private double postenX;
   private double postenY;
   /// Innere Knoten enthalten Fragen, Blätter enthalten Handlungen.
   /// Links geht es weiter, wenn die Antwort ja ist, rechts bei nein.
   private BinaryTree<String> entscheidung;
   private String letzteHandlung = "";

   public Wache(Spieler pZiel, double pPostenX, double pPostenY) {
      super("assets/actor/monster/cyclope/sprite-sheet.png");
      ziel = pZiel;
      postenX = pPostenX;
      postenY = pPostenY;

      BinaryTree<String> verfolgen = new BinaryTree<String>("verfolgen");
      BinaryTree<String> zurueck = new BinaryTree<String>("zurück zum Posten");
      BinaryTree<String> warten = new BinaryTree<String>("warten");
      BinaryTree<String> weg = new BinaryTree<String>("weit vom Posten?", zurueck, warten);
      entscheidung = new BinaryTree<String>("Spieler nah?", verfolgen, weg);
   }

   protected void bewege() {
      String handlung = this.entscheide();
      if (!handlung.equals(letzteHandlung)) {
         this.say(handlung);
         letzteHandlung = handlung;
      }
      if (handlung.equals("verfolgen")) {
         this.geheRichtung(ziel.getX(), ziel.getY());
      } else if (handlung.equals("zurück zum Posten")) {
         this.geheRichtung(postenX, postenY);
      }
   }

   /// Läuft von der Wurzel aus durch den Baum, bis ein Blatt erreicht ist, und liefert dessen Handlung.
   private String entscheide() {
      BinaryTree<String> knoten = entscheidung;
      while (!knoten.getLeftTree().isEmpty()) {
         if (this.beantworte(knoten.getContent())) {
            knoten = knoten.getLeftTree();
         } else {
            knoten = knoten.getRightTree();
         }
      }
      return knoten.getContent();
   }

   /// Beantwortet eine Frage aus einem inneren Knoten.
   private boolean beantworte(String pFrage) {
      if (pFrage.equals("Spieler nah?")) {
         return this.distanceToSprite(ziel) < SICHTWEITE;
      }
      if (pFrage.equals("weit vom Posten?")) {
         double dx = postenX - this.getX();
         double dy = postenY - this.getY();
         return Math.sqrt(dx * dx + dy * dy) > 4;
      }
      return false;
   }

   /// Geht einen Schritt auf die Stelle (pX, pY) zu, aber nicht durch Hindernisse.
   private void geheRichtung(double pX, double pY) {
      double dx = pX - this.getX();
      double dy = pY - this.getY();
      double abstand = Math.sqrt(dx * dx + dy * dy);
      if (abstand < 1) {
         return;
      }
      this.changeX(dx / abstand * SCHRITT);
      if (this.getTouchingSprite(Hindernis.class) != null) {
         this.changeX(-dx / abstand * SCHRITT);
      }
      this.changeY(dy / abstand * SCHRITT);
      if (this.getTouchingSprite(Hindernis.class) != null) {
         this.changeY(-dy / abstand * SCHRITT);
      }
   }
}
