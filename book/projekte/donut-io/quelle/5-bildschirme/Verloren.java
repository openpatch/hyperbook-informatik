public class Verloren extends Bildschirm {

   public Verloren(int pLevel) {
      super(0);
      this.schreibe("Level " + pLevel + " war zu schwer für dich!", 48, 20);
      this.schreibe("Leertaste: noch einmal von vorn", 32, -40);
   }
}
