public class Gewonnen extends Bildschirm {

   public Gewonnen(int pLevel) {
      super(pLevel + 1);
      this.schreibe("Level " + pLevel + " geschafft!", 48, 20);
      this.schreibe("Leertaste: weiter zum nächsten Level", 32, -40);
   }
}
