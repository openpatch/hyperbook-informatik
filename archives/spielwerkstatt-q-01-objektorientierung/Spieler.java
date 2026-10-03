import org.openpatch.scratch.*;

/// Die Figur, die du mit den Pfeiltasten steuerst.
/// Sie bleibt an Hindernissen hängen, berührt Gegenstände und meldet der Welt, wenn ein Gegner sie erwischt.
public class Spieler extends AnimatedSprite {

   /// So viele Pixel geht der Spieler in jedem Bild.
   private int tempo = 3;

   /// Erzeugt einen Spieler. pFigur ist ein Ordner in assets/actor/character/, zum Beispiel "boy".
   public Spieler(String pFigur) {
      String bild = "assets/actor/character/" + pFigur + "/sprite-sheet.png";
      // Im Bild steht jede Blickrichtung in einer eigenen Spalte,
      // die vier Schritte untereinander.
      this.addAnimation("unten", bild, 4, 16, 16, 0, true);
      this.addAnimation("oben", bild, 4, 16, 16, 1, true);
      this.addAnimation("links", bild, 4, 16, 16, 2, true);
      this.addAnimation("rechts", bild, 4, 16, 16, 3, true);
      this.setAnimationInterval(150);
      this.setSize(250);
      // Nur die Füße zählen: So kann die Figur vor einem Baum stehen, ohne an ihm hängen zu bleiben.
      this.setHitbox(4, 10, 12, 10, 12, 16, 4, 16);
   }

   public void run() {
      double altX = this.getX();
      double altY = this.getY();

      if (this.isKeyPressed(KeyCode.RIGHT)) {
         this.changeX(tempo);
         this.playAnimation("rechts");
      } else if (this.isKeyPressed(KeyCode.LEFT)) {
         this.changeX(-tempo);
         this.playAnimation("links");
      } else if (this.isKeyPressed(KeyCode.UP)) {
         this.changeY(tempo);
         this.playAnimation("oben");
      } else if (this.isKeyPressed(KeyCode.DOWN)) {
         this.changeY(-tempo);
         this.playAnimation("unten");
      }

      // In ein Hindernis hineingelaufen? Dann zurück auf den alten Platz.
      if (this.getTouchingSprite(Hindernis.class) != null) {
         this.setPosition(altX, altY);
      }

      Welt welt = (Welt) this.getStage();

      // Was der Gegenstand tut, entscheidet der Gegenstand selbst.
      Gegenstand g = this.getTouchingSprite(Gegenstand.class);
      if (g != null) {
         g.beruehrtVon(welt);
      }

      if (this.getTouchingSprite(Gegner.class) != null) {
         welt.verletze();
      }
   }

   /// Legt fest, wie viele Pixel der Spieler in jedem Bild geht. Mit 0 bleibt er stehen.
   public void setTempo(int pTempo) {
      tempo = pTempo;
   }
}
