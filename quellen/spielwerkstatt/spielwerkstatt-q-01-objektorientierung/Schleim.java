/// Ein Schleim kriecht waagerecht hin und her und kehrt an Hindernissen um.
public class Schleim extends Gegner {

   private int tempo = 2;

   public Schleim() {
      super("assets/actor/monster/slime/slime.png");
   }

   protected void bewege() {
      this.changeX(tempo);
      if (this.getTouchingSprite(Hindernis.class) != null) {
         this.changeX(-tempo);
         tempo = -tempo;
      }
   }
}
