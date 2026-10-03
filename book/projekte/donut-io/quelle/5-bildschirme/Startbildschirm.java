public class Startbildschirm extends Bildschirm {

   public Startbildschirm() {
      super(0);
      this.schreibe("Donut.io", 48, 100);
      this.schreibe("Mit jedem Level jagen dich mehr Donuts. Nur der größte überlebt.", 32, 40);
      this.schreibe("Drücke die Leertaste.", 32, -40);
   }
}
