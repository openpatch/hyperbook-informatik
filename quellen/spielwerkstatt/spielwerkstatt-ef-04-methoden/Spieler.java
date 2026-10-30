import org.openpatch.scratch.*;

/// Fertig für dich: die Figur, die du mit den Pfeiltasten steuerst.
/// Sie bleibt an Hindernissen hängen und sammelt Münzen ein.
/// Im Kapitel über Objektorientierung schaust du dir an, wie sie gebaut ist.
public class Spieler extends Sprite {

   /// So viele Pixel geht der Spieler in jedem Bild.
   private int tempo = 3;

   /// Erzeugt einen Spieler. pFigur ist ein Ordner in assets/actor/character/, zum Beispiel "boy".
   public Spieler(String pFigur) {
      String bild = "assets/actor/character/" + pFigur + "/sprite-sheet.png";
      // Im Bild steht jede Blickrichtung in einer eigenen Spalte,
      // die vier Schritte untereinander.
      this.addAnimation("unten", bild, 16, 16, 0, 4, 8, 12);
      this.addAnimation("oben", bild, 16, 16, 1, 5, 9, 13);
      this.addAnimation("links", bild, 16, 16, 2, 6, 10, 14);
      this.addAnimation("rechts", bild, 16, 16, 3, 7, 11, 15);
      this.setAnimationInterval(0.15);
      this.setSize(250);
      // Nur die Füße zählen: So kann die Figur vor einem Baum stehen, ohne an ihm hängen zu bleiben.
      this.setHitbox(new Polygon(new double[] {4, 12, 12, 4}, new double[] {10, 10, 16, 16}));
      this.addSound("muenze", "assets/audio/sounds/bonus/coin.ogg");
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

      Muenze m = this.getTouchingSprite(Muenze.class);
      if (m != null) {
         m.remove();
         this.playSound("muenze");
         Welt welt = (Welt) this.getStage();
         welt.wennMuenzeEingesammelt();
      }
   }

   /// Legt fest, wie viele Pixel der Spieler in jedem Bild geht. Mit 0 bleibt er stehen.
   public void setTempo(int pTempo) {
      tempo = pTempo;
   }
}
