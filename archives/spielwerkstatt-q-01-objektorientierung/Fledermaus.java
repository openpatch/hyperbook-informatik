/// Eine Fledermaus fliegt senkrecht auf und ab und kehrt an Hindernissen um.
public class Fledermaus extends Gegner {

   private int tempo = 3;

   public Fledermaus() {
      super("assets/actor/monster/blue-bat/sprite-sheet.png");
   }

   protected void bewege() {
      this.changeY(tempo);
      if (this.getTouchingSprite(Hindernis.class) != null) {
         this.changeY(-tempo);
         tempo = -tempo;
      }
   }
}
